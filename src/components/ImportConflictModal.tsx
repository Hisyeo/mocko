import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Source } from '../App';

interface ImportConflictModalProps {
  show: boolean;
  onHide: () => void;
  onOverwrite: () => void;
  onRename: (newFilename: string) => void;
  existingFilename: string;
  sources: Source[];
}

const ImportConflictModal: React.FC<ImportConflictModalProps> = ({ show, onHide, onOverwrite, onRename, existingFilename, sources }) => {
  const [newFilename, setNewFilename] = useState('');
  const [error, setError] = useState('');

  const handleRename = () => {
    if (sources.some(s => s.filename === newFilename)) {
      setError('A source with this filename already exists.');
    } else {
      onRename(newFilename);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Import Conflict</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>A source with the filename "{existingFilename}" already exists.</p>
        <p>Would you like to overwrite the existing source or rename the imported source?</p>
        <Form.Group controlId="newFilename">
          <Form.Label>New Filename</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new filename" 
            value={newFilename} 
            onChange={(e) => setNewFilename(e.target.value)} 
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onOverwrite}>Overwrite</Button>
        <Button variant="primary" onClick={handleRename} disabled={!newFilename}>Rename</Button>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImportConflictModal;