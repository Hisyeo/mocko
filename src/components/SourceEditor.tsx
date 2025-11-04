import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Card, Collapse, Stack, Spinner } from 'react-bootstrap';
import SegmentationPreviewModal from './SegmentationPreviewModal';
import { Source } from '../App';
import { CompressionLevel, useApp } from '../AppContext';
import { useSource } from '../SourceContext';
import pako from 'pako';

// Helper to decode from base64 Uint8Array
const atobUint8Array = (b64: string) => {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Uint8Array(byteNumbers);
}

interface SourceEditorProps {
  allSources: Source[];
  onSourceUpdate: (updatedSource: Source) => void;
  onDelete: (sourceId: string) => void;
  onDuplicate: (source: Source) => void;
  translationsVersion: number;
}

const SourceEditor: React.FC<SourceEditorProps> = ({ allSources, onSourceUpdate, onDelete, onDuplicate, translationsVersion }) => {
  const { source, decompressedContent } = useSource();
  const { grammarCheck, setError, handleSetItem, updateStorageVersion } = useApp();

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
  const [isCompressed, setIsCompressed] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>(1);
  const [originalCompression, setOriginalCompression] = useState(false);
  const [originalCompressionLevel, setOriginalCompressionLevel] = useState(1);

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
      setContent(decompressedContent);
      setOriginalTitle(source.title);
      setOriginalFilename(source.filename);
      setOriginalContent(decompressedContent);
      const rule = source.segmentationRule || '\n';
      setSegmentationRule(rule);
      setOriginalSegmentationRule(rule);
      setDefaultGrammarRule(source.defaultGrammarRule || '');
      validateRegex(rule);
      setSourceSize(calculateSourceSize(source.id));
      
      const compression = source.compression || false;
      const level = source.compressionLevel === undefined ? 1 : source.compressionLevel;
      setIsCompressed(compression);
      setCompressionLevel(level);
      setOriginalCompression(compression);
      setOriginalCompressionLevel(level);

      let translations = {};
      const rawTranslations = localStorage.getItem(`translations_${source.id}`);
      if (rawTranslations) {
        try {
          let decompressed = rawTranslations;
          if (source.compression) {
            decompressed = pako.inflate(atobUint8Array(rawTranslations), { to: 'string' });
          }
          translations = JSON.parse(decompressed);
        } catch (e: any) {
          setError({ title: 'Data Error', message: `Could not read translations: ${e.message}` });
        }
      }
      setTranslatedTitle((translations as any)['__title__'] || '');

      const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');
      worker.onmessage = (e) => {
        if (e.data.task === 'stats') {
          setStats(e.data.stats);
          setRenderedContent(e.data.renderedContent);
          setIsLoading(false);
        }
      };
      worker.postMessage({ task: 'stats', content: decompressedContent, segmentationRule: rule, translations });
    }
  }, [source, translationsVersion, decompressedContent, setError]);

  const handleDefaultSegmentRuleChange : React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value == 'string' && source?.id) {
      setDefaultGrammarRule(event.target.value)
      onSourceUpdate({ ...source, title, content, filename , defaultGrammarRule: event.target.value });
    }
  }

  const handleContentSave = () => {
    if (!source) return;

    const isDuplicate = allSources.some(s => s.id !== source.id && s.filename === filename);
    if (isDuplicate) {
      setFilenameError('A source with this filename already exists.');
      return;
    }

    if (!validateRegex(segmentationRule)) {
      return;
    }

    // If compression has changed, convert associated data first.
    if (isCompressed !== originalCompression) {
      const keysToConvert = [`translations_${source.id}`, `memories_${source.id}`, `delimiters_${source.id}`];
      
      for (const key of keysToConvert) {
        const rawValue = localStorage.getItem(key);
        if (!rawValue) continue;

        let parsedData;
        try {
          let decompressed = rawValue;
          if (originalCompression) { // If it WAS compressed, decompress it
            decompressed = pako.inflate(atobUint8Array(rawValue), { to: 'string' });
          }
          parsedData = JSON.parse(decompressed);
        } catch (e: any) {
          setError({ title: 'Data Conversion Error', message: `Could not read existing data for ${key} while changing compression: ${e.message}. Aborting.` });
          return;
        }

        const stringifiedValue = JSON.stringify(parsedData);
        let valueToStore = stringifiedValue;
        if (isCompressed) { // If the NEW format is compressed, compress it
          try {
            const compressed = pako.deflate(stringifiedValue, { level: compressionLevel });
            valueToStore = btoa(String.fromCharCode(...compressed));
          } catch (err: any) {
            setError({ title: 'Compression Error', message: `Failed to convert and compress data for ${key}: ${err.message}` });
            return;
          }
        }
        
        if (!handleSetItem(key, valueToStore)) {
            // handleSetItem already set the error, just need to abort
            return;
        }
      }
      updateStorageVersion();
    }

    let finalContent = content;
    if (isCompressed) {
      try {
        const compressed = pako.deflate(content, { level: compressionLevel });
        finalContent = btoa(String.fromCharCode(...compressed));
      } catch (err: any) {
        setError({ title: 'Compression Error', message: `Failed to compress content: ${err.message}` });
        return; // Abort save
      }
    }

    const updatedSource: Source = {
      ...source,
      title,
      filename,
      content: finalContent,
      defaultGrammarRule,
      compression: isCompressed,
      compressionLevel: compressionLevel
    };

    onSourceUpdate(updatedSource);
    setOriginalTitle(title);
    setOriginalContent(content);
    setOriginalFilename(filename);
    setOriginalCompression(isCompressed);
    setOriginalCompressionLevel(compressionLevel as number);
  };

  const handleContentDiscard = () => {
    setTitle(originalTitle);
    setContent(originalContent);
    setFilename(originalFilename);
    setFilenameError(null);
    setSegmentationRule(originalSegmentationRule);
    setSegmentationRuleError(null);
    setIsCompressed(originalCompression);
    setCompressionLevel(originalCompressionLevel as pako.DeflateFunctionOptions['level']);
  };

  const handleSegmentationSave = () => {
    if (source && validateRegex(segmentationRule)) {
      setIsExecutingSegmentation(true);
      const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');
      worker.onmessage = (e) => {
        if (e.data.task === 'segment') {
          const { newDelimiters, newTranslations } = e.data;
          let success = true;
          
          const delimitersString = JSON.stringify(newDelimiters);
          let delimitersToStore = delimitersString;
          if(source.compression) {
            delimitersToStore = btoa(String.fromCharCode(...pako.deflate(delimitersString, { level: source.compressionLevel })));
          }
          success = success && handleSetItem(`delimiters_${source.id}`, delimitersToStore);

          const translationsString = JSON.stringify(newTranslations);
          let translationsToStore = translationsString;
          if(source.compression) {
            translationsToStore = btoa(String.fromCharCode(...pako.deflate(translationsString, { level: source.compressionLevel })));
          }
          success = success && handleSetItem(`translations_${source.id}`, translationsToStore);

          if (success) {
            onSourceUpdate({ ...source, segmentationRule });
            setOriginalSegmentationRule(segmentationRule);
            setShowSegPreview(false);
          }
          setIsExecutingSegmentation(false);
        }
      };

      let oldTranslations = {};
      const rawTranslations = localStorage.getItem(`translations_${source.id}`);
      if (rawTranslations) {
        try {
          let decompressed = rawTranslations;
          if (source.compression) {
            decompressed = pako.inflate(atobUint8Array(rawTranslations), { to: 'string' });
          }
          oldTranslations = JSON.parse(decompressed);
        } catch (e: any) {
          setError({ title: 'Data Error', message: `Could not read translations for segmentation: ${e.message}` });
        }
      }
      worker.postMessage({ task: 'segment', content: decompressedContent, segmentationRule, oldTranslations });
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

    // We read raw from localStorage to preserve compression
    const mockoData = {
      source: { ...source, filename, defaultGrammarRule, compression: isCompressed, compressionLevel },
      translations: localStorage.getItem(`translations_${source.id}`) || '{}',
      memories: localStorage.getItem(`memories_${source.id}`) || '{}',
      delimiters: localStorage.getItem(`delimiters_${source.id}`) || '[]',
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

  const isContentChanged = title !== originalTitle || content !== originalContent || filename !== originalFilename || isCompressed !== originalCompression || compressionLevel !== originalCompressionLevel;

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

          <Card className="mt-4">
            <Card.Header>Compression</Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="compression-switch"
                label="Compress source content"
                checked={isCompressed}
                onChange={(e) => setIsCompressed(e.target.checked)}
              />
              <Form.Group controlId="compressionLevel" className="mt-3">
                <Form.Label>Compression Level: {compressionLevel}</Form.Label>
                <Form.Range 
                  min="0" 
                  max="9" 
                  step="1" 
                  value={compressionLevel} 
                  onChange={(e) => setCompressionLevel(parseInt(e.target.value, 10) as CompressionLevel)}
                />
              </Form.Group>
            </Card.Body>
          </Card>

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
