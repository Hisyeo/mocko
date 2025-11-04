import { useApp } from '../AppContext';
import { useSource } from '../SourceContext';
import pako from 'pako';

export type CompressionLevel = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;

// Helper to decode from base64 Uint8Array
const atobUint8Array = (b64: string) => {
  const byteCharacters = atob(b64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Uint8Array(byteNumbers);
}

export function useCompressedStorage() {
  const { handleSetItem, setError } = useApp();
  const { source } = useSource();

  const getItem = (key: string): any | null => {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) return null;

    let decompressed = rawValue;
    if (source?.compression) {
      try {
        decompressed = pako.inflate(atobUint8Array(rawValue), { to: 'string' });
      } catch (err: any) {
        setError({ title: 'Decompression Error', message: `Failed to read data for key ${key}: ${err.message}. The data may be corrupt.` });
        return null; // Indicate failure
      }
    }
    
    try {
      return JSON.parse(decompressed);
    } catch (e) {
      // If it fails to parse, it might be a raw string (like from an old version)
      return decompressed;
    }
  };

  const setItem = (key: string, value: any): boolean => {
    if (!source) return false;

    const stringifiedValue = JSON.stringify(value);
    let valueToStore = stringifiedValue;

    if (source.compression) {
      try {
        const compressed = pako.deflate(stringifiedValue, { level: (source.compressionLevel ?? 1) as pako.DeflateFunctionOptions['level'] });
        valueToStore = btoa(String.fromCharCode(...compressed));
      } catch (err: any) {
        setError({ title: 'Compression Error', message: `Failed to save data for key ${key}: ${err.message}` });
        return false; // Indicate failure
      }
    }
    return handleSetItem(key, valueToStore);
  };

  return { getItem, setItem };
}