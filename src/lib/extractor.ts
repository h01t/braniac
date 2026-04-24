import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);
const GRAPPER_BIN = process.env.GRAPPER_PATH?.trim() || 'grapper';

function logExtractionFailure(source: 'URL' | 'PDF', error: unknown) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(
    `grapper ${source} extraction failed: ${reason}. Set GRAPPER_PATH or ensure "grapper" is available on PATH.`,
  );
}

export async function extractTextFromUrl(url: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(GRAPPER_BIN, ['--stdout', url], { timeout: 30000 });
    return stdout.trim() || null;
  } catch (err) {
    logExtractionFailure('URL', err);
    return null;
  }
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string | null> {
  const tmpPath = path.join(os.tmpdir(), `grapper-input-${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`);
  try {
    await fs.writeFile(tmpPath, buffer);
    const { stdout } = await execFileAsync(GRAPPER_BIN, ['--stdout', tmpPath], { timeout: 30000 });
    return stdout.trim() || null;
  } catch (err) {
    logExtractionFailure('PDF', err);
    return null;
  } finally {
    await fs.unlink(tmpPath).catch(() => {});
  }
}
