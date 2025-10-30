import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface SegmentationPreviewModalProps {
  show: boolean;
  onHide: () => void;
  content: string;
  rule: string;
  originalRule: string;
  onExecute: () => void;
}

const SegmentationPreviewModal: React.FC<SegmentationPreviewModalProps> = ({ show, onHide, content, rule, originalRule, onExecute }) => {
  const getHighlightedContent = () => {
    try {
      const regex = new RegExp(rule, 'g');
      const segments = content.split(regex);
      let lastIndex = 0;
      const highlighted = segments.reduce<React.ReactNode[]>((acc, segment, index) => {
        const match = content.substring(lastIndex).match(regex);
        const delimiter = match ? match[0] : '';
        lastIndex += segment.length + delimiter.length;
        const color = `hsl(${(index * 60) % 360}, 100%, 75%)`;
        return [...acc, <span key={index} style={{ backgroundColor: color }}>{segment}</span>, delimiter];
      }, []);
      return highlighted;
    } catch (error) {
      return <div className="alert alert-danger">Invalid regular expression.</div>;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Segmentation Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body id='segmentation-preview-modal-body'>
        {getHighlightedContent()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={onExecute} disabled={rule === originalRule}>Execute</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SegmentationPreviewModal;