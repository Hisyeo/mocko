import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, Button, Badge, Stack } from 'react-bootstrap';
import Mark from 'mark.js';
import MemoryTooltip from './MemoryTooltip';
import UnderlinedText from './UnderlinedText';
import { Source } from '../App';
import SpellCheckEditor from './SpellCheckEditor';
import { Diagnostic } from '@codemirror/lint';
import { useApp } from '../AppContext';

interface TranslationEditorProps {
  source: Source | null;
}

const TranslationEditor: React.FC<TranslationEditorProps> = ({ source }) => {
  const [segments, setSegments] = useState<string[]>([]);
  const [delimiters, setDelimiters] = useState<string[]>([]);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [diagnostics, setDiagnostics] = useState<readonly Diagnostic[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [translatedTitle, setTranslatedTitle] = useState('');
  const { grammarCheck, spellCheck } = useApp();

  const editorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (source) {
      const storedMemories = localStorage.getItem(`memories_${source.id}`);
      setMemories(storedMemories ? JSON.parse(storedMemories) : {});

      const rule = source.segmentationRule || '\n';
      const wrappedRule = `(${rule})`;
      const parts = source.content.split(new RegExp(wrappedRule));
      setSegments(parts.filter((_, i) => i % 2 === 0));
      
      const storedDelimiters = localStorage.getItem(`delimiters_${source.id}`);
      setDelimiters(storedDelimiters ? JSON.parse(storedDelimiters) : parts.filter((_, i) => i % 2 !== 0));

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      if (storedTranslations) {
        const parsedTranslations = JSON.parse(storedTranslations);
        setTranslations(parsedTranslations);
        setTranslatedTitle(parsedTranslations['__title__'] || '');
      }
    }
  }, [source]);

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
    setEditingSegment(segment.trim());
    setCurrentTranslation(translations[segment.trim()] || '');
    setDiagnostics([]);
  };

  const handleSave = (segment: string) => {
    if (hasErrors) return;
    const updatedTranslations = { ...translations, [segment.trim()]: currentTranslation };
    setTranslations(updatedTranslations);
    if (source) {
      localStorage.setItem(`translations_${source.id}`, JSON.stringify(updatedTranslations));
    }
    setEditingSegment(null);
  };

  const handleSaveAndEditNext = (currentSegmentTrimmed: string) => {
    if (hasErrors) return;

    const updatedTranslations = { ...translations, [currentSegmentTrimmed]: currentTranslation };
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
    if (selection && selection.toString()) {
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
      instance.unmark({ done: () => instance.mark(tooltip.text) });
      setIsAddingMemory(true);
    }
  };

  const handleSaveMemory = (target: string) => {
    if (tooltip && source) {
      const updatedMemories = { ...memories, [tooltip.text]: target };
      setMemories(updatedMemories);
      localStorage.setItem(`memories_${source.id}`, JSON.stringify(updatedMemories));
      setIsAddingMemory(false);
      setTooltip(null);
      const instance = new Mark(editorRef.current as HTMLElement);
      instance.unmark();
    }
  };

  const handleInsertMemory = (text: string) => {
    setCurrentTranslation(prev => prev + text);
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
        <MemoryTooltip 
          ref={tooltipRef}
          x={tooltip.x} 
          y={tooltip.y} 
          onAddMemory={handleAddMemory} 
          onSaveMemory={handleSaveMemory}
          isAddingMemory={isAddingMemory}
        />
      )}
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
        {segments.map((segment, index) => {
          const trimmedSegment = segment.trim();
          if (!trimmedSegment) return null;

          const isLastSegment = validSegments.indexOf(trimmedSegment) === validSegments.length - 1;

          return (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              {editingSegment === trimmedSegment ? (
                <div className="w-100">
                  <UnderlinedText text={segment} memories={memories} onInsert={handleInsertMemory} />
                  {delimiters[index] && <Badge bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em'}}>{delimiters[index]}</Badge>}
                  <SpellCheckEditor 
                    value={currentTranslation} 
                    onChange={setCurrentTranslation} 
                    onDiagnosticsChange={setDiagnostics}
                    autofocus={editingSegment === trimmedSegment}
                  />
                  <Stack direction='horizontal' gap={1}>
                    <Button variant="success" size="sm" className="mt-2" onClick={() => handleSaveAndEditNext(trimmedSegment)} disabled={isLastSegment || hasErrors}>Save & Edit Next</Button>
                    <Button variant="primary" size="sm" className="mt-2 ml-2" onClick={() => handleSave(trimmedSegment)} disabled={hasErrors}>Save</Button>
                    <Button variant="secondary" size="sm" className="mt-2 ml-2" onClick={handleCancel}>Cancel</Button>
                  </Stack>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <p className="mb-0">
                    {translations[trimmedSegment] || segment}
                    {delimiters[index] && <Badge bg="secondary" style={{marginLeft: '0.5em', padding: '0.75em', fontSize: '0.8em'}}>{delimiters[index]}</Badge>}
                  </p>
                  <Button variant="link" onClick={() => handleEdit(trimmedSegment)} style={{textDecoration: 'none'}}>✏️</Button>
                </div>
              )}
              
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </div>
  );
}

export default TranslationEditor;