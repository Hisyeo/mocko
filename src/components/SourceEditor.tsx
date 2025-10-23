import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import SegmentationPreviewModal from './SegmentationPreviewModal';
import { Source } from '../App';

interface SourceEditorProps {
  source: Source | null;
  onSourceUpdate: (updatedSource: Source) => void;
}

const SourceEditor: React.FC<SourceEditorProps> = ({ source, onSourceUpdate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [segmentationRule, setSegmentationRule] = useState('\n');
  const [originalSegmentationRule, setOriginalSegmentationRule] = useState('\n');
  const [showPreview, setShowPreview] = useState(false);
  const [stats, setStats] = useState<Record<string, number | string>>({});
  const [previewContent, setPreviewContent] = useState('');

  const countWords = (text: string) => {
    return text.split(/\s+/).filter(word => word !== '').length;
  };

  useEffect(() => {
    if (source) {
      setTitle(source.title);
      setContent(source.content);
      setOriginalTitle(source.title);
      setOriginalContent(source.content);
      const rule = source.segmentationRule || '\n';
      setSegmentationRule(rule);
      setOriginalSegmentationRule(rule);

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const translations = storedTranslations ? JSON.parse(storedTranslations) : {};
      
      const wrappedRule = `(${rule})`;
      const parts = source.content.split(new RegExp(wrappedRule));
      const segments = parts.filter((_, i) => i % 2 === 0);
      const delimiters = parts.filter((_, i) => i % 2 !== 0);

      const sourceWordCount = countWords(source.content);
      const translatedSegments = Object.keys(translations).filter(key => key !== '__title__');
      const translatedWordCount = translatedSegments.reduce((acc, key) => acc + countWords(translations[key]), 0);
      const numSegments = segments.filter(seg => seg.trim() !== '').length;
      const avgSourceWords = numSegments > 0 ? (sourceWordCount / numSegments).toFixed(2) : 0;
      const numTranslatedSegments = translatedSegments.length;
      const avgTranslatedWords = numTranslatedSegments > 0 ? (translatedWordCount / numTranslatedSegments).toFixed(2) : 0;

      setStats({
        sourceWordCount,
        translatedWordCount,
        numSegments,
        avgSourceWords,
        numTranslatedSegments,
        avgTranslatedWords,
      });

      // Reconstruct translated content for preview
      let reconstructed = '';
      segments.forEach((seg, i) => {
        reconstructed += translations[seg.trim()] || seg;
        if (delimiters[i]) {
          reconstructed += delimiters[i];
        }
      });
      setPreviewContent(reconstructed);
    }
  }, [source]);

  const handleContentSave = () => {
    if (source) {
      const wrappedRule = `(${segmentationRule})`;
      const parts = content.split(new RegExp(wrappedRule));
      const newSegments = parts.filter((_, i) => i % 2 === 0).map(s => s.trim()).filter(Boolean);
      const newDelimiters = parts.filter((_, i) => i % 2 !== 0);
      localStorage.setItem(`delimiters_${source.id}`, JSON.stringify(newDelimiters));

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const oldTranslations = storedTranslations ? JSON.parse(storedTranslations) : {};
      const newTranslations: Record<string, string> = {};

      newSegments.forEach(newSegment => {
        if (oldTranslations[newSegment]) {
          newTranslations[newSegment] = oldTranslations[newSegment];
        }
      });

      localStorage.setItem(`translations_${source.id}`, JSON.stringify(newTranslations));
      
      onSourceUpdate({ ...source, title, content });
      setOriginalTitle(title);
      setOriginalContent(content);
    }
  };

  const handleContentDiscard = () => {
    setTitle(originalTitle);
    setContent(originalContent);
  };

  const handleSegmentationSave = () => {
    if (source) {
      const wrappedRule = `(${segmentationRule})`;
      const parts = content.split(new RegExp(wrappedRule));
      const newSegments = parts.filter((_, i) => i % 2 === 0).map(s => s.trim()).filter(Boolean);
      const newDelimiters = parts.filter((_, i) => i % 2 !== 0);
      localStorage.setItem(`delimiters_${source.id}`, JSON.stringify(newDelimiters));

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const oldTranslations = storedTranslations ? JSON.parse(storedTranslations) : {};
      const newTranslations: Record<string, string> = {};

      newSegments.forEach(newSegment => {
        if (oldTranslations[newSegment]) {
          newTranslations[newSegment] = oldTranslations[newSegment];
        }
      });

      localStorage.setItem(`translations_${source.id}`, JSON.stringify(newTranslations));
      onSourceUpdate({ ...source, segmentationRule });
      setOriginalSegmentationRule(segmentationRule);
      setShowPreview(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([previewContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_translated.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewContent).then(() => {
      alert('Copied to clipboard!');
    }, () => {
      alert('Failed to copy!');
    });
  };

  const isContentChanged = title !== originalTitle || content !== originalContent;

  if (!source) {
    return <div>Please select a source from the sidebar to edit.</div>;
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="sourceTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </Form.Group>
        <Form.Group controlId="sourceContent" className="mt-2">
          <Form.Label>Content</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            placeholder="Enter content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" onClick={handleContentSave} className="mt-2" disabled={!isContentChanged}>Save</Button>
        <Button variant="secondary" onClick={handleContentDiscard} className="mt-2 ml-2" disabled={!isContentChanged}>Discard</Button>
      </Form>

      <div className="mt-4">
        <h2>Segmentation</h2>
        <Alert variant="warning">
          Changing segmentation rules will erase existing translations unless there is a segment with an exactly matching source text.
        </Alert>
        <Form.Group controlId="segmentationRule" className="mt-2">
          <Form.Label>Regular Expression</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter regex" 
            value={segmentationRule} 
            onChange={(e) => setSegmentationRule(e.target.value)} 
          />
        </Form.Group>
        <Button variant="info" onClick={() => setShowPreview(true)} className="mt-2">Preview</Button>
      </div>

      <div className="mt-4">
        <h2>Source Stats</h2>
        <Card>
          <Card.Body>
            <p>Words in source: {stats.sourceWordCount}</p>
            <p>Words in translation: {stats.translatedWordCount}</p>
            <p>Number of segments: {stats.numSegments}</p>
            <p>Average source words per segment: {stats.avgSourceWords}</p>
            <p>Completed translation segments: {stats.numTranslatedSegments}</p>
            <p>Average translation words per completed segment: {stats.avgTranslatedWords}</p>
          </Card.Body>
        </Card>
      </div>

      <div className="mt-4">
        <h2>Export</h2>
        <Card>
          <Card.Header>Preview</Card.Header>
          <Card.Body>
            <div dangerouslySetInnerHTML={{ __html: previewContent.replace(/\n/g, '<br />') }} />
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" onClick={handleExport}>Export to TXT</Button>
            <Button variant="secondary" onClick={handleCopy} className="ml-2">Copy</Button>
          </Card.Footer>
        </Card>
      </div>
      <SegmentationPreviewModal 
        show={showPreview} 
        onHide={() => setShowPreview(false)} 
        content={content} 
        rule={segmentationRule} 
        originalRule={originalSegmentationRule}
        onExecute={handleSegmentationSave}
      />
    </div>
  );
}

export default SourceEditor;