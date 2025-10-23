import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Settings: React.FC = () => {

  const handleBackup = () => {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cat-app-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const data = JSON.parse(content);
          for (const key in data) {
            localStorage.setItem(key, data[key]);
          }
          alert('Data restored successfully! Reloading page.');
          window.location.reload();
        } catch (error) {
          alert('Error restoring data. Please select a valid backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your session? All data will be lost.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      
      <Card className="mt-4">
        <Card.Header>Session</Card.Header>
        <Card.Body>
          <p>Backup your current session to a file, or restore from a previous backup.</p>
          <Button variant="primary" onClick={handleBackup}>Backup Data</Button>
          <label htmlFor="restore-input" className="btn btn-secondary ml-2">Restore Data</label>
          <input id="restore-input" type="file" accept=".json" onChange={handleRestore} style={{ display: 'none' }} />
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>Danger Zone</Card.Header>
        <Card.Body>
          <p>Reset the application to a blank slate. This will clear all sources, translations, and memories.</p>
          <Button variant="danger" onClick={handleReset}>Reset Session</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Settings;