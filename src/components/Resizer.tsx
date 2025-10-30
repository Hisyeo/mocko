import React from 'react';

interface ResizerProps {
  onResize: (delta: number) => void;
  onResizeEnd?: () => void; // <-- Add this new prop
}

const Resizer: React.FC<ResizerProps> = ({ onResize, onResizeEnd }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.style.userSelect = 'none'; // <-- Disable text selection globally
    document.body.style.cursor = 'col-resize'; // <-- Ensure cursor stays

    const handleMouseMove = (moveEvent: MouseEvent) => {
      onResize(moveEvent.movementX);
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = ''; // <-- Re-enable text selection
      document.body.style.cursor = ''; // <-- Reset cursor

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      onResizeEnd?.(); // <-- Call the new prop
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      onMouseDown={handleMouseDown}
      style={{
        width: '5px',
        cursor: 'col-resize',
        backgroundColor: '#e0e0e0',
      }}
    />
  );
};

export default Resizer;