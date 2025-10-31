import React, { useRef, useEffect } from 'react';
import Mark from 'mark.js';

interface UnderlinedTextProps {
  text: string;
  memories: Record<string, string>;
  onInsert: (text: string) => void;
  onMemoriesNumbered: (memories: Record<number, { source: string, target: string }>) => void;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({ text, memories, onInsert, onMemoriesNumbered }) => {
  const textRef = useRef<HTMLDivElement>(null);

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
              const numBadge = document.createElement('span');
              count++;
              numberedMemories[count] = { source: key, target: memories[key] };
              numBadge.className = 'badge-sm position-absolute bottom-45 translate-middle rounded-pill bg-danger';
              numBadge.innerText = `${count}`;
              el.appendChild(numBadge);
            }
          });
        });
        onMemoriesNumbered(numberedMemories);
      }});
    }
  }, [text, memories, onInsert, onMemoriesNumbered]);

  return <span ref={textRef} id='current-editing-translation-source-text'>{text}</span>;
};

export default UnderlinedText;