import { getErrorMessage } from './errors';
import type { SearchResultItem } from './types';

const QMD_TIMEOUT_MS = 10000;

function getQmdCommand(args: string[]) {
  const qmdBin = process.env.QMD_BIN?.trim();

  if (qmdBin) {
    return {
      command: qmdBin,
      args,
    };
  }

  return {
    command: 'npx',
    args: ['qmd', ...args],
  };
}

function extractJSONArray(text: string): unknown[] | null {
  const start = text.indexOf('[');

  if (start === -1) {
    return null;
  }

  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === '[') depth += 1;
    else if (text[index] === ']') depth -= 1;

    if (depth === 0) {
      try {
        return JSON.parse(text.slice(start, index + 1)) as unknown[];
      } catch {
        return null;
      }
    }
  }

  return null;
}

function normalizeSearchResult(result: unknown): SearchResultItem | null {
  if (!result || typeof result !== 'object') {
    return null;
  }

  const candidate = result as Record<string, unknown>;
  const file = typeof candidate.file === 'string' ? candidate.file : null;
  if (!file) {
    return null;
  }

  return {
    file,
    title: typeof candidate.title === 'string' ? candidate.title : undefined,
    score: typeof candidate.score === 'number' ? candidate.score : 0,
    snippet: typeof candidate.snippet === 'string' ? candidate.snippet : '',
  };
}

export async function runQmdQuery(query: string): Promise<SearchResultItem[]> {
  const { execFile } = await import('child_process');
  const { promisify } = await import('util');
  const execFileAsync = promisify(execFile);
  const { command, args } = getQmdCommand(['query', query, '--json']);
  const { stdout } = await execFileAsync(command, args, { timeout: QMD_TIMEOUT_MS });

  const parsed = extractJSONArray(stdout);
  if (!parsed) {
    throw new Error('No JSON array found in qmd output');
  }

  return parsed
    .map(normalizeSearchResult)
    .filter((result): result is SearchResultItem => result !== null);
}

export function updateQmdIndexInBackground(): void {
  void import('child_process').then(({ execFile }) => {
    const { command, args } = getQmdCommand(['update']);

    const child = execFile(command, args, (error) => {
      if (error) {
        console.error('qmd background update failed:', getErrorMessage(error));
      }
    });

    child.unref();
  });
}
