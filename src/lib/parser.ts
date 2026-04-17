export interface ParsedFile {
  path: string;
  content: string;
}

export interface LintFix {
  path: string;
  action: 'update' | 'create' | 'delete';
  reason: string;
  content: string;
}

const VALID_FOLDERS = ['concepts/', 'entities/', 'sources/', 'events/'];

export function parseAIOutput(text: string): ParsedFile[] {
  const files: ParsedFile[] = [];

  const strictRegex = /<file\s+path="([^"]+)">([\s\S]*?)<\/file>/g;
  let match;
  while ((match = strictRegex.exec(text)) !== null) {
    const f = validateFile(match[1], match[2].trim());
    if (f) files.push(f);
  }
  if (files.length > 0) return files;

  const relaxedRegex = /<file\s+path=["']([^"']+)["']>([\s\S]*?)(?=<file\s|$)/gi;
  while ((match = relaxedRegex.exec(text)) !== null) {
    const f = validateFile(match[1], match[2].replace(/<\/file>\s*$/i, '').trim());
    if (f) files.push(f);
  }
  if (files.length > 0) return files;

  const codeBlockRegex = /```(?:markdown|md)?\s*\n?\s*<!--\s*(.+?\.md)\s*-->\s*\n([\s\S]*?)```/g;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const f = validateFile(match[1].trim(), match[2].trim());
    if (f) files.push(f);
  }

  return files;
}

function validateFile(rawPath: string, content: string): ParsedFile | null {
  if (!content || content.length < 10) return null;

  let normalized = rawPath.trim().toLowerCase().replace(/\s+/g, '-');

  const hasFolder = VALID_FOLDERS.some(f => normalized.startsWith(f));
  if (!hasFolder && !normalized.endsWith('.md')) return null;
  if (!hasFolder && normalized.endsWith('.md')) {
    normalized = `concepts/${normalized}`;
  }

  if (!normalized.endsWith('.md')) {
    normalized += '.md';
  }

  if (normalized.includes('..') || /[<>:"|?*]/.test(normalized)) return null;

  return { path: normalized, content };
}

export function parseLintOutput(text: string): { report: string; fixes: LintFix[] } {
  const reportMatch = text.match(/<report>([\s\S]*?)<\/report>/i);
  const report = reportMatch ? reportMatch[1].trim() : text;

  const fixes: LintFix[] = [];

  const selfCloseRegex = /<fix\s+path="([^"]+)"\s+action="(delete|update|create)"\s+reason="([^"]*)"\s*\/>/gi;
  let match;
  while ((match = selfCloseRegex.exec(text)) !== null) {
    fixes.push({ path: match[1], action: match[2] as any, reason: match[3], content: '' });
  }

  const contentRegex = /<fix\s+path="([^"]+)"\s+action="(update|create)"\s+reason="([^"]*)">([\s\S]*?)<\/fix>/gi;
  while ((match = contentRegex.exec(text)) !== null) {
    fixes.push({ path: match[1], action: match[2] as any, reason: match[3], content: match[4].trim() });
  }

  return { report, fixes };
}
