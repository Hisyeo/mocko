import React from 'react';
import { Alert } from 'react-bootstrap';
import { useApp } from '../AppContext';

interface ModeHelpAlertProps {
  mode: 'translation' | 'source' | 'memory';
}

const helpTexts: Record<ModeHelpAlertProps['mode'], React.ReactNode> = {
  translation: (
    <>
      Translation editor help content goes here.
    </>
  ),
  source: (
    <>
      Source editor help content goes here.
    </>
  ),
  memory: (
    <>
      Partially matching memories will be marked with an ⚠️ and will not be clickable in the translation editor nor available for autocomplete. When adding memories or alternatives, please utilize text that goes all the way to a word boundary.
    </>
  ),
};

const ModeHelpAlert: React.FC<ModeHelpAlertProps> = ({ mode }) => {
  const { showModeHelp } = useApp();

  if (!showModeHelp) {
    return null;
  }

  return (
    <Alert variant="light" className="mode-help-alert">
      {helpTexts[mode]}
    </Alert>
  );
};

export default ModeHelpAlert;
