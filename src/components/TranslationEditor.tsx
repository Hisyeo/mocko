import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Form, ListGroup, Button, Badge, Stack, Dropdown } from 'react-bootstrap';
import Mark from 'mark.js';
import SelectionTooltip from './SelectionTooltip';
import UnderlinedText from './UnderlinedText';
import { Source } from '../App';
import SpellCheckEditor from './SpellCheckEditor';
import { Diagnostic } from '@codemirror/lint';
import { useApp } from '../AppContext';
import WiktionaryModal from './WiktionaryModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface TranslationEditorProps {
  source: Source | null;
  segments: string[];
  delimiters: string[];
}

function isSelectionInSelector(selection: Selection, selector: string): boolean {
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  const commonAncestor = range.commonAncestorContainer;
  let startingElement: Element | null = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor as Element : commonAncestor.parentElement;
  if (startingElement) {
    return startingElement.closest(selector) !== null;
  }
  return false;
}

const TranslationEditor: React.FC<TranslationEditorProps> = ({ source, segments, delimiters }) => {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [diagnostics, setDiagnostics] = useState<readonly Diagnostic[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [numberedMemories, setNumberedMemories] = useState<Record<number, { source: string, target: string }>>({});
  const [showWiktionaryModal, setShowWiktionaryModal] = useState(false);
  const [wiktionaryTerm, setWiktionaryTerm] = useState('');
  const [memoryVersion, setMemoryVersion] = useState(0);
  const [visibleSegmentCount, setVisibleSegmentCount] = useState(50);
  const [segmentGrammarRule, setSegmentGrammarRule] = useState('');
  const { grammarCheck, spellCheck, defaultGrammarRule } = useApp();

  const editorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting) {
      setVisibleSegmentCount(prevCount => prevCount + 50);
    }
  }, [isIntersecting]);

  const onMemoriesNumbered = useCallback((newMemories: Record<number, { source: string, target: string }>) => {
    setNumberedMemories(oldMemories => {
      if (JSON.stringify(oldMemories) === JSON.stringify(newMemories)) {
        return oldMemories;
      }
      return newMemories;
    });
  }, []);

  const handleInsertMemory = useCallback((text: string) => {
    console.log('handleInsertMemory');
    setCurrentTranslation(prev => prev + text);
  }, []);

  useEffect(() => {
    if (source) {
      const storedMemories = localStorage.getItem(`memories_${source.id}`);
      setMemories(storedMemories ? JSON.parse(storedMemories) : {});

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      if (storedTranslations) {
        const parsedTranslations = JSON.parse(storedTranslations);
        setTranslations(parsedTranslations);
        setTranslatedTitle(parsedTranslations['__title__'] || '');
      }
    }
  }, [source, memoryVersion]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAddingMemory) return;
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltip(null);
        const instance = new Mark(editorRef.current as HTMLElement);
        instance.unmark();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef, isAddingMemory]);

  const handleEdit = (segment: string) => {
    const trimmedSegment = segment.trim();
    setEditingSegment(trimmedSegment);
    const translationData = translations[trimmedSegment];
    if (typeof translationData === 'object' && translationData !== null) {
      setCurrentTranslation(translationData.text || '');
      setSegmentGrammarRule(translationData.grammarRule || '');
    } else {
      setCurrentTranslation(translationData || '');
      setSegmentGrammarRule('');
    }
    setDiagnostics([]);
    setNumberedMemories({});
  };

  const handleSave = (segment: string) => {
    if (hasErrors) return;
    const trimmedSegment = segment.trim();
    const updatedTranslations = { 
      ...translations, 
      [trimmedSegment]: { 
        text: currentTranslation, 
        grammarRule: segmentGrammarRule 
      } 
    };
    setTranslations(updatedTranslations);
    if (source) {
      localStorage.setItem(`translations_${source.id}`, JSON.stringify(updatedTranslations));
    }
    setEditingSegment(null);
  };

  const handleSaveAndEditNext = (currentSegmentTrimmed: string) => {
    if (hasErrors) return;

    const updatedTranslations = { 
      ...translations, 
      [currentSegmentTrimmed]: { 
        text: currentTranslation, 
        grammarRule: segmentGrammarRule 
      } 
    };
    setTranslations(updatedTranslations);
    if (source) {
      localStorage.setItem(`translations_${source.id}`, JSON.stringify(updatedTranslations));
    }

    const validSegments = segments.map(s => s.trim()).filter(Boolean);
    const currentIndex = validSegments.indexOf(currentSegmentTrimmed);

    if (currentIndex < validSegments.length - 1) {
      const nextSegmentToEdit = validSegments[currentIndex + 1];
      handleEdit(nextSegmentToEdit);
    } else {
      setEditingSegment(null);
    }
  };

  const handleCancel = () => {
    setEditingSegment(null);
  };

  const handleTitleSave = () => {
    const updatedTranslations = { ...translations, '__title__': translatedTitle };
    setTranslations(updatedTranslations);
    if (source) {
      localStorage.setItem(`translations_${source.id}`, JSON.stringify(updatedTranslations));
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current && tooltipRef.current.contains(event.target as Node)) {
      return;
    }
    const selection = window.getSelection();
    if (selection && selection.toString()
      && (isSelectionInSelector(selection, '.source-text') || isSelectionInSelector(selection, '#current-editing-translation-source-text'))) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setTooltip({ x: rect.left, y: rect.top - 30, text: selection.toString() });
    } else {
      setTooltip(null);
    }
  };

  const handleAddMemory = () => {
    if (tooltip) {
      const instance = new Mark(editorRef.current as HTMLElement);
      instance.unmark({ done: () => instance.mark(tooltip.text, { separateWordSearch: false}) });
      setIsAddingMemory(true);
    }
  };

  const handleSaveMemory = (target: string) => {
    if (tooltip && source) {
      const updatedMemories = { ...memories, [tooltip.text]: target };
      localStorage.setItem(`memories_${source.id}`, JSON.stringify(updatedMemories));
      setMemoryVersion(prev => prev + 1);
      setIsAddingMemory(false);
      setTooltip(null);
      const instance = new Mark(editorRef.current as HTMLElement);
      instance.unmark();
    }
  };

  const handleWiktionarySearch = (term: string) => {
    setWiktionaryTerm(term);
    setShowWiktionaryModal(true);
  };

  if (!source) {
    return <div>Please select a source from the sidebar to start translating.</div>;
  }

  const validSegments = segments.map(s => s.trim()).filter(Boolean);
  const grammarErrors = diagnostics.filter(d => d.severity === 'info');
  const spellingErrors = diagnostics.filter(d => d.severity === 'warning');
  const hasErrors = (grammarCheck && grammarErrors.length > 0) || (spellCheck && spellingErrors.length > 0);

  return (
    <div ref={editorRef} onMouseUp={handleMouseUp}>
      {tooltip && (
        <SelectionTooltip 
          ref={tooltipRef}
          x={tooltip.x} 
          y={tooltip.y} 
          text={tooltip.text}
          onAddMemory={handleAddMemory} 
          onSaveMemory={handleSaveMemory}
          onWiktionarySearch={handleWiktionarySearch}
          isAddingMemory={isAddingMemory}
        />
      )}
      <WiktionaryModal show={showWiktionaryModal} onHide={() => setShowWiktionaryModal(false)} term={wiktionaryTerm} />
      <h1>{translatedTitle || source.title}</h1>
      <Form.Group controlId="translatedTitle" className="mt-2">
        <Form.Label>Translated Title</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter translated title"
          value={translatedTitle} 
          onChange={(e) => setTranslatedTitle(e.target.value)} 
          onBlur={handleTitleSave}
        />
      </Form.Group>
      
      <ListGroup className="mt-4">
        {segments.slice(0, visibleSegmentCount).map((segment, index) => {
            const trimmedSegment = segment.trim();
            if (!trimmedSegment) return null;

            const isLastSegment = validSegments.indexOf(trimmedSegment) === validSegments.length - 1;
            const translationData = translations[trimmedSegment];
            const translationText = typeof translationData === 'object' && translationData !== null ? translationData.text : translationData;

            return (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                {editingSegment === trimmedSegment ? (
                  <div className="w-100">
                    <UnderlinedText text={segment} memories={memories} onInsert={handleInsertMemory} onMemoriesNumbered={onMemoriesNumbered} />
                    {delimiters[index] && <Badge bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em'}}>{delimiters[index]}</Badge>}
                    <SpellCheckEditor 
                      value={currentTranslation} 
                      onChange={setCurrentTranslation} 
                      onDiagnosticsChange={setDiagnostics}
                      autofocus={editingSegment === trimmedSegment}
                      numberedMemories={numberedMemories}
                      grammarRule={segmentGrammarRule || source.defaultGrammarRule || defaultGrammarRule}
                    />
                    <Stack direction='horizontal' gap={1}>
                      <Button variant="success" size="sm" className="mt-2" onClick={() => handleSaveAndEditNext(trimmedSegment)} disabled={isLastSegment || hasErrors}>Save & Edit Next</Button>
                      <Button variant="primary" size="sm" className="mt-2 ml-2" onClick={() => handleSave(trimmedSegment)} disabled={hasErrors}>Save</Button>
                      <Button variant="secondary" size="sm" className="mt-2 ml-2" onClick={handleCancel}>Cancel</Button>
                      {grammarCheck && (
                        <Dropdown onSelect={(e) => setSegmentGrammarRule(e || '')} className='ms-auto'>
                          <Dropdown.Toggle variant="info" size="sm" className="mt-2 ml-2">
                            Grammar
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item active={segmentGrammarRule == ''} eventKey="">-</Dropdown.Item>
                            <Dropdown.Item active={segmentGrammarRule == 'Sentences'} eventKey="Sentences">Sentences</Dropdown.Item>
                            <Dropdown.Item active={segmentGrammarRule == 'Constituents'} eventKey="Constituents">Constituents</Dropdown.Item>
                            <Dropdown.Item active={segmentGrammarRule == 'Phrases'} eventKey="Phrases">Phrases</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Stack>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <p className={`mb-0 ${!translationText ? 'source-text': ''}`}>
                      {translationText || segment}
                      {delimiters[index] && <Badge bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em', fontSize: '0.8em'}}>{delimiters[index]}</Badge>}
                    </p>
                    <Button variant="link" onClick={() => handleEdit(trimmedSegment)} style={{textDecoration: 'none'}}>✏️</Button>
                  </div>
                )}
              
              </ListGroup.Item>
            )
        })}
      </ListGroup>
      <div ref={sentinelRef} />
    </div>
  );
}

export default TranslationEditor;