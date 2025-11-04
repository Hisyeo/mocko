import React, { useEffect, useRef, useState, useMemo } from 'react';
import Mark from 'mark.js';
import { Overlay, Popover, Badge, Button } from 'react-bootstrap';
import { useApp } from '../AppContext';

interface UnderlinedTextProps {
  text: string;
  memories: Record<string, string>;
  onInsert: (text: string) => void;
  onMemoriesNumbered: (memories: Record<number, { source: string, target: string }>) => void;
  memoryVersion: number;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({ text, memories, onInsert, onMemoriesNumbered, memoryVersion }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | undefined>(undefined);
  const [tooltipContent, setTooltipContent] = useState({ source: '', target: '', isAlternative: false });
  const { autocomplete } = useApp();

  const memoryMap = useMemo(() => {
    const resolved: Record<string, { target: string, isAlternative: boolean, original?: string }> = {};

    // First, map all main memories
    for (const key in memories) {
      const value = memories[key];
      if (!value.startsWith('@')) {
        resolved[key.toLowerCase()] = { target: value, isAlternative: false };
      }
    }

    // Second, map all alternatives, looking up their main target
    for (const key in memories) {
      const value = memories[key];
      if (value.startsWith('@')) {
        const mainKey = value.substring(1);
        const mainValue = memories[mainKey];
        if (mainValue && !mainValue.startsWith('@')) {
          resolved[key.toLowerCase()] = { target: mainValue, isAlternative: true, original: mainKey.toLowerCase() };
        }
      }
    }
    return resolved;
  }, [memories]);

  const badges: HTMLElement[] = [];

  useEffect(() => {
    const instance = new Mark(textRef.current as HTMLElement);
    // Filter out empty keys that can cause infinite loops
    const memoryKeys = Object.keys(memoryMap).filter(key => key.length > 0);

    instance.unmark({
      done: () => {
        // clear existing badges
        for (let badge in badges) { badges[badge].remove(); delete badges[badge] }

        const sourceTextToNumberMap: Record<string, number> = {};
        let memoryCounter = 1;

        if (memoryKeys.length > 0) {
          instance.mark(memoryKeys, {
            separateWordSearch: false,
            className: 'memory-highlight',
            each: (el) => {
              const sourceText = el.textContent || '';
              const memory = memoryMap[sourceText.toLowerCase()];
              if (memory && el instanceof HTMLElement) {
                el.dataset.source = sourceText;
                el.dataset.target = memory.target;
                el.dataset.isAlternative = String(memory.isAlternative);

                let shortcutNumber: number;
                if (autocomplete) {
                  const memValue = memoryMap[sourceText.toLowerCase()];
                  if (memValue.isAlternative && memValue.original) {
                    if (sourceTextToNumberMap[memValue.original] === undefined) {
                      sourceTextToNumberMap[memValue.original] = memoryCounter++;
                    }
                    shortcutNumber = sourceTextToNumberMap[memValue.original];
                  } else {
                    if (sourceTextToNumberMap[sourceText.toLowerCase()] === undefined) {
                      sourceTextToNumberMap[sourceText.toLowerCase()] = memoryCounter++;
                    }
                    shortcutNumber = sourceTextToNumberMap[sourceText.toLowerCase()];
                  }
                  el.dataset.number = String(shortcutNumber);
                  
                  const badge = document.createElement('sup');
                  badge.className = `badge rounded-pill ${memory.isAlternative ? 'bg-info' : 'bg-danger'}`;
                  badge.textContent = String(shortcutNumber);
                  badge.style.pointerEvents = 'none'; 
                  el.appendChild(badge);
                  badges.push(badge)
                }
              }
            }
          });
        }

        const numberedMemories: Record<number, { source: string, target: string }> = {};
        for (const sourceText in sourceTextToNumberMap) {
          const number = sourceTextToNumberMap[sourceText];
          const memory = memoryMap[sourceText.toLowerCase()];
          if (number && memory) {
            numberedMemories[number] = {
              source: sourceText,
              target: memory.target
            };
          }
        }
        onMemoriesNumbered(numberedMemories);
      }
    });

    const handleMouseover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('memory-highlight')) {
        setTooltipContent({
          source: target.dataset.source || '',
          target: target.dataset.target || '',
          isAlternative: target.dataset.isAlternative === 'true'
        });
        setTooltipTarget(target);
        setShowTooltip(true);
      }
    };

    const handleMouseout = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('memory-highlight')) {
        setShowTooltip(false);
      }
    };

    const currentRef = textRef.current;
    currentRef?.addEventListener('mouseover', handleMouseover);
    currentRef?.addEventListener('mouseout', handleMouseout);

    return () => {
      currentRef?.removeEventListener('mouseover', handleMouseover);
      currentRef?.removeEventListener('mouseout', handleMouseout);
    };
  }, [text, memoryMap, onMemoriesNumbered, autocomplete, memoryVersion]);

  return (
    <span id="current-editing-translation-source-text">
      <span ref={textRef} className="source-text">{text}</span>
      {tooltipTarget && <Overlay target={tooltipTarget} show={showTooltip} placement="top">
        {(props) => (
          <Popover {...props} id="memory-tooltip">
            <Popover.Body>
              "{tooltipContent.target}"
              <Button variant="link" size="sm" onClick={() => onInsert(tooltipContent.target)}>(insert)</Button>
            </Popover.Body>
          </Popover>
        )}
      </Overlay>}
    </span>
  );
};

export default UnderlinedText;