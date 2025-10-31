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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, rawSetTheme] = useState(() => localStorage.getItem('theme') || 'brite');
  const [grammarCheck, rawSetGrammarCheck] = useState(() => localStorage.getItem('grammarCheck') !== 'true');
  const [spellCheck, rawSetSpellCheck] = useState(() => localStorage.getItem('spellCheck') !== 'true');
  const [autocomplete, rawSetAutocomplete] = useState(() => localStorage.getItem('autocomplete') !== 'true');
  const [wiktionarySearch, rawSetWiktionarySearch] = useState(() => localStorage.getItem('wiktionarySearch') || 'modal');

  const setTheme = (newTheme: string) => {
    rawSetTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setGrammarCheck = (value: boolean) => {
    rawSetGrammarCheck(value);
    localStorage.setItem('grammarCheck', String(value));
  };

  const setSpellCheck = (value: boolean) => {
    rawSetSpellCheck(value);
    localStorage.setItem('spellCheck', String(value));
  };

  const setAutocomplete = (value: boolean) => {
    rawSetAutocomplete(value);
    localStorage.setItem('autocomplete', String(value));
  };

  const setWiktionarySearch = (value: string) => {
    rawSetWiktionarySearch(value);
    localStorage.setItem('wiktionarySearch', value);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) rawSetTheme(storedTheme);

    const storedGrammarCheck = localStorage.getItem('grammarCheck');
    if (storedGrammarCheck) rawSetGrammarCheck(storedGrammarCheck === 'true');

    const storedSpellCheck = localStorage.getItem('spellCheck');
    if (storedSpellCheck) rawSetSpellCheck(storedSpellCheck === 'true');

    const storedAutocomplete = localStorage.getItem('autocomplete');
    if (storedAutocomplete) rawSetAutocomplete(storedAutocomplete === 'true');

    const storedWiktionarySearch = localStorage.getItem('wiktionarySearch');
    if (storedWiktionarySearch) rawSetWiktionarySearch(storedWiktionarySearch);
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme, grammarCheck, setGrammarCheck, spellCheck, setSpellCheck, autocomplete, setAutocomplete, wiktionarySearch, setWiktionarySearch }}>
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