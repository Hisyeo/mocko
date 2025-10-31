import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useApp } from '../AppContext';

interface SelectionTooltipProps {
  x: number;
  y: number;
  text: string;
  onAddMemory: () => void;
  onSaveMemory: (target: string) => void;
  onWiktionarySearch: (term: string) => void;
  isAddingMemory: boolean;
}

const SelectionTooltip = React.forwardRef<HTMLDivElement, SelectionTooltipProps>(({ x, y, text, onAddMemory, onSaveMemory, onWiktionarySearch, isAddingMemory }, ref) => {
  const [target, setTarget] = useState('');
  const { wiktionarySearch } = useApp();

  const handleWiktionarySearch = () => {
    if (wiktionarySearch === 'modal') {
      onWiktionarySearch(text);
    } else {
      window.open(`https://en.wiktionary.org/wiki/${text}`, '_blank');
    }
  };

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
      <Stack direction='horizontal' gap={1}>
        <Button size="sm" onClick={onAddMemory}>Add Memory</Button>
        <Button size="sm" variant='info' onClick={handleWiktionarySearch}>Search Wiktionary</Button>
      </Stack>
    </div>
  );
});

export default SelectionTooltip;