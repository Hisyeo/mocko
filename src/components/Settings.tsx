import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Stack, ProgressBar } from 'react-bootstrap';
import { useApp } from '../AppContext';

const Settings: React.FC = () => {
  const { 
    theme, setTheme, 
    grammarCheck, setGrammarCheck, 
    spellCheck, setSpellCheck, 
    autocomplete, setAutocomplete, 
    wiktionarySearch, setWiktionarySearch, 
    defaultGrammarRule, setDefaultGrammarRule,
    storageVersion, updateStorageVersion
  } = useApp();
  const [storageUsage, setStorageUsage] = useState({ used: 0, percentage: 0 });

  const calculateLocalStorageSize = () => {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) total += new Blob([key, value]).size;
      }
    }
    return total;
  };

  useEffect(() => {
    const used = calculateLocalStorageSize();
    const total = 5 * 1024 * 1024; // 5MB quota
    const percentage = (used / total) * 100;
    setStorageUsage({ used, percentage });
  }, [storageVersion]);

  const handleBackup = () => {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yon-mocko-backup.json';
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
          // Clear existing data before restoring
          localStorage.clear();
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

  const themes = ['brite', 'cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'litera', 'lumen', 'lux', 'materia', 'minty', 'morph', 'pulse', 'quartz', 'sandstone', 'simplex', 'sketchy', 'slate', 'solar', 'spacelab',
'superhero', 'united', 'vapor', 'yeti', 'zephyr'];

  return (
    <div>
      <h1>Settings</h1>

      <Card className="mt-4">
        <Card.Header>Theme</Card.Header>
        <Card.Body>
          <Form.Group controlId="themeSelect">
            <Form.Label>Select a theme:</Form.Label>
            <Form.Control as="select" value={theme} onChange={(e) => setTheme(e.target.value)}>
              {themes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>Session Settings</Card.Header>
        <Card.Body>
          <Form.Check 
            type="switch"
            id="spell-check-switch"
            label="Spell Checking"
            checked={spellCheck}
            onChange={(e) => setSpellCheck(e.target.checked)}
          />
          <Form.Check 
            type="switch"
            id="autocomplete-switch"
            label="Autocomplete"
            checked={autocomplete}
            onChange={(e) => setAutocomplete(e.target.checked)}
          />
          <Form.Group controlId="wiktionarySearchSelect" className="mt-3">
            <Form.Label>Wiktionary Search</Form.Label>
            <Form.Control as="select" value={wiktionarySearch} onChange={(e) => setWiktionarySearch(e.target.value)}>
              <option value="modal">Modal</option>
              <option value="new-tab">New Tab</option>
            </Form.Control>
          </Form.Group>
          <hr />
          <Form.Check 
            type="switch"
            id="grammar-check-switch"
            label="Grammar Checking"
            checked={grammarCheck}
            onChange={(e) => setGrammarCheck(e.target.checked)}
          />
          {grammarCheck && (
            <Form.Group controlId="defaultGrammarRuleSelect" className="mt-3">
              <Form.Label>Default Grammar Rule</Form.Label>
              <Form.Control as="select" value={defaultGrammarRule} onChange={(e) => setDefaultGrammarRule(e.target.value)}>
                <option value="Sentences">Sentences</option>
                <option value="Constituents">Constituents</option>
                <option value="Phrases">Phrases</option>
              </Form.Control>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
      
      <Card className="mt-4">
        <Card.Header>Local Storage</Card.Header>
        <Card.Body>
          <p>Your browser has a local storage quota (usually 5MB). You have used {(storageUsage.used / 1024).toFixed(2)} KB.</p>
          <ProgressBar 
            now={storageUsage.percentage} 
            label={`${storageUsage.percentage.toFixed(2)}%`} 
            variant={storageUsage.percentage > 80 ? 'danger' : storageUsage.percentage > 60 ? 'warning' : 'success'}
          />
          <hr />
          <p>Backup your current session to a file, or restore from a previous backup.</p>
          <Stack direction='horizontal' gap={1} className="mt-3">
            <Button variant="primary" onClick={handleBackup}>Backup Data</Button>
            <label htmlFor="restore-input" className="btn btn-secondary ml-2">Restore Data</label>
            <input id="restore-input" type="file" accept=".json" onChange={handleRestore} style={{ display: 'none' }} />
          </Stack>
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