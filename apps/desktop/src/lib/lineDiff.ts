export type DiffLine = { type: "add" | "remove" | "same"; text: string };

/** Line-based diff using longest common subsequence (no external deps). */
export function lineDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const lcs = buildLcsTable(oldLines, newLines);
  const raw: DiffLine[] = [];
  let i = oldLines.length;
  let j = newLines.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      raw.push({ type: "same", text: oldLines[i - 1] });
      i -= 1;
      j -= 1;
    } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
      raw.push({ type: "add", text: newLines[j - 1] });
      j -= 1;
    } else {
      raw.push({ type: "remove", text: oldLines[i - 1] });
      i -= 1;
    }
  }
  raw.reverse();
  return raw;
}

export function linesAsDiff(lines: string[], type: "add" | "remove"): DiffLine[] {
  return lines.map((text) => ({ type, text }));
}

function buildLcsTable(a: string[], b: string[]): number[][] {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const table = Array.from({ length: rows }, () => Array<number>(cols).fill(0));
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }
  return table;
}
