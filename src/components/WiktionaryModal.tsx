import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface WiktionaryModalProps {
  show: boolean;
  onHide: () => void;
  term: string;
}

const WiktionaryModal: React.FC<WiktionaryModalProps> = ({ show, onHide, term }) => {
  const src = `https://en.wiktionary.org/wiki/${term}`;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Wiktionary: {term}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe src={src} style={{ width: '100%', height: '70vh', border: 'none' }} title={`Wiktionary page for ${term}`} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WiktionaryModal;