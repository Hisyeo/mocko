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
  showQuotaError: boolean;
  setShowQuotaError: (show: boolean) => void;
  handleSetItem: (key: string, value: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, rawSetTheme] = useState(() => localStorage.getItem('yon-mocko-theme') || 'brite');
  const [grammarCheck, rawSetGrammarCheck] = useState(() => localStorage.getItem('grammarCheck') !== 'true');
  const [spellCheck, rawSetSpellCheck] = useState(() => localStorage.getItem('spellCheck') !== 'true');
  const [autocomplete, rawSetAutocomplete] = useState(() => localStorage.getItem('autocomplete') !== 'true');
  const [wiktionarySearch, rawSetWiktionarySearch] = useState(() => localStorage.getItem('wiktionarySearch') || 'modal');
  const [defaultGrammarRule, rawSetDefaultGrammarRule] = useState(() => localStorage.getItem('defaultGrammarRule') || 'Constituents');
  const [showQuotaError, setShowQuotaError] = useState(false);

  const handleSetItem = (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        setShowQuotaError(true);
        return false;
      } else {
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

  useEffect(() => {
    const storedTheme = localStorage.getItem('yon-mocko-theme');
    if (storedTheme) rawSetTheme(storedTheme);

    const storedGrammarCheck = localStorage.getItem('grammarCheck');
    if (storedGrammarCheck) rawSetGrammarCheck(storedGrammarCheck === 'true');

    const storedSpellCheck = localStorage.getItem('spellCheck');
    if (storedSpellCheck) rawSetSpellCheck(storedSpellCheck === 'true');

    const storedAutocomplete = localStorage.getItem('autocomplete');
    if (storedAutocomplete) rawSetAutocomplete(storedAutocomplete === 'true');

    const storedWiktionarySearch = localStorage.getItem('wiktionarySearch');
    if (storedWiktionarySearch) rawSetWiktionarySearch(storedWiktionarySearch);

    const storedDefaultGrammarRule = localStorage.getItem('defaultGrammarRule');
    if (storedDefaultGrammarRule) rawSetDefaultGrammarRule(storedDefaultGrammarRule);
  }, []);

  return (
    <AppContext.Provider value={{ 
      theme, setTheme, 
      grammarCheck, setGrammarCheck, 
      spellCheck, setSpellCheck, 
      autocomplete, setAutocomplete, 
      wiktionarySearch, setWiktionarySearch, 
      defaultGrammarRule, setDefaultGrammarRule,
      showQuotaError, setShowQuotaError,
      handleSetItem
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