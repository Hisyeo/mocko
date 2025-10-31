import React, { useRef, useEffect } from 'react';
import Mark from 'mark.js';
import { useApp } from '../AppContext';

interface UnderlinedTextProps {
  text: string;
  memories: Record<string, string>;
  onInsert: (text: string) => void;
  onMemoriesNumbered: (memories: Record<number, { source: string, target: string }>) => void;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({ text, memories, onInsert, onMemoriesNumbered }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const { autocomplete } = useApp();

  useEffect(() => {
    let count = 0;
    const numberedMemories: Record<number, { source: string, target: string }> = {};

    if (textRef.current) {
      const instance = new Mark(textRef.current);
      instance.unmark({ done: () => {
        Object.keys(memories).forEach(key => {
          instance.mark(key, {
            element: 'span',
            className: 'underline',
            each: (el: HTMLElement) => {
              el.setAttribute('title', memories[key]);
              el.onclick = () => onInsert(memories[key]);
              if (autocomplete) {
                count++;
                numberedMemories[count] = { source: key, target: memories[key] };
                const numBadge = document.createElement('span');
                numBadge.className = 'badge-sm position-absolute bottom-45 translate-middle rounded-pill bg-danger';
                numBadge.innerText = `${count}`;
                el.appendChild(numBadge);
              }
            }
          });
        });
        if (autocomplete) {
          onMemoriesNumbered(numberedMemories);
        }
      }});
    }
  }, [text, memories, onInsert, onMemoriesNumbered, autocomplete]);

  return <span ref={textRef} id='current-editing-translation-source-text'>{text}</span>;
};

export default UnderlinedText;