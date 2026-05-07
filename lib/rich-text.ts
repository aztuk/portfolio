export type HighlightedTextSegment = {
  text: string;
  highlighted: boolean;
};

const highlightTagPattern = /<\/?b>/gi;

export const parseHighlightedText = (text: string): HighlightedTextSegment[] => {
  const segments: HighlightedTextSegment[] = [];
  let lastIndex = 0;
  let highlightDepth = 0;
  let match: RegExpExecArray | null;

  const pushSegment = (segmentText: string) => {
    if (segmentText.length === 0) {
      return;
    }

    const highlighted = highlightDepth > 0;
    const previous = segments[segments.length - 1];

    if (previous && previous.highlighted === highlighted) {
      previous.text += segmentText;
      return;
    }

    segments.push({ text: segmentText, highlighted });
  };

  highlightTagPattern.lastIndex = 0;

  while ((match = highlightTagPattern.exec(text)) !== null) {
    pushSegment(text.slice(lastIndex, match.index));

    if (match[0].toLowerCase() === "<b>") {
      highlightDepth += 1;
    } else {
      highlightDepth = Math.max(0, highlightDepth - 1);
    }

    lastIndex = match.index + match[0].length;
  }

  pushSegment(text.slice(lastIndex));

  return segments;
};

export const stripHighlightTags = (text: string): string =>
  text.replace(highlightTagPattern, "");
