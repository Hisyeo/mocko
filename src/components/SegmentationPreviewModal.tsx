import React, { useMemo, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SegmentationPreviewModalProps {
  show: boolean;
  onHide: () => void;
  content: string;
  rule: string;
  originalRule: string;
  onExecute: () => void;
}

const SegmentationPreviewModal: React.FC<SegmentationPreviewModalProps> = ({ show, onHide, content, rule, originalRule, onExecute }) => {
  const [visibleCount, setVisibleCount] = useState(100);
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting) {
      setVisibleCount(prev => prev + 100);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (show) {
      // Reset visible count when modal is opened
      setVisibleCount(100);
    }
  }, [show]);

  const highlightedContent = useMemo(() => {
    if (!show) return null;

    try {
      const regex = new RegExp(rule, 'g');
      const segments = content.split(regex);
      let lastIndex = 0;

      const highlighted = segments.slice(0, visibleCount).reduce<React.ReactNode[]>((acc, segment, index) => {
        const match = content.substring(lastIndex).match(regex);
        const delimiter = match ? match[0] : '';
        lastIndex += segment.length + delimiter.length;
        const color = `hsl(${(index * 60) % 360}, 100%, 75%)`;
        return [...acc, <span key={index} style={{ backgroundColor: color }}>{segment}</span>, delimiter];
      }, []);

      return (
        <>
          {highlighted}
          {segments.length > visibleCount && <div ref={sentinelRef} style={{ height: '1px' }} />} 
        </>
      );
    } catch (error) {
      return <div className="alert alert-danger">Invalid regular expression.</div>;
    }
  }, [content, rule, show, visibleCount, sentinelRef]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Segmentation Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body 
        id='segmentation-preview-modal-body' 
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        {highlightedContent}
      </Modal.Body>
      <Modal.Footer>
        {rule === originalRule && <span>No rule change</span>}
        <Button variant="secondary" onClick={onHide}>Close</Button>
        {rule !== originalRule && <Button variant="danger" onClick={onExecute}>Execute</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default SegmentationPreviewModal;