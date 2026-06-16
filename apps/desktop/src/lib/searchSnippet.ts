/** Format qmd relevance score as a percentage label. */
export function formatSearchScore(score: number): string {
  const pct = score > 1 ? score : score * 100;
  return `${Math.round(pct)}%`;
}

/** Strip qmd diff headers from snippet text for inspector display. */
export function formatSearchSnippet(snippet: string): string {
  const lines = snippet.split("\n");
  const start = lines.findIndex((line) => !line.startsWith("@@"));
  if (start <= 0) return snippet.trim();
  return lines.slice(start).join("\n").trim();
}
