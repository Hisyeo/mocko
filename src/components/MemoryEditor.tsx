import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button, Card } from 'react-bootstrap';
import { Source } from '../App';

interface MemoryEditorProps {
  source: Source | null;
  allSources: Source[];
}

const MemoryEditor: React.FC<MemoryEditorProps> = ({ source, allSources }) => {
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [editingMemory, setEditingMemory] = useState<string | null>(null);
  const [currentTranslation, setCurrentTranslation] = useState('');
  const [importedMemories, setImportedMemories] = useState<Record<string, string>>({});

  useEffect(() => {
    if (source) {
      const storedMemories = localStorage.getItem(`memories_${source.id}`);
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      }
    }
  }, [source]);

  const handleEdit = (sourceText: string) => {
    setEditingMemory(sourceText);
    setCurrentTranslation(memories[sourceText]);
  };

  const handleSave = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories, [sourceText]: currentTranslation };
      setMemories(updatedMemories);
      localStorage.setItem(`memories_${source.id}`, JSON.stringify(updatedMemories));
      setEditingMemory(null);
    }
  };

  const handleDelete = (sourceText: string) => {
    if (source) {
      const updatedMemories = { ...memories };
      delete updatedMemories[sourceText];
      setMemories(updatedMemories);
      localStorage.setItem(`memories_${source.id}`, JSON.stringify(updatedMemories));
    }
  };

  const handleImport = (selectedSourceIds: string[]) => {
    let allImported: Record<string, string> = {};
    selectedSourceIds.forEach(id => {
      const stored = localStorage.getItem(`memories_${id}`);
      if (stored) {
        allImported = { ...allImported, ...JSON.parse(stored) };
      }
    });
    setImportedMemories(allImported);
  };

  const handleSelectChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const selectedIds = Array.from(target.selectedOptions, option => option.value);
    handleImport(selectedIds);
  }

  const getMemoryUsage = (memoryText: string) => {
    if (!source) return [];
    const segments = source.content.split(new RegExp(source.segmentationRule || '\n')).filter(segment => segment.trim() !== '');
    return segments.map((segment, index) => segment.includes(memoryText) ? `Segment ${index + 1}` : null).filter(Boolean);
  };

  const finalMemories = { ...importedMemories, ...memories };

  if (!source) {
    return <div>Please select a source from the sidebar to edit memories.</div>;
  }

  return (
    <div>
      <h1>Memory Editing: {source.title}</h1>
      
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Import Memories</Card.Title>
          <Form.Group controlId="importSelect">
            <Form.Label>Select sources to import memories from:</Form.Label>
            <Form.Control as="select" multiple onChange={handleSelectChange}>
              {allSources.filter(s => s.id !== source.id).map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>

      <ListGroup className="mt-4">
        {Object.entries(finalMemories).map(([sourceText, translation]) => (
          <ListGroup.Item key={sourceText}>
            {editingMemory === sourceText ? (
              <div>
                <div><strong>Source:</strong> {sourceText}</div>
                <Form.Control 
                  as="textarea" 
                  rows={2} 
                  placeholder="Enter translation" 
                  value={currentTranslation} 
                  onChange={(e) => setCurrentTranslation(e.target.value)} 
                  className="mt-2"
                />
                <Button variant="primary" size="sm" className="mt-2" onClick={() => handleSave(sourceText)}>Save</Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Source:</strong> {sourceText}</div>
                  <div><strong>Target:</strong> {translation}</div>
                  <div className="text-muted">Usage: {getMemoryUsage(sourceText).join(', ') || 'None'}</div>
                </div>
                {memories[sourceText] && (
                  <div>
                    <Button variant="link" onClick={() => handleEdit(sourceText)}>✏️</Button>
                    <Button variant="link" onClick={() => handleDelete(sourceText)}>🗑️</Button>
                  </div>
                )}
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default MemoryEditor;