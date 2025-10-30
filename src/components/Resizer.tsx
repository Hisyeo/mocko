import React from 'react';

interface ResizerProps {
  onResize: (delta: number) => void;
}

const Resizer: React.FC<ResizerProps> = ({ onResize }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      onResize(moveEvent.movementX);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
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
