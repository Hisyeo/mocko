import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

interface ScrollToButtonsProps {
  showGoToTop: boolean;
  onGoToTop: () => void;
  showGoToEditing: boolean;
  onGoToEditing: () => void;
}

const ScrollToButtons: React.FC<ScrollToButtonsProps> = ({
  showGoToTop,
  onGoToTop,
  showGoToEditing,
  onGoToEditing,
}) => {
  if (!showGoToTop && !showGoToEditing) {
    return null;
  }

  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1050, // High z-index to float above other elements
  };

  return (
    <div style={style}>
      <ButtonGroup>
        {showGoToTop && (
          <Button variant="light" onClick={onGoToTop} title="Scroll to Top">
            ⬆️
          </Button>
        )}
        {showGoToEditing && (
          <Button variant="light" onClick={onGoToEditing} title="Scroll to Editing Segment">
            ✏️
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default ScrollToButtons;
