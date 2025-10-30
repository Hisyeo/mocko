import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col, Form, InputGroup, Stack } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';
import SizeBlocker from './components/SizeBlocker';
import { useApp } from './AppContext';
import Resizer from './components/Resizer';

export interface Source {
  id: string;
  title: string;
  content: string;
  segmentationRule?: string;
}

type Mode = 'source' | 'translation' | 'memory' | 'settings';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const storedWidth = localStorage.getItem('sidebarWidth');
    return storedWidth ? parseInt(storedWidth, 10) : 240;
  });
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(window.innerWidth < 800);
  const [sourceFilter, setSourceFilter] = useState(() => localStorage.getItem('sourceFilter') || '');
  const { theme } = useApp();

  useEffect(() => {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `/mocko/bootstrap/${theme}/bootstrap.min.css`;
    }
    const htmlElement = document.documentElement
    htmlElement.setAttribute('data-theme', theme)
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

  // Use a ref to store the "current" width during a drag.
  // This avoids reading stale state in the onResizeEnd handler.
  const widthRef = useRef(sidebarWidth);

  // Keep the ref in sync with the state
  useEffect(() => {
    widthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  const handleResize = (delta: number) => {
    setSidebarWidth(prevWidth => {
      const newWidth = prevWidth + delta;
      if (newWidth > 100 && newWidth < 500) { // Min and max width
        // No local storage setting here! too costly
        return newWidth;
      }
      return prevWidth;
    });
  };

  // This new function saves to localStorage *once* at the end
  const handleResizeEnd = () => {
    // We read from the ref, which has the final, up-to-date width
    localStorage.setItem('sidebarWidth', String(widthRef.current));
  };

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSourceFilter(value);
    localStorage.setItem('sourceFilter', value);
  };

  const clearFilter = () => {
    setSourceFilter('');
    localStorage.removeItem('sourceFilter');
  };

  const filteredSources = sources.filter(source => 
    source.title.toLowerCase().includes(sourceFilter.toLowerCase())
  );

  if (isScreenTooSmall) {
    return <SizeBlocker />;
  }

  return (
    <div className={`d-flex ${sidebarOpen ? 'toggled' : ''}`} id="wrapper">
      <div className="bg-light border-right" id="sidebar-wrapper" style={{ width: sidebarOpen ? sidebarWidth : 0 }}>
        <div className="sidebar-heading">
          <Stack direction='horizontal'>
            <span>Your Sources</span>
            <Button variant='outline-info' className='ms-auto' onClick={() => setShowAddSourceModal(true)}>+</Button>
          </Stack>
        </div>
        <div className="p-2">
          <Stack direction='horizontal'>
            <Form.Control 
              type="text" 
              placeholder="Filter sources..." 
              value={sourceFilter} 
              onChange={handleFilterChange} 
            />
            {sourceFilter && <Button variant="danger"  className="mt-1" onClick={clearFilter} id='sidebar-clear-search-button'>X</Button>}
          </Stack>
          
        </div>
        <Nav className="flex-column" navbarScroll>
          {filteredSources.map(source => (
            <Nav.Link key={source.id} onClick={() => handleSelectSource(source)} className={selectedSource?.id === source.id ? 'bg-info text-bg-info' : ''}>{source.title}</Nav.Link>
          ))}
        </Nav>
      </div>
      <Resizer onResize={handleResize} onResizeEnd={handleResizeEnd} />
      <div id="page-content-wrapper">
        <div className="page-content">
          <Container fluid>
            <Tab.Container defaultActiveKey='source'>
              <Row className="align-items-center header-row">
                <Nav variant='pills' className='flex-row'>
                  <Nav.Item>
                    <Nav.Link title='Toggle source list' onClick={toggleSidebar}>{sidebarOpen ? '◀' : '▶'}</Nav.Link>
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