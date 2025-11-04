import { useApp } from '../AppContext';
import { useSource } from '../SourceContext';
import pako from 'pako';

export type CompressionLevel = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;

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

export function useCompressedStorage() {
  const { handleSetItem, setError } = useApp();
  const { source } = useSource();

  const getItem = (key: string): string | null => {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) return null;

    if (source?.compression) {
      try {
        return pako.inflate(atobUint8Array(rawValue), { to: 'string' });
      } catch (err: any) {
        setError({ title: 'Decompression Error', message: `Failed to read data for key ${key}: ${err.message}. The data may be corrupt.` });
        return null; // Indicate failure
      }
    }
    return rawValue;
  };

  const setItem = (key: string, value: string): boolean => {
    if (!source) return false;

    let valueToStore = value;
    if (source.compression) {
      try {
        const compressed = pako.deflate(value, { level: source.compressionLevel as CompressionLevel ?? 1 });
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
