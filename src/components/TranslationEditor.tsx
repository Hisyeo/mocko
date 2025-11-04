import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Form, ListGroup, Button, Badge, Stack, Dropdown, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import Mark from 'mark.js';
import { Source } from '../App';
import SpellCheckEditor from './SpellCheckEditor';
import { Diagnostic } from '@codemirror/lint';
import { useApp } from '../AppContext';
import { useSource } from '../SourceContext';
import WiktionaryModal from './WiktionaryModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import SplitSourceModal from './SplitSourceModal';
import pako from 'pako';
import UnderlinedText from './UnderlinedText';

// Helper to decode from base64 Uint8Array
const atobUint8Array = (b64: string) => {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Uint8Array(byteNumbers);
}

type SegmentType = 'Body' | 'Heading' | 'Skip';
type OutlineLevel = 'Skip' | 'Level 2' | 'Level 3';
type DelimiterAction = 'Skip Preceding' | 'Skip Succeeding' | 'Skip Both' | 'Keep Both';

interface TranslationEditorProps {
  onSplit: (source: Source, splitIndex: number) => void;
  onTranslationsUpdate: () => void;
  onMemoryUpdate: () => void;
  memoryVersion: number;
  scrollToSegment: { sourceId: string; segmentIndex: number; } | null;
  onScrollToSegmentHandled: () => void;
}

