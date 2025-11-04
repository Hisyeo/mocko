import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Collapse } from 'react-bootstrap';
import { Source } from '../App';
import { useApp } from '../AppContext';
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

interface MemoryEditorProps {
  allSources: Source[];
  memoryVersion: number;
}

interface ImportedMemory {
  target: string;
  sourceTitle: string;
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({ allSources, memoryVersion }) => {
  const { source, segments } = useSource();
  const { handleSetItem, setError } = useApp();

  const [memories, setMemories] = useState<Record<string, string>>({});
  const [editingMemory, setEditingMemory] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [importedMemories, setImportedMemories] = useState<Record<string, ImportedMemory>>({});
  const [importSourceIds, setImportSourceIds] = useState<string[]>([]);
  const [showImportPanel, setShowImportPanel] = useState(false);

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
      setImportedMemories({});
      setImportSourceIds([]);
    } else {
      setMemories({});
      setImportedMemories({});
      setImportSourceIds([]);
    }
  }, [source, memoryVersion, setError]);

  useEffect(() => {
    let allImported: Record<string, ImportedMemory> = {};
    importSourceIds.forEach(id => {
      const sourceToRead = allSources.find(s => s.id === id);
      if (!sourceToRead) return;

      const sourceTitle = sourceToRead.title || 'Unknown Source';
      const stored = localStorage.getItem(`memories_${id}`);
      if (stored) {
        try {
          let decompressed = stored;
          if (sourceToRead.compression) {
            decompressed = pako.inflate(atobUint8Array(stored), { to: 'string' });
          }
          const parsedMemories: Record<string, string> = JSON.parse(decompressed);
          for (const sourceText in parsedMemories) {
            if (!allImported[sourceText]) { // Avoid overwriting from multiple imports, first one wins
              allImported[sourceText] = {
                target: parsedMemories[sourceText],
                sourceTitle: sourceTitle
              };
            }
          }
        } catch (e) {
          console.error(`Failed to parse memories for source ${id}`, e);
        }
      }
    });
    setImportedMemories(allImported);
  }, [importSourceIds, allSources]);

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

  const handleEdit = (sourceText: string) => {
    setEditingMemory(sourceText);
    setCurrentTranslation(memories[sourceText]);
  };

  const handleSave = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories, [sourceText]: currentTranslation };
      if (saveData(`memories_${source.id}`, updatedMemories)) {
        setMemories(updatedMemories);
        setEditingMemory(null);
      }
    }
  };

  const handleDelete = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories };
      delete updatedMemories[sourceText];
      if (saveData(`memories_${source.id}`, updatedMemories)) {
        setMemories(updatedMemories);
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setImportSourceIds(prevIds => 
      checked ? [...prevIds, id] : prevIds.filter(prevId => prevId !== id)
    );
  };

  const getMemoryUsage = (memoryText: string) => {
    if (!source) return [];
    return segments.map((segment, index) => segment.includes(memoryText) ? `Segment ${index + 1}` : null).filter(Boolean);
  };

  const finalMemories: Record<string, { target: string, sourceTitle?: string, usage: (string | null)[] }> = {};

  for (const sourceText in importedMemories) {
    const usage = getMemoryUsage(sourceText);
    if (usage.length > 0) {
      finalMemories[sourceText] = { ...importedMemories[sourceText], usage };
    }
  }

  for (const sourceText in memories) {
    const usage = getMemoryUsage(sourceText);
    if (usage.length > 0) {
      finalMemories[sourceText] = { target: memories[sourceText], usage };
    }
  }

  if (!source) {
    return <div>Please select a source from the sidebar to edit memories.</div>;
  }

  return (
    <div>
      <h1>{source.title}</h1>
      
      <Button 
        onClick={() => setShowImportPanel(!showImportPanel)}
        aria-controls="import-memories-panel"
        aria-expanded={showImportPanel}
        className="mt-4"
      >
        Import Memories
      </Button>
      <Collapse in={showImportPanel}>
        <div id="import-memories-panel">
          <Card className="mt-2">
            <Card.Body>
              <Form.Group controlId="importSelect">
                <Form.Label>Select sources to import memories from. Memories will only be displayed if there is a segment that contains the source text of the memory.</Form.Label>
                {allSources.filter(s => s.id !== source.id).map(s => (
                  <Form.Check 
                    type="checkbox"
                    key={s.id}
                    id={s.id}
                    label={s.filename ?? s.title}
                    checked={importSourceIds.includes(s.id)}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Form.Group>
            </Card.Body>
          </Card>
        </div>
      </Collapse>

      <div className="mt-4">
        {Object.entries(finalMemories).map(([sourceText, mem]) => (
          <Card key={sourceText} className="mb-2">
            {mem.sourceTitle && <Card.Header>{mem.sourceTitle}</Card.Header>}
            <Card.Body>
              <Card.Title>{sourceText}</Card.Title>
              {editingMemory === sourceText ? (
                <div>
                  <Form.Control 
                    as="textarea" 
                    rows={2} 
                    placeholder="Enter translation" 
                    value={currentTranslation} 
                    onChange={(e) => setCurrentTranslation(e.target.value)} 
                  />
                  <Button variant="primary" size="sm" className="mt-2" onClick={() => handleSave(sourceText)}>Save</Button>
                </div>
              ) : (
                <div>
                  <Card.Text>{mem.target}</Card.Text>
                  {memories[sourceText] && (
                    <div>
                      <Button variant="link" onClick={() => handleEdit(sourceText)} style={{textDecoration: 'none'}}>✏️</Button>
                      <Button variant="link" onClick={() => handleDelete(sourceText)} style={{textDecoration: 'none'}}>🗑️</Button>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              Usage: {mem.usage.join(', ') || 'None'}
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MemoryEditor;