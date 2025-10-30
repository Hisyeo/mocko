import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';

import aesopFables from '../vendor/stories/aesopFables.json'

interface Fable {
  title: string;
  story: string;
}

interface AddSourceModalProps {
  show: boolean;
  onHide: () => void;
  onAddSource: (title: string, content: string) => void;
  onImport: (data: any) => void;
}

const AddSourceModal: React.FC<AddSourceModalProps> = ({ show, onHide, onAddSource, onImport }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddSource = () => {
    onAddSource(title, content);
    setTitle('');
    setContent('');
    onHide();
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onHide();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        try {
          const data = JSON.parse(fileContent);
          onImport(data);
          onHide();
        } catch (error) {
          alert('Error parsing MOCKO file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleMagicWand = () => {
    if (aesopFables.stories.length > 0) {
      const randomFable = aesopFables.stories[Math.floor(Math.random() * aesopFables.stories.length)];
      setTitle(randomFable.title);
      setContent(randomFable.story.concat(`\n\n${randomFable.moral}`).join(' '));
    }
  };

  const isWandDisabled = title !== '' || content !== '';

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
        <Stack direction='horizontal' gap={3}>
          <label htmlFor="import-mocko" className="btn btn-info">Import MOCKO file</label>
          <input id="import-mocko" type="file" accept=".mocko" onChange={handleFileChange}  style={{ display: 'none' }} />
          <div className='vr'/>
          <Button variant="danger" onClick={handleMagicWand} disabled={isWandDisabled} title='Random story time!'>🪄</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleAddSource}>Add</Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSourceModal;