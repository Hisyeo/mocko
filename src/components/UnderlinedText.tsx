import React, { useRef, useEffect } from 'react';
import Mark from 'mark.js';

interface UnderlinedTextProps {
  text: string;
  memories: Record<string, string>;
  onInsert: (text: string) => void;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({ text, memories, onInsert }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
            }
          });
        });
      }});
    }
  }, [text, memories, onInsert]);

  return <span ref={textRef}>{text}</span>;
};

export default UnderlinedText;
