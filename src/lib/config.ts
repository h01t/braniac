import fs from 'fs/promises';
import path from 'path';

export interface AppSettings {
  ingestProvider: 'deepseek' | 'openai';
  ingestModel: string;
  lintProvider: 'deepseek' | 'openai';
  lintModel: string;
}

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

export const DEFAULT_SETTINGS: AppSettings = {
  ingestProvider: 'deepseek',
  ingestModel: 'deepseek-reasoner',
  lintProvider: 'deepseek',
  lintModel: 'deepseek-chat',
};

export async function readSettings(): Promise<AppSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function writeSettings(settings: AppSettings): Promise<void> {
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
}

export const AVAILABLE_MODELS = {
  deepseek: [
    { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner (R1)' },
    { id: 'deepseek-chat', name: 'DeepSeek Chat (V3)' },
  ],
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  ],
};
