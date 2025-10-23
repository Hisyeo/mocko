import React, { useState, useEffect, useRef } from 'react';
import { Form, ListGroup, Button, Alert } from 'react-bootstrap';
import { InputStream, CommonTokenStream } from 'antlr4';
import HisyeoLexer from '../vendor/grammar/HisyeoLexer.js';
import HisyeoParser from '../vendor/grammar/HisyeoParser.js';
import { HisyeoErrorListener } from '../grammar/HisyeoErrorListener.js';
import Mark from 'mark.js';
import MemoryTooltip from './MemoryTooltip';
import UnderlinedText from './UnderlinedText';
import { Source } from '../App';

interface TranslationEditorProps {
  source: Source | null;
}

const TranslationEditor: React.FC<TranslationEditorProps> = ({ source }) => {
  const [segments, setSegments] = useState<string[]>([]);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [isAddingMemory, setIsAddingMemory] = useState(false);
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [translatedTitle, setTranslatedTitle] = useState('');

  const editorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (source) {
      const storedMemories = localStorage.getItem(`memories_${source.id}`);
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      }

      const segmentationRule = source.segmentationRule || '\n';
      const sourceSegments = source.content.split(new RegExp(segmentationRule)).filter(segment => segment.trim() !== '');
      setSegments(sourceSegments);
      
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

  const validateSegment = (text: string) => {
    const chars = new InputStream(text);
    const lexer = new HisyeoLexer(chars);
    const lexerListener = new HisyeoErrorListener();
    lexer.removeErrorListeners();
    lexer.addErrorListener(lexerListener);
    const tokens = new CommonTokenStream(lexer);
    const parser = new HisyeoParser(tokens);
    const parserListener = new HisyeoErrorListener();
    parser.removeErrorListeners();
    parser.addErrorListener(parserListener);
    parser.buildParseTrees = true;
    parser.sentence(); // or whatever the root rule is
    return [...lexerListener.errors, ...parserListener.errors];
  };

  const handleEdit = (segment: string) => {
    setEditingSegment(segment);
    setCurrentTranslation(translations[segment] || '');
    setValidationErrors([]);
  };

  const handleSave = (segment: string) => {
    const errors = validateSegment(currentTranslation);
    if (errors.length === 0) {
      const updatedTranslations = { ...translations, [segment]: currentTranslation };
      setTranslations(updatedTranslations);
      if (source) {
        localStorage.setItem(`translations_${source.id}`, JSON.stringify(updatedTranslations));
      }
      setEditingSegment(null);
    } else {
      setValidationErrors(errors);
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
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = currentTranslation.substring(0, start) + text + currentTranslation.substring(end);
      setCurrentTranslation(newText);
    }
  };

  if (!source) {
    return <div>Please select a source from the sidebar to start translating.</div>;
  }

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
        {segments.map((segment, index) => (
          <ListGroup.Item key={index}>
            {editingSegment === segment ? (
              <div>
                <UnderlinedText text={segment} memories={memories} onInsert={handleInsertMemory} />
                {validationErrors.length > 0 && (
                  <Alert variant="danger">
                    {validationErrors.map((error, i) => (
                      <div key={i}>{`Line ${error.line}, Column ${error.column}: ${error.msg}`}</div>
                    ))}
                  </Alert>
                )}
                <Form.Control 
                  as="textarea" 
                  rows={2} 
                  placeholder="Enter translation"
                  value={currentTranslation} 
                  onChange={(e) => setCurrentTranslation(e.target.value)} 
                  className="mt-2"
                />
                <Button variant="primary" size="sm" className="mt-2" onClick={() => handleSave(segment)}>Save</Button>
                <Button variant="secondary" size="sm" className="mt-2 ml-2" onClick={handleCancel}>Cancel</Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                {translations[segment] ? (
                  <p>{translations[segment]}</p>
                ) : (
                  <p>{segment}</p>
                )}
                <Button variant="link" onClick={() => handleEdit(segment)}>✏️</Button>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TranslationEditor;
