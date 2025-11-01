import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { Source } from '../App';

interface SplitSourceModalProps {
  show: boolean;
  onHide: () => void;
  onExecute: () => void;
  source: Source;
  splitIndex: number;
  segments: string[];
  delimiters: string[];
}

const SplitSourceModal: React.FC<SplitSourceModalProps> = ({ show, onHide, onExecute, source, splitIndex, segments, delimiters }) => {
  if (!source) return null;

  const getNewFilenames = () => {
    const baseFilename = source.filename.replace(/ - Part \d+$/, '');
    const partRegex = / - Part (\d+)$/;
    const match = source.filename.match(partRegex);
    const startPart = match ? parseInt(match[1], 10) : 1;

    return {
      part1Filename: `${baseFilename} - Part ${startPart}`,
      part2Filename: `${baseFilename} - Part ${startPart + 1}`,
    };
  };

  const getSnippets = () => {
    let content1 = '';
    let content2 = '';
    let currentIndex = 0;

    segments.forEach((seg, i) => {
      if (i < splitIndex) {
        content1 += seg + (delimiters[i] || '');
      } else {
        content2 += seg + (delimiters[i] || '');
      }
    });

    const snippet1 = content1.substring(0, 150) + (content1.length > 150 ? '...' : '');
    const snippet2 = content2.substring(0, 150) + (content2.length > 150 ? '...' : '');

    return { snippet1, snippet2 };
  };

  const { part1Filename, part2Filename } = getNewFilenames();
  const { snippet1, snippet2 } = getSnippets();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Split Source</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>{part1Filename}</h5>
          <p className="text-muted"><em>...{snippet1}</em></p>
        </div>
        <hr />
        <div>
          <h5>{part2Filename}</h5>
          <p className="text-muted"><em>{snippet2}...</em></p>
        </div>
        <Alert variant="danger">
          This will split the current source into two. <strong>This action cannot be undone.</strong> Consider duplicating the source first.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={onExecute}>Execute</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SplitSourceModal;