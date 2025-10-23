import React from 'react';
import { Button } from 'react-bootstrap';

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
          alert('Data restored successfully!');
        } catch (error) {
          alert('Error restoring data. Please select a valid backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <p>This is where you will configure the application settings.</p>
      
      <div className="mt-4">
        <h2>Backup and Restore</h2>
        <Button variant="primary" onClick={handleBackup}>Backup Data</Button>
        <div className="mt-2">
          <label htmlFor="restore-input" className="btn btn-secondary">Restore Data</label>
          <input id="restore-input" type="file" accept=".json" onChange={handleRestore} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
}

export default Settings;