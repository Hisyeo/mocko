import React, { createContext, useState, useContext, useEffect } from 'react';

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
  defaultCompressionLevel: number;
  setDefaultCompressionLevel: (value: number) => void;
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
  const [defaultCompressionLevel, rawSetDefaultCompressionLevel] = useState(() => parseInt(localStorage.getItem('defaultCompressionLevel') || '1', 10));

  const updateStorageVersion = () => setStorageVersion(v => v + 1);

  const handleSetItem = (key: string, value: string): boolean => {
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
  };

  const setTheme = (newTheme: string) => {
    if (handleSetItem('yon-mocko-theme', newTheme)) {
      rawSetTheme(newTheme);
    }
  };

  const setGrammarCheck = (value: boolean) => {
    if (handleSetItem('grammarCheck', String(value))) {
      rawSetGrammarCheck(value);
    }
  };

  const setSpellCheck = (value: boolean) => {
    if (handleSetItem('spellCheck', String(value))) {
      rawSetSpellCheck(value);
    }
  };

  const setAutocomplete = (value: boolean) => {
    if (handleSetItem('autocomplete', String(value))) {
      rawSetAutocomplete(value);
    }
  };

  const setWiktionarySearch = (value: string) => {
    if (handleSetItem('wiktionarySearch', value)) {
      rawSetWiktionarySearch(value);
    }
  };

  const setDefaultGrammarRule = (value: string) => {
    if (handleSetItem('defaultGrammarRule', value)) {
      rawSetDefaultGrammarRule(value);
    }
  };

  const setDefaultCompression = (value: boolean) => {
    if (handleSetItem('defaultCompression', String(value))) {
      rawSetDefaultCompression(value);
    }
  };

  const setDefaultCompressionLevel = (value: number) => {
    if (handleSetItem('defaultCompressionLevel', String(value))) {
      rawSetDefaultCompressionLevel(value);
    }
  };

  useEffect(() => {
    updateStorageVersion(); // Initial calculation
  }, []);

  return (
    <AppContext.Provider value={{ 
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
      setDefaultCompressionLevel
    }}>
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