const TranslationEditor: React.FC<TranslationEditorProps> = ({ onSplit, onTranslationsUpdate, onMemoryUpdate, memoryVersion, scrollToSegment, onScrollToSegmentHandled }) => {
  const { source, segments, delimiters } = useSource();
  const { grammarCheck, spellCheck, defaultGrammarRule, handleSetItem, setError } = useApp();

  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [diagnostics, setDiagnostics] = useState<readonly Diagnostic[]>([]);
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [numberedMemories, setNumberedMemories] = useState<Record<number, { source: string, target: string }>>({});
  const [showWiktionaryModal, setShowWiktionaryModal] = useState(false);
  const [wiktionaryTerm, setWiktionaryTerm] = useState('');
  const [visibleSegmentCount, setVisibleSegmentCount] = useState(50);
  const [goToSegment, setGoToSegment] = useState('');
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitIndex, setSplitIndex] = useState<number | null>(null);
  const [scrollToIndex, setScrollToIndex] = useState<number | null>(null); // Local state for scrolling

  // State for the new popover
  const [segmentGrammarRule, setSegmentGrammarRule] = useState('');
  const [segmentType, setSegmentType] = useState<SegmentType>('Body');
  const [outlineLevel, setOutlineLevel] = useState<OutlineLevel>('Level 2');
  const [delimiterAction, setDelimiterAction] = useState<DelimiterAction>('Skip Succeeding');

  const editorRef = useRef<HTMLDivElement>(null);

  const validSegments = useMemo(() => segments.map(s => s.trim()).filter(Boolean), [segments]);

  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting) {
      setVisibleSegmentCount(prevCount => prevCount + 50);
    }
  }, [isIntersecting]);

  useEffect(() => {
    // Handle external scroll requests from App.tsx
    if (scrollToSegment && source && scrollToSegment.sourceId === source.id) {
      const index = scrollToSegment.segmentIndex;
      if (index >= 0 && index < validSegments.length) {
        if (index >= visibleSegmentCount) {
          setVisibleSegmentCount(index + 50);
        }
        setTimeout(() => {
          const element = document.getElementById(`segment-item-${index}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-scroll');
            setTimeout(() => {
              element.classList.remove('highlight-scroll');
            }, 1500);
          }
          onScrollToSegmentHandled();
        }, 0);
      }
    }

    // Handle internal scroll requests
    if (scrollToIndex !== null) {
      if (scrollToIndex >= 0 && scrollToIndex < validSegments.length) {
        if (scrollToIndex >= visibleSegmentCount) {
          setVisibleSegmentCount(scrollToIndex + 50);
        }
        setTimeout(() => {
          const element = document.getElementById(`segment-item-${scrollToIndex}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('highlight-scroll');
            setTimeout(() => {
              element.classList.remove('highlight-scroll');
            }, 1500);
          }
          setScrollToIndex(null); // Clear local scroll request
        }, 0);
      }
    }
  }, [scrollToSegment, scrollToIndex, source, validSegments, visibleSegmentCount, onScrollToSegmentHandled]);

  const onMemoriesNumbered = useCallback((newMemories: Record<number, { source: string, target: string }>) => {
    setNumberedMemories(oldMemories => {
      if (JSON.stringify(oldMemories) === JSON.stringify(newMemories)) {
        return oldMemories;
      }
      return newMemories;
    });
  }, []);

  const handleInsertMemory = useCallback((text: string) => {
    setCurrentTranslation(prev => prev + text);
  }, []);

  useEffect(() => {
    if (source) {
      let mems = {};
      const rawMemories = localStorage.getItem(`memories_${source.id}`);
      if (rawMemories) {
        try {
          let decompressed = rawMemories;
          if (source.compression) {
            decompressed = pako.inflate(atobUint8Array(rawMemories), { to: 'string' });
          }
          mems = JSON.parse(decompressed);
        } catch (e: any) {
          setError({ title: 'Data Error', message: `Could not read memories: ${e.message}` });
        }
      }
      setMemories(mems);

      let trans = {};
      const rawTranslations = localStorage.getItem(`translations_${source.id}`);
      if (rawTranslations) {
        try {
          let decompressed = rawTranslations;
          if (source.compression) {
            decompressed = pako.inflate(atobUint8Array(rawTranslations), { to: 'string' });
          }
          trans = JSON.parse(decompressed);
        } catch (e: any) {
          setError({ title: 'Data Error', message: `Could not read translations: ${e.message}` });
        }
      }
      setTranslations(trans);
      setTranslatedTitle((trans as any)['__title__'] || '');

    } else {
      setTranslations({});
      setTranslatedTitle('');
      setVisibleSegmentCount(50);
    }
  }, [source, memoryVersion, setError]);

  const handleEdit = (segment: string) => {
    const trimmedSegment = segment.trim();
    setEditingSegment(trimmedSegment);
    const translationData = translations[trimmedSegment];
    if (typeof translationData === 'object' && translationData !== null) {
      setCurrentTranslation(translationData.text || '');
      setCurrentNote(translationData.note || '');
      setSegmentGrammarRule(translationData.grammarRule || '');
      setSegmentType(translationData.segmentType || 'Body');
      setOutlineLevel(translationData.outlineLevel || 'Level 2');
      setDelimiterAction(translationData.delimiterAction || 'Skip Succeeding');
    } else {
      setCurrentTranslation(translationData || '');
      setCurrentNote('');
      setSegmentGrammarRule('');
      setSegmentType('Body');
      setOutlineLevel('Level 2');
      setDelimiterAction('Skip Succeeding');
    }
    setDiagnostics([]);
    setNumberedMemories({});
  };

  const saveData = (key: string, data: any) => {
    if (!source) return false;
    const stringified = JSON.stringify(data);
    let valueToStore = stringified;
    if (source.compression) {
      try {
        valueToStore = btoa(String.fromCharCode(...pako.deflate(stringified, { level: source.compressionLevel })));
      } catch (err: any) {
        setError({ title: 'Compression Error', message: `Failed to save data for key ${key}: ${err.message}` });
        return false;
      }
    }
    return handleSetItem(key, valueToStore);
  }

  const handleSave = (segment: string) => {
    if (hasErrors && segmentType !== 'Skip') return;
    const trimmedSegment = segment.trim();
    const updatedTranslations = { 
      ...translations, 
      [trimmedSegment]: { 
        text: currentTranslation, 
        note: currentNote, 
        grammarRule: segmentGrammarRule,
        segmentType: segmentType,
        outlineLevel: outlineLevel,
        delimiterAction: segmentType === 'Skip' ? delimiterAction : undefined
      } 
    };
    
    if (source) {
      if (saveData(`translations_${source.id}`, updatedTranslations)) {
        setTranslations(updatedTranslations);
        onTranslationsUpdate();
        setEditingSegment(null);
      }
    }
  };

  const handleSaveAndEditNext = (currentSegmentTrimmed: string) => {
    if (hasErrors && segmentType !== 'Skip') return;

    const updatedTranslations = { 
      ...translations, 
      [currentSegmentTrimmed]: { 
        text: currentTranslation, 
        note: currentNote, 
        grammarRule: segmentGrammarRule,
        segmentType: segmentType,
        outlineLevel: outlineLevel,
        delimiterAction: segmentType === 'Skip' ? delimiterAction : undefined
      } 
    };
    
    if (source) {
      if (saveData(`translations_${source.id}`, updatedTranslations)) {
        setTranslations(updatedTranslations);
        onTranslationsUpdate();
        const currentIndex = validSegments.indexOf(currentSegmentTrimmed);
        if (currentIndex < validSegments.length - 1) {
          const nextSegmentToEdit = validSegments[currentIndex + 1];
          handleEdit(nextSegmentToEdit);
        } else {
          setEditingSegment(null);
        }
      }
    }
  };

  const handleCancel = () => {
    setEditingSegment(null);
  };

  const handleTitleSave = () => {
    const updatedTranslations = { ...translations, '__title__': translatedTitle };
    if (source) {
      if (saveData(`translations_${source.id}`, updatedTranslations)) {
        setTranslations(updatedTranslations);
        onTranslationsUpdate();
      }
    }
  };

  const handleSaveMemory = (sourceText: string, targetText: string) => {
    if (source) {
      const updatedMemories = { ...memories, [sourceText]: targetText };
      if (saveData(`memories_${source.id}`, updatedMemories)) {
        onMemoryUpdate();
      }
    }
  };

  const navigateToSegment = (index: number) => {
    if (index >= 0 && index < validSegments.length) {
      if (index >= visibleSegmentCount) {
        setVisibleSegmentCount(index + 50);
      }
      setScrollToIndex(index); // Correctly setting local state
    }
  };

  const handleGoToIncomplete = () => {
    const nextIncompleteIndex = validSegments.findIndex(seg => {
      const translationData = translations[seg];
      const text = (typeof translationData === 'object' && translationData !== null) ? translationData.text : translationData;
      return !text && translationData?.segmentType !== 'Skip';
    });
    if (nextIncompleteIndex !== -1) {
      navigateToSegment(nextIncompleteIndex);
    } else {
      alert('All segments are complete!');
    }
  };

  const handleGoToEnd = () => {
    navigateToSegment(validSegments.length - 1);
  };

  const handleGoToSegment = () => {
    const targetIndex = parseInt(goToSegment, 10) - 1;
    navigateToSegment(targetIndex);
  };

  const handleShowSplitModal = (index: number) => {
    setSplitIndex(index);
    setShowSplitModal(true);
  };

  const handleExecuteSplit = () => {
    if (source && splitIndex !== null) {
      onSplit(source, splitIndex);
      setShowSplitModal(false);
      setSplitIndex(null);
    }
  };

  const handleSegmentTypeChange = (newType: SegmentType) => {
    if (segmentType === 'Skip' && newType !== 'Skip') {
      setDelimiterAction('Keep Both');
    }
    setSegmentType(newType);
  };

  if (!source) {
    return <div>Please select a source from the sidebar to start translating.</div>;
  }

  const grammarErrors = diagnostics.filter(d => d.severity === 'info');
  const spellingErrors = diagnostics.filter(d => d.severity === 'warning');
  const hasErrors = (grammarCheck && grammarErrors.length > 0) || (spellCheck && spellingErrors.length > 0);

  const settingsPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Form.Group className="mb-3">
            <Form.Label>Segment Grammar Rule</Form.Label>
            <Form.Select value={segmentGrammarRule} onChange={(e) => setSegmentGrammarRule(e.target.value)} size="sm">
                <option value="">Default</option>
                <option value="Sentences">Sentences</option>
                <option value="Constituents">Constituents</option>
                <option value="Phrases">Phrases</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Segment Type</Form.Label>
            <Form.Select value={segmentType} onChange={(e) => handleSegmentTypeChange(e.target.value as SegmentType)} size="sm">
                <option value="Body">Body</option>
                <option value="Heading">Heading</option>
                <option value="Skip">Skip</option>
            </Form.Select>
        </Form.Group>
        {segmentType === 'Heading' && (
            <Form.Group className="mb-3">
                <Form.Label>Outline Level</Form.Label>
                <Form.Select value={outlineLevel} onChange={(e) => setOutlineLevel(e.target.value as OutlineLevel)} size="sm">
                    <option value="Skip">Skip</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                </Form.Select>
            </Form.Group>
        )}
        {segmentType === 'Skip' && (
            <Form.Group className="mb-3">
                <Form.Label>Delimiter Actions</Form.Label>
                <Form.Select value={delimiterAction} onChange={(e) => setDelimiterAction(e.target.value as DelimiterAction)} size="sm">
                    <option value="Keep Both">Keep Both</option>
                    <option value="Skip Preceding">Skip Preceding</option>
                    <option value="Skip Succeeding">Skip Succeeding</option>
                    <option value="Skip Both">Skip Both</option>
                </Form.Select>
            </Form.Group>
        )}
      </Popover.Body>
    </Popover>
  );

  const notePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Segment Note</Popover.Header>
      <Popover.Body>
        <Form.Control
          as="textarea"
          rows={3}
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
      </Popover.Body>
    </Popover>
  );

  const renderSegmentContent = (segment: string, translationData: any, delimiter?: string) => {
    const translationText = translationData?.text;
    const segType = translationData?.segmentType || 'Body';
    const outLevel = translationData?.outlineLevel || (
      segType === 'Heading' ? 'Level 2' : 'Skip'
    );
    const textToShow = segType === 'Skip' ? segment : (translationText || segment);

    if (segType === 'Heading') {
      if (outLevel === 'Level 2') return <h2>{textToShow}</h2>;
      if (outLevel === 'Level 3') return <h3>{textToShow}</h3>;
    }
    const delimiterBadge = <Badge title='Delimiter' bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em', fontSize: '0.8em'}}>{delimiter}</Badge>
    return <p className={`mb-0 ${!translationText && segType !== 'Skip' ? 'source-text' : ''} ${segType === 'Skip' ? 'text-muted' : ''}`}>{textToShow}{delimiter && delimiterBadge}</p>;
  };

  return (
    <div ref={editorRef}>
      {source && splitIndex !== null && (
        <SplitSourceModal 
          show={showSplitModal}
          onHide={() => setShowSplitModal(false)}
          onExecute={handleExecuteSplit}
          source={source}
          splitIndex={splitIndex}
          segments={segments}
          delimiters={delimiters}
        />
      )}
      <div className="d-flex justify-content-between align-items-center">
        <h1>{translatedTitle || source.title}</h1>
        <Stack direction="horizontal" gap={2}>
          <InputGroup size="sm">
            <Button variant="outline-info" onClick={handleGoToIncomplete}>Go To Incomplete</Button>
            <Button variant="outline-danger" onClick={handleGoToEnd}>Go To End</Button>
            <Form.Control
              id='go-to-segment-number-input'
              type="number"
              value={goToSegment}
              onChange={(e) => setGoToSegment(e.target.value)}
              style={{ maxWidth: '80px' }}
            />
            <InputGroup.Text id='go-to-segment-number-length'>/ {validSegments.length}</InputGroup.Text>
            <Button variant="outline-dark" onClick={handleGoToSegment}>Go</Button>
          </InputGroup>
        </Stack>
      </div>
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
        {validSegments.slice(0, visibleSegmentCount).map((segment, index) => {
            const isLastSegment = index === validSegments.length - 1;
            const translationData = translations[segment];
            const noteText = translationData?.note;
            const segType = translationData?.segmentType || 'Body';
            const delimiter = delimiters[index]?.replaceAll('\n', '⏎')

            return (
              <ListGroup.Item key={index} id={`segment-item-${index}`} className={`d-flex align-items-center ${segType === 'Skip' ? 'list-group-item-light' : ''}`}>
                {editingSegment === segment ? (
                  <div className="w-100">
                    <UnderlinedText text={segment} memories={memories} onInsert={handleInsertMemory} onMemoriesNumbered={onMemoriesNumbered} memoryVersion={memoryVersion} />
                    {delimiter && <Badge bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em'}}>{delimiter}</Badge>}
                    <SpellCheckEditor 
                      value={currentTranslation} 
                      onChange={setCurrentTranslation} 
                      onDiagnosticsChange={setDiagnostics}
                      autofocus={editingSegment === segment}
                      numberedMemories={numberedMemories}
                      grammarRule={segmentGrammarRule || source.defaultGrammarRule || defaultGrammarRule}
                    />
                    <Stack direction='horizontal' gap={1}>
                      <Button variant="success" size="sm" className="mt-2" onClick={() => handleSaveAndEditNext(segment)} disabled={isLastSegment || (hasErrors && segmentType !== 'Skip') || (!currentTranslation && segmentType !== 'Skip')}>Save & Edit Next</Button>
                      <Button variant="primary" size="sm" className="mt-2 ml-2" onClick={() => handleSave(segment)} disabled={(hasErrors && segmentType !== 'Skip') || (!currentTranslation && segmentType !== 'Skip')}>Save</Button>
                      <Button variant="secondary" size="sm" className="mt-2 ml-2" onClick={handleCancel}>Cancel</Button>
                      <Form.Label column className='mt-2'>{' '}<small>Segment #{index+1}</small></Form.Label>
                      <OverlayTrigger trigger="click" placement="top" overlay={notePopover} rootClose>
                        <Button variant={currentNote ? "primary" : "outline-primary"} size="sm" className="mt-2 ml-2">Note</Button>
                      </OverlayTrigger>
                      <OverlayTrigger trigger="click" placement="left" overlay={settingsPopover} rootClose>
                        <Button variant="secondary" size="sm" className="mt-2 ms-auto">⚙️</Button>
                      </OverlayTrigger>
                    </Stack>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center w-100">
                    {renderSegmentContent(segment, translationData, delimiter)}
                    <Stack direction='horizontal'>
                      {noteText && <span title={`Note: ${noteText}`} style={{ paddingRight: '1em' }}>🗒️</span>}
                      <Button variant="link" title='Edit segment' onClick={() => handleEdit(segment)} style={{textDecoration: 'none'}}>✏️</Button>
                      <Button variant="link" title='Split source' onClick={() => handleShowSplitModal(index)} style={{textDecoration: 'none'}} disabled={index===0}>✂️</Button>
                    </Stack>
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
