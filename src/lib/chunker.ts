interface Chunk {
  text: string;
  index: number;
  wordCount: number;
}

export function chunkText(text: string, maxWords: number = 3000, overlapWords: number = 200): Chunk[] {
  const sections = splitBySections(text);
  const chunks: Chunk[] = [];
  let currentParts: string[] = [];
  let currentWords = 0;

  for (const section of sections) {
    const sectionWords = countWords(section);

    if (currentWords + sectionWords > maxWords && currentParts.length > 0) {
      chunks.push(finalizeChunk(currentParts, chunks.length));

      const overlapText = tailWords(currentParts.join('\n\n'), overlapWords);
      currentParts = overlapText ? [overlapText] : [];
      currentWords = overlapText ? countWords(overlapText) : 0;
    }

    if (sectionWords > maxWords) {
      if (currentParts.length > 0) {
        chunks.push(finalizeChunk(currentParts, chunks.length));
        currentParts = [];
        currentWords = 0;
      }
      const subChunks = splitLargeSection(section, maxWords, overlapWords);
      for (const sub of subChunks) {
        chunks.push({ text: sub, index: chunks.length, wordCount: countWords(sub) });
      }
    } else {
      currentParts.push(section);
      currentWords += sectionWords;
    }
  }

  if (currentParts.length > 0) {
    chunks.push(finalizeChunk(currentParts, chunks.length));
  }

  return chunks;
}

function splitBySections(text: string): string[] {
  const lines = text.split('\n');
  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (/^#{1,3}\s/.test(line) && current.length > 0) {
      sections.push(current.join('\n'));
      current = [];
    }
    current.push(line);
  }

  if (current.length > 0) {
    sections.push(current.join('\n'));
  }

  return sections.length > 0 ? sections : [text];
}

function splitLargeSection(section: string, maxWords: number, overlapWords: number): string[] {
  const paragraphs = section.split(/\n{2,}/);
  const result: string[] = [];
  let current: string[] = [];
  let currentWords = 0;

  for (const para of paragraphs) {
    const pw = countWords(para);
    if (currentWords + pw > maxWords && current.length > 0) {
      result.push(current.join('\n\n'));
      const overlap = tailWords(current.join('\n\n'), overlapWords);
      current = overlap ? [overlap] : [];
      currentWords = overlap ? countWords(overlap) : 0;
    }
    current.push(para);
    currentWords += pw;
  }

  if (current.length > 0) {
    result.push(current.join('\n\n'));
  }

  return result;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function tailWords(text: string, n: number): string {
  const words = text.split(/\s+/);
  if (words.length <= n) return text;
  return words.slice(-n).join(' ');
}

function finalizeChunk(parts: string[], index: number): Chunk {
  const text = parts.join('\n\n');
  return { text, index, wordCount: countWords(text) };
}
