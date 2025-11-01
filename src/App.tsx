import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col, Form, InputGroup, Stack, Dropdown } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';
import SizeBlocker from './components/SizeBlocker';
import { useApp } from './AppContext';
import Resizer from './components/Resizer';
import ImportConflictModal from './components/ImportConflictModal';

export interface Source {
  id: string;
  title: string;
  filename: string;
  content: string;
  segmentationRule?: string;
  defaultGrammarRule?: string;
  modified?: number;
}

type Mode = 'source' | 'translation' | 'memory' | 'settings';
type SortOrder = 'Oldest First' | 'Newest First' | 'Most Recently Modified' | 'Least Recently Modified' | 'Longest Source' | 'Shortest Source' | 'Most Translated' | 'Least Translated' | 'Alphabetical';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const storedWidth = localStorage.getItem('sidebarWidth');
    return storedWidth ? parseInt(storedWidth, 10) : 300;
  });
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(window.innerWidth < 800);
  const [sourceFilter, setSourceFilter] = useState(() => localStorage.getItem('sourceFilter') || '');
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => (localStorage.getItem('sortOrder') as SortOrder) || 'Alphabetical');
  const [conflictData, setConflictData] = useState<any | null>(null);
  const { theme } = useApp();

  const segments = useMemo(() => {
    if (!selectedSource) return [];
    const rule = selectedSource.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    return selectedSource.content.split(new RegExp(wrappedRule)).filter((_, i) => i % 2 === 0);
  }, [selectedSource]);

  const delimiters = useMemo(() => {
    if (!selectedSource) return [];
    const rule = selectedSource.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    return selectedSource.content.split(new RegExp(wrappedRule)).filter((_, i) => i % 2 !== 0);
  }, [selectedSource]);

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

  useEffect(() => {
    const baseTitle = "yôn Mocko";
    if (selectedSource && selectedSource.filename) {
      document.title = `${selectedSource.filename} - ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [selectedSource]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const widthRef = useRef(sidebarWidth);

  useEffect(() => {
    widthRef.current = sidebarWidth;
  }, [sidebarWidth]);

  const handleResize = (delta: number) => {
    setSidebarWidth(prevWidth => {
      const newWidth = prevWidth + delta;
      if (newWidth > 100 && newWidth < 500) { // Min and max width
        return newWidth;
      }
      return prevWidth;
    });
  };

  const handleResizeEnd = () => {
    localStorage.setItem('sidebarWidth', String(widthRef.current));
  };

  const handleSelectSource = (source: Source) => {
    setSelectedSource(source);
  }

  const handleAddSource = (title: string, content: string) => {
    const newSource: Source = {
      id: new Date().toISOString(),
      title,
      filename: title,
      content,
      modified: Date.now(),
    };
    const updatedSources = [...sources, newSource];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
  };

  const handleSourceUpdate = (updatedSource: Source) => {
    const updatedSources = sources.map(s => s.id === updatedSource.id ? { ...updatedSource, modified: Date.now() } : s);
    setSources(updatedSources);
    setSelectedSource({ ...updatedSource, modified: Date.now() });
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

  const handleDuplicateSource = (source: Source) => {
    const newSource: Source = {
      ...source,
      id: new Date().toISOString(),
      filename: `${source.filename} (Copy)`,
      modified: Date.now(),
    };
    const updatedSources = [...sources, newSource];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
  };

  const handleSplitSource = (originalSource: Source, splitIndex: number) => {
    const rule = originalSource.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    const allSegments = originalSource.content.split(new RegExp(wrappedRule));
    
    let content1 = '';
    let content2 = '';

    let segCounter = 0;
    for(let i = 0; i < allSegments.length; i++) {
      const isDelimiter = i % 2 !== 0;
      if (isDelimiter) {
        if (segCounter < splitIndex) {
          content1 += allSegments[i];
        } else {
          content2 += allSegments[i];
        }
      } else {
        if (segCounter < splitIndex) {
          content1 += allSegments[i];
        } else {
          content2 += allSegments[i];
        }
        segCounter++;
      }
    }

    const originalFilename = originalSource.filename ?? originalSource.title
    const baseFilename = originalFilename.replace(/ - Part \d+$/, '');
    const partRegex = / - Part (\d+)$/;
    const match = originalFilename.match(partRegex);
    const startPart = match ? parseInt(match[1], 10) : 1;

    const source1: Source = {
      ...originalSource,
      id: new Date().toISOString() + '-part1',
      title: originalSource.title,
      filename: `${baseFilename} - Part ${startPart}`,
      content: content1,
      modified: Date.now(),
    };

    const source2: Source = {
      ...originalSource,
      id: new Date().toISOString() + '-part2',
      title: originalSource.title,
      filename: `${baseFilename} - Part ${startPart + 1}`,
      content: content2,
      modified: Date.now(),
    };

    const updatedSources = [...sources.filter(s => s.id !== originalSource.id), source1, source2];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));

    localStorage.removeItem(`translations_${originalSource.id}`);
    localStorage.removeItem(`memories_${originalSource.id}`);
    localStorage.removeItem(`delimiters_${originalSource.id}`);

    setSelectedSource(source2);
  };

  const handleImportMocko = (data: any) => {
    const existingSource = sources.find(s => s.filename === data.source.filename);
    if (existingSource) {
      setConflictData({ ...data, existingSourceId: existingSource.id });
    } else {
      finalizeImport(data);
    }
  };

  const finalizeImport = (data: any, newFilename?: string) => {
    const { source, translations, memories, delimiters } = data;
    const newId = new Date().toISOString();
    const newSource = { ...source, id: newId, modified: Date.now(), filename: newFilename || source.filename };

    const updatedSources = newFilename ? sources.map(s => s.id === data.existingSourceId ? newSource : s) : [...sources, newSource];
    setSources(updatedSources);
    localStorage.setItem('sources', JSON.stringify(updatedSources));
    localStorage.setItem(`translations_${newId}`, JSON.stringify(translations));
    localStorage.setItem(`memories_${newId}`, JSON.stringify(memories));
    localStorage.setItem(`delimiters_${newId}`, JSON.stringify(delimiters));
    setConflictData(null);
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

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    localStorage.setItem('sortOrder', order);
  };

  const sortedAndFilteredSources = [...sources]
    .filter(source => (source.filename ?? source.title).toLowerCase().includes(sourceFilter.toLowerCase()))
    .sort((a, b) => {
      switch (sortOrder) {
        case 'Oldest First': return new Date(a.id.replace(/-part\d+/,'')).getTime() - new Date(b.id.replace(/-part\d+/,'')).getTime();
        case 'Newest First': return new Date(b.id.replace(/-part\d+/,'')).getTime() - new Date(a.id.replace(/-part\d+/,'')).getTime();
        case 'Most Recently Modified': return (b.modified || 0) - (a.modified || 0);
        case 'Least Recently Modified': return (a.modified || 0) - (b.modified || 0);
        case 'Longest Source': return b.content.length - a.content.length;
        case 'Shortest Source': return a.content.length - b.content.length;
        case 'Most Translated': {
          const aTranslations = JSON.parse(localStorage.getItem(`translations_${a.id}`) || '{}');
          const bTranslations = JSON.parse(localStorage.getItem(`translations_${b.id}`) || '{}');
          return Object.keys(bTranslations).length - Object.keys(aTranslations).length;
        }
        case 'Least Translated': {
          const aTranslations = JSON.parse(localStorage.getItem(`translations_${a.id}`) || '{}');
          const bTranslations = JSON.parse(localStorage.getItem(`translations_${b.id}`) || '{}');
          return Object.keys(aTranslations).length - Object.keys(bTranslations).length;
        }
        case 'Alphabetical':
        default: {
          const cleanA = (a.filename ?? a.title).replace(/^(the|a|an)\s+/i, '');
          const cleanB = (b.filename ?? b.title).replace(/^(the|a|an)\s+/i, '');
          return cleanA.localeCompare(cleanB);
        }
      }
    });

  if (isScreenTooSmall) {
    return <SizeBlocker />;
  }

  return (
    <div className={`d-flex ${sidebarOpen ? 'toggled' : ''}`} id="wrapper">
      <div className="bg-light border-right" id="sidebar-wrapper" style={{ width: sidebarOpen ? sidebarWidth : 0 }}>
        <div className="sidebar-heading">
          <Stack direction='horizontal' gap={1}>
            <span>Your Sources</span>
            <Dropdown onSelect={(e) => handleSortChange(e as SortOrder)} className='ms-auto' >
              <Dropdown.Toggle variant="outline-secondary"  id="dropdown-basic">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Alphabetical">Alphabetical</Dropdown.Item>
                <Dropdown.Item eventKey="Oldest First">Oldest First</Dropdown.Item>
                <Dropdown.Item eventKey="Newest First">Newest First</Dropdown.Item>
                <Dropdown.Item eventKey="Most Recently Modified">Most Recently Modified</Dropdown.Item>
                <Dropdown.Item eventKey="Least Recently Modified">Least Recently Modified</Dropdown.Item>
                <Dropdown.Item eventKey="Longest Source">Longest Source</Dropdown.Item>
                <Dropdown.Item eventKey="Shortest Source">Shortest Source</Dropdown.Item>
                <Dropdown.Item eventKey="Most Translated">Most Translated</Dropdown.Item>
                <Dropdown.Item eventKey="Least Translated">Least Translated</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant='outline-info' onClick={() => setShowAddSourceModal(true)}>+</Button>
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
          {sortedAndFilteredSources.map(source => (
            <Nav.Link key={source.id} onClick={() => handleSelectSource(source)} className={selectedSource?.id === source.id ? 'bg-info text-bg-info' : ''}>{source.filename ?? source.title}</Nav.Link>
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
                    <SourceEditor source={selectedSource} onSourceUpdate={handleSourceUpdate} onDelete={handleDeleteSource} onDuplicate={handleDuplicateSource} segments={segments} delimiters={delimiters} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="translation">
                    <TranslationEditor source={selectedSource} segments={segments} delimiters={delimiters} onSplit={handleSplitSource} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="memory">
                    <MemoryEditor source={selectedSource} allSources={sources} segments={segments} />
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
      {conflictData && (
        <ImportConflictModal 
          show={!!conflictData}
          onHide={() => setConflictData(null)}
          onOverwrite={() => finalizeImport(conflictData, conflictData.source.filename)}
          onRename={(newFilename) => finalizeImport(conflictData, newFilename)}
          existingFilename={conflictData.source.filename}
          sources={sources}
        />
      )}
    </div>
  );
}

export default App;