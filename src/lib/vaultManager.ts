import fs from 'fs/promises';
import path from 'path';
import { simpleGit, SimpleGit } from 'simple-git';

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
  const vaultPath = path.join(VAULTS_ROOT, vaultId);
  const filePath = path.join(vaultPath, filename);
  
  // Ensure nested directories exist if filename has them
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  
  await fs.writeFile(filePath, content, 'utf-8');
  
  const git: SimpleGit = simpleGit(vaultPath);
  await git.add(filename);
  await git.commit(commitMessage);
  
  return { success: true };
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
