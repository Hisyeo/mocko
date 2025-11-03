import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface QuotaExceededModalProps {
  show: boolean;
  onHide: () => void;
}

const QuotaExceededModal: React.FC<QuotaExceededModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Storage Quota Exceeded</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have run out of local storage space.</p>
        <p>This application stores all data in your browser's local storage, which is typically limited to 5-10 MB.</p>
        <p>To free up space, please export some of your sources (using the `.mocko` format to preserve all data) and then delete them from the application.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuotaExceededModal;
