import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ErrorModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  message: React.ReactNode;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onHide, title, message }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;