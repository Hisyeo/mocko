self.onmessage = (e) => {
  const { task, content, segmentationRule, translations, oldTranslations } = e.data;

  const countWords = (text) => {
    if (typeof text !== 'string') return 0;
    return text.split(/\s+/).filter(word => word !== '').length;
  };

  const rule = segmentationRule || '\n';
  const wrappedRule = `(${rule})`;
  const parts = content.split(new RegExp(wrappedRule));
  const segments = parts.filter((_, i) => i % 2 === 0);
  const delimiters = parts.filter((_, i) => i % 2 !== 0);

  if (task === 'segment') {
    const newSegments = segments.map(s => s.trim()).filter(Boolean);
    const newTranslations = {};
    newSegments.forEach(newSegment => {
      if (oldTranslations[newSegment]) {
        newTranslations[newSegment] = oldTranslations[newSegment];
      }
    });
    self.postMessage({
      task: 'segment',
      newDelimiters: delimiters,
      newTranslations,
    });
  } else { // Default task is 'stats'
    const sourceWordCount = countWords(content);
    const translatedSegments = Object.keys(translations).filter(key => key !== '__title__');

    const translatedWordCount = translatedSegments.reduce((acc, key) => {
      const translationData = translations[key];
      const text = (typeof translationData === 'object' && translationData !== null) ? translationData.text : translationData;
      return acc + countWords(text);
    }, 0);

    const numSegments = segments.filter(seg => seg.trim() !== '').length;
    const avgSourceWords = numSegments > 0 ? (sourceWordCount / numSegments).toFixed(2) : 0;
    const numTranslatedSegments = translatedSegments.length;
    const avgTranslatedWords = numTranslatedSegments > 0 ? (translatedWordCount / numTranslatedSegments).toFixed(2) : 0;

    let reconstructed = '';
    const notes = [];
    let noteCounter = 1;

    segments.forEach((seg, i) => {
      const trimmedSeg = seg.trim();
      if (!trimmedSeg) return;

      const translationData = translations[trimmedSeg];
      const prevTranslationData = i > 0 ? translations[segments[i - 1].trim()] : null;

      let translationText = seg;
      let noteAppended = false;

      if (translationData) {
        if (translationData.segmentType === 'Skip') {
          translationText = ''; // Don't include the segment text itself if skipped
        } else if (typeof translationData === 'object' && translationData !== null) {
          translationText = translationData.text || seg;
          if (translationData.note) {
            translationText += ` [${noteCounter}]`;
            notes.push(`${noteCounter}. ${translationData.note}`);
            noteCounter++;
            noteAppended = true;
          }
        } else {
          translationText = translationData;
        }
      }
      
      // Handle preceding delimiter
      if (i > 0 && delimiters[i-1]) {
        const prevAction = prevTranslationData?.delimiterAction;
        if (prevAction !== 'Skip Succeeding' && prevAction !== 'Skip Both') {
            const currentAction = translationData?.delimiterAction;
            if (currentAction !== 'Skip Preceding' && currentAction !== 'Skip Both') {
                reconstructed += delimiters[i-1];
            }
        }
      }

      reconstructed += translationText;
    });

    if (notes.length > 0) {
      reconstructed += '\n\n---\n\nNotes\n\n' + notes.join('\n');
    }

    self.postMessage({
      task: 'stats',
      stats: {
        sourceWordCount,
        translatedWordCount,
        numSegments,
        avgSourceWords,
        numTranslatedSegments,
        avgTranslatedWords,
      },
      renderedContent: reconstructed,
    });
  }
};