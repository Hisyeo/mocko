import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface MemoryTooltipProps {
  x: number;
  y: number;
  onAddMemory: () => void;
  onSaveMemory: (target: string) => void;
  isAddingMemory: boolean;
}

const MemoryTooltip = React.forwardRef<HTMLDivElement, MemoryTooltipProps>(({ x, y, onAddMemory, onSaveMemory, isAddingMemory }, ref) => {
  const [target, setTarget] = useState('');

  if (isAddingMemory) {
    return (
      <div ref={ref} style={{ position: 'absolute', top: y, left: x, zIndex: 1000, backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>
        <Form.Control 
          type="text" 
          placeholder="Enter Target Translation" 
          value={target} 
          onChange={(e) => setTarget(e.target.value)} 
        />
        <Button size="sm" onClick={() => onSaveMemory(target)} className="mt-1">Save</Button>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'absolute', top: y, left: x, zIndex: 1000, backgroundColor: 'white', border: '1px solid black', padding: '5px' }}>
      <Button size="sm" onClick={onAddMemory}>Add Memory</Button>
    </div>
  );
});

export default MemoryTooltip;