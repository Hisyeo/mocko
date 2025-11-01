self.onmessage = (e) => {
  const { content, segmentationRule, translations } = e.data;

  const countWords = (text) => {
    return text.split(/\s+/).filter(word => word !== '').length;
  };

  const rule = segmentationRule || '\n';
  const wrappedRule = `(${rule})`;
  const parts = content.split(new RegExp(wrappedRule));
  const segments = parts.filter((_, i) => i % 2 === 0);
  const delimiters = parts.filter((_, i) => i % 2 !== 0);

  const sourceWordCount = countWords(content);
  const translatedSegments = Object.keys(translations).filter(key => key !== '__title__');
  const translatedWordCount = translatedSegments.reduce((acc, key) => acc + countWords(translations[key]), 0);
  const numSegments = segments.filter(seg => seg.trim() !== '').length;
  const avgSourceWords = numSegments > 0 ? (sourceWordCount / numSegments).toFixed(2) : 0;
  const numTranslatedSegments = translatedSegments.length;
  const avgTranslatedWords = numTranslatedSegments > 0 ? (translatedWordCount / numTranslatedSegments).toFixed(2) : 0;

  let reconstructed = '';
  segments.forEach((seg, i) => {
    reconstructed += translations[seg.trim()] || seg;
    if (delimiters[i]) {
      reconstructed += delimiters[i];
    }
  });

  self.postMessage({
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
};