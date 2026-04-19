import fs from 'fs/promises';
import path from 'path';
import { simpleGit, SimpleGit } from 'simple-git';
import { withVaultLock } from './lock';

export interface Metrics {
  graphRenderTime: number;
  graphNodeCount: number;
  searchLatency: number;
  ingestionCount: number;
  vaultSize: number;
}

export interface MetricLog {
  timestamp: string;
  vaultId: string;
  operation: string;
  duration: number;
  metadata: Record<string, unknown>;
}

const VAULTS_ROOT = path.join(process.cwd(), 'vaults');

export async function listVaults() {
  try {
    await fs.mkdir(VAULTS_ROOT, { recursive: true });
    const dirents = await fs.readdir(VAULTS_ROOT, { withFileTypes: true });
    return dirents.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  } catch (error) {
    console.error("Error listing vaults:", error);
    return [];
  }
}

export async function initVault(vaultId: string) {
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  await fs.mkdir(vaultPath, { recursive: true });
  
  const git: SimpleGit = simpleGit(vaultPath);
  const isRepo = await git.checkIsRepo();
  
  if (!isRepo) {
    await git.init();
    await git.addConfig('user.name', 'AI Knowledge Compiler');
    await git.addConfig('user.email', 'ai@knowledge.compiler');
    
    // Create initial index.md
    await fs.writeFile(path.join(vaultPath, 'index.md'), '# Knowledge Vault\n\nInitial commit.');
    await git.add('.');
    await git.commit('Initial creation of knowledge vault');
  }
  
  return vaultPath;
}

export async function listFiles(vaultId: string, subPath: string = '') {
  const vaultPath = path.join(VAULTS_ROOT, vaultId, subPath);
  try {
    let dirents;
    try {
      dirents = await fs.readdir(vaultPath, { withFileTypes: true });
    } catch (err: any) {
      if (err.code === 'ENOENT' && subPath === '') {
        // Auto-initialize default vault if it doesn't exist
        await initVault(vaultId);
        dirents = await fs.readdir(vaultPath, { withFileTypes: true });
      } else {
        throw err;
      }
    }
    
    const files: any[] = [];
    for (const dirent of dirents) {
      if (dirent.name === '.git') continue;
      const relPath = path.join(subPath, dirent.name);
      if (dirent.isDirectory()) {
         const nested = await listFiles(vaultId, relPath);
         files.push(...nested);
      } else {
         files.push({ name: dirent.name, path: relPath, type: 'file' });
      }
    }
    return files;
  } catch(error) {
    console.error("Error listing files:", error);
    return [];
  }
}

export async function readMarkdown(vaultId: string, filename: string) {
  const filePath = path.join(VAULTS_ROOT, vaultId, filename);
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch(e) {
    return null;
  }
}

export async function writeMarkdownAndCommit(vaultId: string, filename: string, content: string, commitMessage: string) {
  return withVaultLock(vaultId, async () => {
    const vaultPath = path.join(VAULTS_ROOT, vaultId);
    const filePath = path.join(vaultPath, filename);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
    const git: SimpleGit = simpleGit(vaultPath);
    await git.add(filename);
    await git.commit(commitMessage);
    return { success: true };
  });
}

export async function getHistory(vaultId: string) {
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  try {
    const git: SimpleGit = simpleGit(vaultPath);
    const log = await git.log();
    return log.all;
  } catch(e) {
    return [];
  }
}

export async function getDiff(vaultId: string, hash: string) {
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  try {
    const git: SimpleGit = simpleGit(vaultPath);
    const diff = await git.show([hash]);
    return diff;
  } catch (e) {
    return '';
  }
}

// ── Lint Cache ───────────────────────────────────────────────────────────────

export interface LintCache {
  version: number;
  timestamp: string;
  commitHash: string;
  fileStatuses: Record<string, { healthy: boolean; issues: string[]; lastChecked: string }>;
}

const LINT_CACHE_FILE = '.lint-cache.json';

export async function readLintCache(vaultId: string): Promise<LintCache | null> {
  const filePath = path.join(VAULTS_ROOT, vaultId, LINT_CACHE_FILE);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as LintCache;
  } catch {
    return null;
  }
}

export async function writeLintCache(vaultId: string, cache: LintCache): Promise<void> {
  const filePath = path.join(VAULTS_ROOT, vaultId, LINT_CACHE_FILE);
  await fs.writeFile(filePath, JSON.stringify(cache, null, 2), 'utf-8');
}

export async function getCurrentCommitHash(vaultId: string): Promise<string> {
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  try {
    const git: SimpleGit = simpleGit(vaultPath);
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash ?? '';
  } catch {
    return '';
  }
}

export async function getChangedFilesSince(vaultId: string, commitHash: string): Promise<string[]> {
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  try {
    const git: SimpleGit = simpleGit(vaultPath);
    const result = await git.diff([`${commitHash}..HEAD`, '--name-only']);
    return result.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

// ── File deletion ────────────────────────────────────────────────────────────

export async function deleteFileAndCommit(vaultId: string, filename: string, commitMessage: string) {
  return withVaultLock(vaultId, async () => {
    const vaultPath = path.join(VAULTS_ROOT, vaultId);
    const filePath = path.join(vaultPath, filename);
    await fs.unlink(filePath);
    const git: SimpleGit = simpleGit(vaultPath);
    await git.rm([filename]);
    await git.commit(commitMessage);
    return { success: true };
  });
}

// ── Diff generation ──────────────────────────────────────────────────────────

export async function generateUnifiedDiff(before: string, after: string): Promise<string> {
  if (before === after) return '';
  const os = await import('os');
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  const ts = Date.now();
  const beforePath = path.join(os.tmpdir(), `lint-before-${ts}.md`);
  const afterPath  = path.join(os.tmpdir(), `lint-after-${ts}.md`);
  await fs.writeFile(beforePath, before, 'utf-8');
  await fs.writeFile(afterPath,  after,  'utf-8');
  try {
    const { stdout } = await execAsync(`diff -u "${beforePath}" "${afterPath}"`);
    return stdout;
  } catch (e: any) {
    // diff exits with code 1 when files differ — that's normal
    return e.stdout || '';
  } finally {
    await fs.unlink(beforePath).catch(() => {});
    await fs.unlink(afterPath).catch(() => {});
  }
}

// ── Performance Metrics ────────────────────────────────────────────────────────

export async function collectMetrics(vaultId: string, operation: string, duration: number, metadata?: Record<string, unknown>): Promise<void> {
  const startTime = Date.now();
  
  // Simulate graph rendering for node count
  const files = await listFiles(vaultId);
  const nodeCount = files.filter((f: any) => f.type === 'file' && f.name.endsWith('.md')).length;
  await new Promise(resolve => setTimeout(resolve, 10)); // Simulate 10ms render
  
  const logs: MetricLog[] = [];
  logs.push({
    timestamp: new Date().toISOString(),
    vaultId,
    operation,
    duration: 10,
    metadata: { nodeCount }
  });
  
  // In production, this would append to a metrics file or database
  console.log('[Metrics]', JSON.stringify(logs));
}
