import React, { createContext, useContext, useMemo } from 'react';
import { Source } from './App';

interface SourceContextType {
  source: Source | null;
  segments: string[];
  delimiters: string[];
}

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export const SourceProvider: React.FC<{ children: React.ReactNode, source: Source | null }> = ({ children, source }) => {
  const segments = useMemo(() => {
    if (!source) return [];
    const rule = source.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    try {
      new RegExp(wrappedRule);
      return source.content.split(new RegExp(wrappedRule)).filter((_, i) => i % 2 === 0);
    } catch (e) {
      console.error("Invalid segmentation regex:", e);
      return [source.content]; // Return unsplit content on error
    }
  }, [source]);

  const delimiters = useMemo(() => {
    if (!source) return [];
    const rule = source.segmentationRule || '\n';
    const wrappedRule = `(${rule})`;
    try {
      new RegExp(wrappedRule);
      return source.content.split(new RegExp(wrappedRule)).filter((_, i) => i % 2 !== 0);
    } catch (e) {
      console.error("Invalid segmentation regex:", e);
      return []; // Return no delimiters on error
    }
  }, [source]);

  return (
    <SourceContext.Provider value={{ source, segments, delimiters }}>
      {children}
    </SourceContext.Provider>
  );
};

export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return context;
};
