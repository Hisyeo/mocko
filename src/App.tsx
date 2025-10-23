import React, { useState, useEffect } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';

export interface Source {
  id: string;
  title: string;
  content: string;
  segmentationRule?: string;
}

type Mode = 'source' | 'translation' | 'memory' | 'settings';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState<Mode>('source');
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);

  useEffect(() => {
    const storedSources = localStorage.getItem('sources');
    if (storedSources) {
      setSources(JSON.parse(storedSources));
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSelectSource = (source: Source) => {
    setSelectedSource(source);
    // setMode('source');
  }

  const handleAddSource = (title: string, content: string) => {
    const newSource: Source = {
      id: new Date().toISOString(),
      title,
      content,
    };
    const updatedSources = [...sources, newSource];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
  };

  const handleSourceUpdate = (updatedSource: Source) => {
    const updatedSources = sources.map(s => s.id === updatedSource.id ? updatedSource : s);
    setSources(updatedSources);
    setSelectedSource(updatedSource);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
  };

  return (
    <div className={`d-flex ${sidebarOpen ? '' : 'toggled'}`} id="wrapper">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">yôn Mocko</div>
        <Nav className="flex-column">
          {sources.map(source => (
            <Nav.Link key={source.id} onClick={() => handleSelectSource(source)}>{source.title}</Nav.Link>
          ))}
          <Nav.Link onClick={() => setShowAddSourceModal(true)}>+ Add Source</Nav.Link>
        </Nav>
      </div>

      <div id="page-content-wrapper">
        <Container fluid>
          <Row className="align-items-center header-row">
            <Col xs="auto">
              <Button variant="primary" onClick={toggleSidebar}>☰</Button>
            </Col>
            <Col>
              <Tabs activeKey={mode} onSelect={(k) => setMode(k as Mode)} id="mode-tabs">
                <Tab eventKey="source" title="Source Editing" />
                <Tab eventKey="translation" title="Translation Editing" />
                <Tab eventKey="memory" title="Memory Editing" />
                <Tab eventKey="settings" title="Settings" />
              </Tabs>
            </Col>
          </Row>
          <div className="mt-3">
            {mode === 'source' && <SourceEditor source={selectedSource} onSourceUpdate={handleSourceUpdate} />}
            {mode === 'translation' && <TranslationEditor source={selectedSource} />}
            {mode === 'memory' && <MemoryEditor source={selectedSource} allSources={sources} />}
            {mode === 'settings' && <Settings />}
          </div>
        </Container>

      </div>
      <AddSourceModal 
        show={showAddSourceModal} 
        onHide={() => setShowAddSourceModal(false)} 
        onAddSource={handleAddSource} 
      />
    </div>
  );
}

export default App;