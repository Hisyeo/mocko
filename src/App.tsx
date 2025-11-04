import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, Button, Tabs, Tab, Row, Col, Form, InputGroup, Stack, Dropdown } from 'react-bootstrap';
import './App.css';
import SourceEditor from './components/SourceEditor';
import TranslationEditor from './components/TranslationEditor';
import MemoryEditor from './components/MemoryEditor';
import Settings from './components/Settings';
import AddSourceModal from './components/AddSourceModal';
import SizeBlocker from './components/SizeBlocker';
import { useApp } from './AppContext';
import { SourceProvider } from './SourceContext';
import Resizer from './components/Resizer';
import ImportConflictModal from './components/ImportConflictModal';
import ErrorModal from './components/ErrorModal';
import pako from 'pako';

export interface Source {
  id: string;
  title: string;
  filename: string;
  content: string;
  segmentationRule?: string;
  defaultGrammarRule?: string;
  modified?: number;
  compression?: boolean;
  compressionLevel?: number;
}

// Helper to check if a string is base64 encoded
function isBase64(str: string) {
  if (str ==='' || str.trim() ==='') { return false; }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

// Helper to decode from base64 Uint8Array
const atobUint8Array = (b64: string) => {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Uint8Array(byteNumbers);
}

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
  const [translationsVersion, setTranslationsVersion] = useState(0);
  const { 
    theme, error, setError, handleSetItem, updateStorageVersion, 
    defaultCompression, defaultCompressionLevel 
  } = useApp();

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
    handleSetItem('sidebarWidth', String(widthRef.current));
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
      compression: defaultCompression,
      compressionLevel: defaultCompressionLevel
    };
    const updatedSources = [...sources, newSource];
    if (handleSetItem('sources', JSON.stringify(updatedSources))) {
      setSources(updatedSources);
    }
  };

  const handleSourceUpdate = (updatedSource: Source) => {
    const updatedSources = sources.map(s => s.id === updatedSource.id ? { ...updatedSource, modified: Date.now() } : s);
    if (handleSetItem('sources', JSON.stringify(updatedSources))) {
      setSources(updatedSources);
      setSelectedSource({ ...updatedSource, modified: Date.now() });
    }
  };

  const handleDeleteSource = (sourceId: string) => {
    const updatedSources = sources.filter(s => s.id !== sourceId);
    if (handleSetItem('sources', JSON.stringify(updatedSources))) {
      setSources(updatedSources);
      localStorage.removeItem(`translations_${sourceId}`);
      localStorage.removeItem(`memories_${sourceId}`);
      localStorage.removeItem(`delimiters_${sourceId}`);
      updateStorageVersion();
      if (selectedSource?.id === sourceId) {
        setSelectedSource(null);
      }
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
    if (handleSetItem('sources', JSON.stringify(updatedSources))) {
      setSources(updatedSources);
    }
  };

  const handleSplitSource = (originalSource: Source, splitIndex: number) => {
    const rule = originalSource.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    const allSegmentsAndDelimiters = originalSource.content.split(new RegExp(wrappedRule));
    
    const slicePoint = splitIndex * 2;
    const content1 = allSegmentsAndDelimiters.slice(0, slicePoint).join('');
    const content2 = allSegmentsAndDelimiters.slice(slicePoint).join('');

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
    if (handleSetItem('sources', JSON.stringify(updatedSources))) {
      setSources(updatedSources);
      localStorage.removeItem(`translations_${originalSource.id}`);
      localStorage.removeItem(`memories_${originalSource.id}`);
      localStorage.removeItem(`delimiters_${originalSource.id}`);
      updateStorageVersion();
      setSelectedSource(source2);
    }
  };

  const handleImportMocko = (data: any) => {
    const existingSource = sources.find(s => s.filename === data.source.filename);
    if (existingSource) {
      setConflictData({ ...data, existingSourceId: existingSource.id });
    } else {
      finalizeImport(data, data.source.filename);
    }
  };

  const finalizeImport = (data: any, newFilename?: string) => {
    const { source, translations, memories, delimiters } = data;
    const newId = new Date().toISOString();
    const newSource = { ...source, id: newId, modified: Date.now(), filename: newFilename || source.filename };

    const updatedSources = newFilename ? [...sources, newSource] : sources.map(s => s.id === data.existingSourceId ? newSource : s);
    
    let success = true;
    success = success && handleSetItem('sources', JSON.stringify(updatedSources));

    const itemsToStore: { [key: string]: string } = {
      [`translations_${newId}`]: translations,
      [`memories_${newId}`]: memories,
      [`delimiters_${newId}`]: delimiters,
    };

    for (const key in itemsToStore) {
      if (!success) break;
      let value = itemsToStore[key];
      // Unlike the hook, we must manually compress here because we are creating a new source
      // and the hook is bound to the currently selected source in context.
      if (newSource.compression) {
        try {
          const compressed = pako.deflate(value, { level: newSource.compressionLevel ?? 1 });
          value = btoa(String.fromCharCode(...compressed));
        } catch (err: any) {
          setError({ title: 'Compression Error', message: `Failed to import and compress data for key ${key}: ${err.message}` });
          success = false;
          continue;
        }
      }
      success = success && handleSetItem(key, value);
    }

    if (success) {
      setSources(updatedSources);
      setConflictData(null);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(handleSetItem('sourceFilter', value)) {
      setSourceFilter(value);
    }
  };

  const clearFilter = () => {
    setSourceFilter('');
    localStorage.removeItem('sourceFilter');
    updateStorageVersion();
  };

  const handleSortChange = (order: SortOrder) => {
    if(handleSetItem('sortOrder', order)) {
      setSortOrder(order);
    }
  };

  const handleTranslationsUpdate = () => {
    setTranslationsVersion(v => v + 1);
    updateStorageVersion();
  };

  const sortedAndFilteredSources = [...sources]
    .filter(source => (source.filename ?? source.title).toLowerCase().includes(sourceFilter.toLowerCase()))
    .sort((a, b) => {
      switch (sortOrder) {
        case 'Oldest First': return new Date(a.id.replace(/-part\d+$/,'')).getTime() - new Date(b.id.replace(/-part\d+/,'')).getTime();
        case 'Newest First': return new Date(b.id.replace(/-part\d+$/,'')).getTime() - new Date(a.id.replace(/-part\d+/,'')).getTime();
        case 'Most Recently Modified': return (b.modified || 0) - (a.modified || 0);
        case 'Least Recently Modified': return (a.modified || 0) - (b.modified || 0);
        case 'Longest Source': return b.content.length - a.content.length;
        case 'Shortest Source': return a.content.length - b.content.length;
        case 'Most Translated':
        case 'Least Translated': {
          const getTranslationCount = (source: Source) => {
            const raw = localStorage.getItem(`translations_${source.id}`);
            if (!raw) return 0;
            try {
              let data = raw;
              if (source.compression) {
                data = isBase64(raw) ? pako.inflate(atobUint8Array(raw), { to: 'string' }) : raw;
              }
              return Object.keys(JSON.parse(data) || {}).length;
            } catch (e) {
              return 0; // Ignore errors for sorting
            }
          };
          const aCount = getTranslationCount(a);
          const bCount = getTranslationCount(b);
          return sortOrder === 'Most Translated' ? bCount - aCount : aCount - bCount;
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
                  <SourceProvider source={selectedSource}>
                    <Tab.Pane eventKey="source">
                      <SourceEditor onSourceUpdate={handleSourceUpdate} onDelete={handleDeleteSource} onDuplicate={handleDuplicateSource} allSources={sources} translationsVersion={translationsVersion} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="translation">
                      <TranslationEditor onSplit={handleSplitSource} onTranslationsUpdate={handleTranslationsUpdate} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="memory">
                      <MemoryEditor allSources={sources} />
                    </Tab.Pane>
                  </SourceProvider>
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
          onOverwrite={() => finalizeImport(conflictData)}
          onRename={(newFilename) => finalizeImport(conflictData, newFilename)}
          existingFilename={conflictData.source.filename}
          sources={sources}
        />
      )}
      {error && (
        <ErrorModal 
          show={!!error}
          onHide={() => setError(null)}
          title={error.title}
          message={error.message}
        />
      )}
    </div>
  );
}

export default App;
