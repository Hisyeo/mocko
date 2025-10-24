import React, { useState, useEffect } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';
import SizeBlocker from './components/SizeBlocker';
import { useTheme } from './ThemeContext';

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
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(window.innerWidth < 800);
  const { theme } = useTheme();

  useEffect(() => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/mocko/bootstrap/${theme}/bootstrap.min.css`;
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsScreenTooSmall(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleDeleteSource = (sourceId: string) => {
    const updatedSources = sources.filter(s => s.id !== sourceId);
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
    localStorage.removeItem(`translations_${sourceId}`);
    localStorage.removeItem(`memories_${sourceId}`);
    localStorage.removeItem(`delimiters_${sourceId}`);
    if (selectedSource?.id === sourceId) {
      setSelectedSource(null);
    }
  };

  const handleImportMocko = (data: any) => {
    const { source, translations, memories, delimiters } = data;
    const newId = new Date().toISOString();
    const newSource = { ...source, id: newId };

    const updatedSources = [...sources, newSource];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
    localStorage.setItem(`translations_${newId}`, JSON.stringify(translations));
    localStorage.setItem(`memories_${newId}`, JSON.stringify(memories));
    localStorage.setItem(`delimiters_${newId}`, JSON.stringify(delimiters));
  };

  if (isScreenTooSmall) {
    return <SizeBlocker />;
  }

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
                    <SourceEditor source={selectedSource} onSourceUpdate={handleSourceUpdate} onDelete={handleDeleteSource} />
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
        onImport={handleImportMocko}
      />
    </div>
  );
}

export default App;