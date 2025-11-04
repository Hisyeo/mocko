import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Collapse } from 'react-bootstrap';
import { Source } from '../App';
import { useApp } from '../AppContext';
import { useSource } from '../SourceContext';
import { useCompressedStorage } from '../hooks/useCompressedStorage';
import Pako from 'pako';

// Helper to check if a string is base64 encoded
function isBase64(str: string) {
  if (str ==='' || str.trim() ==='') { return false; }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

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
}

interface ImportedMemory {
  target: string;
  sourceTitle: string;
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({ allSources }) => {
  const { source, segments } = useSource();
  const { getItem, setItem } = useCompressedStorage();

  const [memories, setMemories] = useState<Record<string, string>>({});
  const [editingMemory, setEditingMemory] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [importedMemories, setImportedMemories] = useState<Record<string, ImportedMemory>>({});
  const [importSourceIds, setImportSourceIds] = useState<string[]>([]);
  const [showImportPanel, setShowImportPanel] = useState(false);

  useEffect(() => {
    if (source) {
      const storedMemories = getItem(`memories_${source.id}`);
      setMemories(storedMemories ? JSON.parse(storedMemories) : {});
      setImportedMemories({});
      setImportSourceIds([]);
    } else {
      setMemories({});
      setImportedMemories({});
      setImportSourceIds([]);
    }
  }, [source, getItem]);

  useEffect(() => {
    let allImported: Record<string, ImportedMemory> = {};
    importSourceIds.forEach(id => {
      const sourceTitle = allSources.find(s => s.id === id)?.title || 'Unknown Source';
      // This part does not use the hook because it's reading other sources' data
      // which might have different compression settings. For simplicity, we read raw.
      // A more robust solution would require a getItem that accepts a source object.
      const stored = localStorage.getItem(`memories_${id}`);
      if (stored) {
        try {
          const sourceToRead = allSources.find(s => s.id === id);
          let decompressed = stored;
          if (sourceToRead?.compression) {
            decompressed = isBase64(decompressed) ? Pako.inflate(atobUint8Array(decompressed), { to: 'string' }) : decompressed;
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

  const handleEdit = (sourceText: string) => {
    setEditingMemory(sourceText);
    setCurrentTranslation(memories[sourceText]);
  };

  const handleSave = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories, [sourceText]: currentTranslation };
      if (setItem(`memories_${source.id}`, JSON.stringify(updatedMemories))) {
        setMemories(updatedMemories);
        setEditingMemory(null);
      }
    }
  };

  const handleDelete = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories };
      delete updatedMemories[sourceText];
      if (setItem(`memories_${source.id}`, JSON.stringify(updatedMemories))) {
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