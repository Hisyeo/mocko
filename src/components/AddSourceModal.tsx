import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface AddSourceModalProps {
  show: boolean;
  onHide: () => void;
  onAddSource: (title: string, content: string) => void;
}

const AddSourceModal: React.FC<AddSourceModalProps> = ({ show, onHide, onAddSource }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddSource = () => {
    onAddSource(title, content);
    setTitle('');
    setContent('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Source</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              rows={5} 
              placeholder="Enter content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleAddSource}>Add Source</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSourceModal;