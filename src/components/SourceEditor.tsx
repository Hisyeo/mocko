import React, { useState, useEffect, useTransition } from 'react';
import { Button, Form, Alert, Card, Collapse, Stack, Spinner } from 'react-bootstrap';
import SegmentationPreviewModal from './SegmentationPreviewModal';
import { Source } from '../App';
import { useApp } from '../AppContext';
import { useSource } from '../SourceContext';

interface SourceEditorProps {
  allSources: Source[];
  onSourceUpdate: (updatedSource: Source) => void;
  onDelete: (sourceId: string) => void;
  onDuplicate: (source: Source) => void;
  translationsVersion: number;
}

const SourceEditor: React.FC<SourceEditorProps> = ({ allSources, onSourceUpdate, onDelete, onDuplicate, translationsVersion }) => {
  const { source } = useSource();
  const [title, setTitle] = useState('');
  const [filename, setFilename] = useState('');
  const [filenameError, setFilenameError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalFilename, setOriginalFilename] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [segmentationRule, setSegmentationRule] = useState('\n');
  const [segmentationRuleError, setSegmentationRuleError] = useState<string | null>(null);
  const [originalSegmentationRule, setOriginalSegmentationRule] = useState('\n');
  const [showSegPreview, setShowSegPreview] = useState(false);
  const [stats, setStats] = useState<Record<string, number | string>>({});
  const [sourceSize, setSourceSize] = useState(0);
  const [renderedContent, setRenderedContent] = useState('');
  const [showRenPreview, setShowRenPreview] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExecutingSegmentation, setIsExecutingSegmentation] = useState(false);
  const [defaultGrammarRule, setDefaultGrammarRule] = useState('');
  const { grammarCheck, handleSetItem } = useApp();

  const calculateSourceSize = (sourceId: string) => {
    let total = 0;
    const keys = [
        `translations_${sourceId}`,
        `memories_${sourceId}`,
        `delimiters_${sourceId}`
    ];
    const sourcesStr = localStorage.getItem('sources');
    if (sourcesStr) {
        const sources = JSON.parse(sourcesStr);
        const currentSource = sources.find((s: Source) => s.id === sourceId);
        if (currentSource) {
            total += new Blob([JSON.stringify(currentSource)]).size;
        }
    }
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            total += new Blob([value]).size;
        }
    });
    return total;
  };

  const validateRegex = (rule: string) => {
    try {
      new RegExp(rule);
      setSegmentationRuleError(null);
      return true;
    } catch (e: any) {
      setSegmentationRuleError(e.message);
      return false;
    }
  };

  useEffect(() => {
    if (source) {
      setIsLoading(true);
      setTitle(source.title);
      setFilename(source.filename);
      setFilenameError(null);
      setContent(source.content);
      setOriginalTitle(source.title);
      setOriginalFilename(source.filename);
      setOriginalContent(source.content);
      const rule = source.segmentationRule || '\n';
      setSegmentationRule(rule);
      setOriginalSegmentationRule(rule);
      setDefaultGrammarRule(source.defaultGrammarRule || '');
      validateRegex(rule);
      setSourceSize(calculateSourceSize(source.id));

      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const translations = storedTranslations ? JSON.parse(storedTranslations) : {};
      setTranslatedTitle(translations['__title__'] || '');

      const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');
      worker.onmessage = (e) => {
        if (e.data.task === 'stats') {
          setStats(e.data.stats);
          setRenderedContent(e.data.renderedContent);
          setIsLoading(false);
        }
      };
      worker.postMessage({ task: 'stats', content: source.content, segmentationRule: rule, translations });
    }
  }, [source, translationsVersion]);

  const handleDefaultSegmentRuleChange : React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value == 'string' && source?.id) {
      setDefaultGrammarRule(event.target.value)
      onSourceUpdate({ ...source, title, content, filename , defaultGrammarRule: event.target.value });
    }
  }

  const handleContentSave = () => {
    if (source) {
      const isDuplicate = allSources.some(s => s.id !== source.id && s.filename === filename);
      if (isDuplicate) {
        setFilenameError('A source with this filename already exists.');
        return;
      }

      if (!validateRegex(segmentationRule)) {
        return;
      }

      const wrappedRule = `(${segmentationRule})`;
      const parts = content.split(new RegExp(wrappedRule));
      const newSegments = parts.filter((_, i) => i % 2 === 0).map(s => s.trim()).filter(Boolean);
      const newDelimiters = parts.filter((_, i) => i % 2 !== 0);
      
      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const oldTranslations = storedTranslations ? JSON.parse(storedTranslations) : {};
      const newTranslations: Record<string, any> = {};

      newSegments.forEach(newSegment => {
        if (oldTranslations[newSegment]) {
          newTranslations[newSegment] = oldTranslations[newSegment];
        }
      });

      let success = true;
      success = success && handleSetItem(`delimiters_${source.id}`, JSON.stringify(newDelimiters));
      success = success && handleSetItem(`translations_${source.id}`, JSON.stringify(newTranslations));

      if (success) {
        onSourceUpdate({ ...source, title, content, filename, defaultGrammarRule });
        setOriginalTitle(title);
        setOriginalContent(content);
        setOriginalFilename(filename);
      }
    }
  };

  const handleContentDiscard = () => {
    setTitle(originalTitle);
    setContent(originalContent);
    setFilename(originalFilename);
    setFilenameError(null);
    setSegmentationRule(originalSegmentationRule);
    setSegmentationRuleError(null);
  };

  const handleSegmentationSave = () => {
    if (source && validateRegex(segmentationRule)) {
      setIsExecutingSegmentation(true);
      const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');
      worker.onmessage = (e) => {
        if (e.data.task === 'segment') {
          const { newDelimiters, newTranslations } = e.data;
          let success = true;
          success = success && handleSetItem(`delimiters_${source.id}`, JSON.stringify(newDelimiters));
          success = success && handleSetItem(`translations_${source.id}`, JSON.stringify(newTranslations));

          if (success) {
            onSourceUpdate({ ...source, segmentationRule });
            setOriginalSegmentationRule(segmentationRule);
            setShowSegPreview(false);
          }
          setIsExecutingSegmentation(false);
        }
      };
      const storedTranslations = localStorage.getItem(`translations_${source.id}`);
      const oldTranslations = storedTranslations ? JSON.parse(storedTranslations) : {};
      worker.postMessage({ task: 'segment', content, segmentationRule, oldTranslations });
    }
  };

  const handleDelete = () => {
    if (source && window.confirm('Are you sure you want to delete this source? This action cannot be undone.')) {
      onDelete(source.id);
    }
  };

  const handleDuplicate = () => {
    if (source) {
      onDuplicate(source);
    }
  };

  const handleExport = () => {
    const blob = new Blob([renderedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_translated.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMocko = () => {
    if (!source) return;

    const mockoData = {
      source: { ...source, filename, defaultGrammarRule },
      translations: JSON.parse(localStorage.getItem(`translations_${source.id}`) || '{}'),
      memories: JSON.parse(localStorage.getItem(`memories_${source.id}`) || '{}'),
      delimiters: JSON.parse(localStorage.getItem(`delimiters_${source.id}`) || '[]'),
    };

    const blob = new Blob([JSON.stringify(mockoData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.mocko`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedContent).then(() => {
      alert('Copied to clipboard!');
    }, () => {
      alert('Failed to copy!');
    });
  };

  const isContentChanged = title !== originalTitle || content !== originalContent || filename !== originalFilename;

  if (!source) {
    return <div><p>Please select a source from the sidebar to edit.</p></div>;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Form noValidate>
            <Form.Group controlId="filename">
              <Form.Label>Filename</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter filename" 
                value={filename} 
                onChange={(e) => { setFilename(e.target.value); setFilenameError(null); }} 
                isInvalid={!!filenameError}
              />
              <Form.Control.Feedback type="invalid">
                {filenameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="sourceTitle" className="mt-2">
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
            <Stack direction='horizontal' gap={3}>
              <Button variant="primary" onClick={handleContentSave} className="mt-2" disabled={!isContentChanged || !!filenameError || !!segmentationRuleError}>Save</Button>
              <Button variant="secondary" onClick={handleContentDiscard} className="mt-2 ml-2" disabled={!isContentChanged}>Discard Changes</Button>
              <Button variant="info" onClick={handleDuplicate} className="mt-2 ml-2 ms-auto">Duplicate</Button>
              <Button variant="danger" onClick={handleDelete} className="mt-2 ml-2">Delete</Button>
            </Stack>
          </Form>

          <div className="mt-4">
            <h2>Segmentation</h2>
            {grammarCheck && (
              <Form.Group controlId="defaultGrammarRuleSelect" className="mt-3">
                <Form.Label>Default Segment Grammar Rule</Form.Label>
                <Form.Control as="select" value={defaultGrammarRule} onChange={handleDefaultSegmentRuleChange}>
                  <option value="">-</option>
                  <option value="Sentences">Sentences</option>
                  <option value="Constituents">Constituents</option>
                  <option value="Phrases">Phrases</option>
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="segmentationRule" className="mt-2">
              <Form.Label>Regular Expression</Form.Label>
              <Alert variant="warning">
                Changing the segmentation regular expression will erase existing translations unless there is a segment with an exactly matching source text.
              </Alert>
              <Form.Control 
                type="text" 
                placeholder="Enter regex" 
                value={segmentationRule} 
                onChange={(e) => {
                  const val = e.target.value;
                  setSegmentationRule(val);
                  validateRegex(val);
                }} 
                isInvalid={!!segmentationRuleError}
                list='defaultSegmentationRules'
              />
              <Form.Control.Feedback type="invalid">
                {segmentationRuleError}
              </Form.Control.Feedback>
            </Form.Group>
            <datalist id='defaultSegmentationRules'>
              <option value='\n'/>
              <option value='\. '/>
              <option value='\.|;'/>
          <option value={"[\\.:;?][\\s\"']*|,\\s*\""}/>
            </datalist>
            <Stack direction="horizontal" gap={2}>
              <Button variant="info" onClick={() => setShowSegPreview(true)} className="mt-2" disabled={isExecutingSegmentation || !!segmentationRuleError}>
                Preview
              </Button>
              {isExecutingSegmentation && <Spinner animation="border" size="sm" className="mt-2" />}
            </Stack>
          </div>

          <div className="mt-4">
            <h2>Export</h2>
            <Stack direction='horizontal' gap={3}>
              <Button variant="primary" onClick={handleExport}>Export to TXT</Button>
              <Button variant="success" onClick={handleExportMocko}>Export to MOCKO</Button>
              <Button variant="secondary" onClick={handleCopy}>Copy to Clipboard</Button>
              <Button variant="info" onClick={() => setShowRenPreview(!showRenPreview)} className="ms-auto" active={showRenPreview}>Preview</Button>
            </Stack>
            <br/>
            <Collapse in={showRenPreview}>
              <Card>
                <Card.Title id='RenPreviewCollapseCardTitle'>{translatedTitle || title}</Card.Title>
                <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: renderedContent.replace(/\n/g, '<br />') }} />
                </Card.Body>
              </Card>
            </Collapse>
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
                <p>Source size: {(sourceSize / 1024).toFixed(2)} KB</p>
              </Card.Body>
            </Card>
          </div>

          <SegmentationPreviewModal 
            show={showSegPreview} 
            onHide={() => setShowSegPreview(false)} 
            content={content} 
            rule={segmentationRule} 
            originalRule={originalSegmentationRule}
            onExecute={handleSegmentationSave}
          />
        </>
      )}
    </div>
  );
}

export default SourceEditor;
