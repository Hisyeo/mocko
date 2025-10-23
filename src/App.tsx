import React, { useState, useEffect } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';

import './vendor/bootstrap/brite/bootstrap.css'

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
        <div className="sidebar-heading">Your Sources</div>
        <Nav className="flex-column" navbarScroll>
          {sources.map(source => (
            <Nav.Link key={source.id} onClick={() => handleSelectSource(source)} className={selectedSource?.id === source.id ? 'bg-info text-bg-info' : ''}>{source.title}</Nav.Link>
          ))}
          <Nav.Link onClick={() => setShowAddSourceModal(true)}>+ Add Source</Nav.Link>
        </Nav>
      </div>

      <div id="page-content-wrapper">
        <div className="page-content">
          <Container fluid>
            <Tab.Container defaultActiveKey='source'>
              <Row className="align-items-center header-row">
                <Nav variant='pills' className='flex-row'>
                  <Nav.Item>

                  <Nav.Link onClick={toggleSidebar}>☰</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='source'>Source</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='translation'>Translation</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='memory'>Memories</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='settings'>Settings</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>
              <Row>
                <Tab.Content>
                  <Tab.Pane eventKey="source">
                    <SourceEditor source={selectedSource} onSourceUpdate={handleSourceUpdate} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="translation">
                    <TranslationEditor source={selectedSource} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="memory">
                    <MemoryEditor source={selectedSource} allSources={sources} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings">
                    <Settings />
                  </Tab.Pane>
                </Tab.Content>
              </Row>
            </Tab.Container>
          </Container>
        </div>
        <footer className='mt-auto'>
            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
              © 2025 Copyright: <a className='text-reset fw-bold' href='https://hisyeo.github.io/'>
                Hîsyêô Institute
              </a>
            </div>
        </footer>
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