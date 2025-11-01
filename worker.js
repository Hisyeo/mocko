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
    segments.forEach((seg, i) => {
      const trimmedSeg = seg.trim();
      const translationData = translations[trimmedSeg];
      const translationText = (typeof translationData === 'object' && translationData !== null) ? translationData.text : translationData;
      reconstructed += translationText || seg;
      if (delimiters[i]) {
        reconstructed += delimiters[i];
      }
    });

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