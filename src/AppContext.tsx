import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

export type CompressionLevel = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
export type SourceSelectionLocation = 'translation-first' | 'translation-incomplete' | 'source-top' | 'source-preview';

interface AppContextType {
  theme: string;
  setTheme: (theme: string) => void;
  grammarCheck: boolean;
  setGrammarCheck: (value: boolean) => void;
  spellCheck: boolean;
  setSpellCheck: (value: boolean) => void;
  autocomplete: boolean;
  setAutocomplete: (value: boolean) => void;
  wiktionarySearch: string;
  setWiktionarySearch: (value: string) => void;
  defaultGrammarRule: string;
  setDefaultGrammarRule: (value: string) => void;
  error: { title: string; message: React.ReactNode } | null;
  setError: (error: { title: string; message: React.ReactNode } | null) => void;
  handleSetItem: (key: string, value: string) => boolean;
  storageVersion: number;
  updateStorageVersion: () => void;
  defaultCompression: boolean;
  setDefaultCompression: (value: boolean) => void;
  defaultCompressionLevel: CompressionLevel;
  setDefaultCompressionLevel: (value: CompressionLevel) => void;
  sourceSelectionLocation: SourceSelectionLocation;
  handleSetSourceSelectionLocation: (value: SourceSelectionLocation) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, rawSetTheme] = useState(() => localStorage.getItem('yon-mocko-theme') || 'brite');
  const [grammarCheck, rawSetGrammarCheck] = useState(() => localStorage.getItem('grammarCheck') !== 'true');
  const [spellCheck, rawSetSpellCheck] = useState(() => localStorage.getItem('spellCheck') !== 'true');
  const [autocomplete, rawSetAutocomplete] = useState(() => localStorage.getItem('autocomplete') !== 'true');
  const [wiktionarySearch, rawSetWiktionarySearch] = useState(() => localStorage.getItem('wiktionarySearch') || 'modal');
  const [defaultGrammarRule, rawSetDefaultGrammarRule] = useState(() => localStorage.getItem('defaultGrammarRule') || 'Constituents');
  const [error, setError] = useState<{ title: string; message: React.ReactNode } | null>(null);
  const [storageVersion, setStorageVersion] = useState(0);
  const [defaultCompression, rawSetDefaultCompression] = useState(() => localStorage.getItem('defaultCompression') === 'true');
  const [defaultCompressionLevel, rawSetDefaultCompressionLevel] = useState<CompressionLevel>(() => parseInt(localStorage.getItem('defaultCompressionLevel') || '1', 10) as CompressionLevel);
  const [sourceSelectionLocation, setSourceSelectionLocation] = useState<SourceSelectionLocation>(() => (localStorage.getItem('sourceSelectionLocation') as SourceSelectionLocation) || 'source-top');


  const updateStorageVersion = useCallback(() => setStorageVersion(v => v + 1), []);

  const handleSetItem = useCallback((key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      updateStorageVersion();
      return true;
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        setError({ title: 'Storage Quota Exceeded', message: 'Your browser\'s local storage is full. Please clear some space or export and delete some sources to continue.' });
        return false;
      } else {
        setError({ title: 'Storage Error', message: `An unexpected error occurred while saving data: ${e.message}` });
        throw e;
      }
    }
  }, [updateStorageVersion]);

  const setTheme = useCallback((newTheme: string) => {
    if (handleSetItem('yon-mocko-theme', newTheme)) {
      rawSetTheme(newTheme);
    }
  }, [handleSetItem]);

  const setGrammarCheck = useCallback((value: boolean) => {
    if (handleSetItem('grammarCheck', String(value))) {
      rawSetGrammarCheck(value);
    }
  }, [handleSetItem]);

  const setSpellCheck = useCallback((value: boolean) => {
    if (handleSetItem('spellCheck', String(value))) {
      rawSetSpellCheck(value);
    }
  }, [handleSetItem]);

  const setAutocomplete = useCallback((value: boolean) => {
    if (handleSetItem('autocomplete', String(value))) {
      rawSetAutocomplete(value);
    }
  }, [handleSetItem]);

  const setWiktionarySearch = useCallback((value: string) => {
    if (handleSetItem('wiktionarySearch', value)) {
      rawSetWiktionarySearch(value);
    }
  }, [handleSetItem]);

  const setDefaultGrammarRule = useCallback((value: string) => {
    if (handleSetItem('defaultGrammarRule', value)) {
      rawSetDefaultGrammarRule(value);
    }
  }, [handleSetItem]);

  const setDefaultCompression = useCallback((value: boolean) => {
    if (handleSetItem('defaultCompression', String(value))) {
      rawSetDefaultCompression(value);
    }
  }, [handleSetItem]);

  const setDefaultCompressionLevel = useCallback((value: CompressionLevel) => {
    if (handleSetItem('defaultCompressionLevel', String(value))) {
      rawSetDefaultCompressionLevel(value);
    }
  }, [handleSetItem]);

  const handleSetSourceSelectionLocation = (value: SourceSelectionLocation) => {
    if (handleSetItem('sourceSelectionLocation', value)) {
        setSourceSelectionLocation(value);
    }
  };

  useEffect(() => {
    updateStorageVersion(); // Initial calculation
  }, [updateStorageVersion]);

  return (
    <AppContext.Provider value={useMemo(() => ({
      theme, setTheme,
      grammarCheck, setGrammarCheck,
      spellCheck, setSpellCheck,
      autocomplete, setAutocomplete,
      wiktionarySearch, setWiktionarySearch,
      defaultGrammarRule, setDefaultGrammarRule,
      error, setError,
      handleSetItem,
      storageVersion,
      updateStorageVersion,
      defaultCompression,
      setDefaultCompression,
      defaultCompressionLevel,
      setDefaultCompressionLevel,
      sourceSelectionLocation,
      handleSetSourceSelectionLocation
    }), [ theme, setTheme, grammarCheck, setGrammarCheck, spellCheck, setSpellCheck, autocomplete, setAutocomplete, wiktionarySearch, setWiktionarySearch, defaultGrammarRule, setDefaultGrammarRule, error, handleSetItem, storageVersion, updateStorageVersion, defaultCompression, setDefaultCompression, defaultCompressionLevel, setDefaultCompressionLevel, sourceSelectionLocation, handleSetSourceSelectionLocation ])}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};