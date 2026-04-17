import { deepseek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';
import { readSettings, DEFAULT_SETTINGS } from './config';

type ModelInstance = ReturnType<typeof deepseek> | ReturnType<typeof openai>;

let cachedSettings = DEFAULT_SETTINGS;
let cachedIngestModel: ModelInstance = deepseek(DEFAULT_SETTINGS.ingestModel);
let cachedLintModel: ModelInstance = deepseek(DEFAULT_SETTINGS.lintModel);

function createModel(provider: string, modelId: string): ModelInstance {
  if (provider === 'openai') return openai(modelId);
  return deepseek(modelId);
}

export async function getIngestModel(): Promise<ModelInstance> {
  const settings = await readSettings();
  if (settings.ingestProvider !== cachedSettings.ingestProvider || settings.ingestModel !== cachedSettings.ingestModel) {
    cachedSettings = settings;
    cachedIngestModel = createModel(settings.ingestProvider, settings.ingestModel);
  }
  return cachedIngestModel;
}

export async function getLintModel(): Promise<ModelInstance> {
  const settings = await readSettings();
  if (settings.lintProvider !== cachedSettings.lintProvider || settings.lintModel !== cachedSettings.lintModel) {
    cachedSettings = settings;
    cachedLintModel = createModel(settings.lintProvider, settings.lintModel);
  }
  return cachedLintModel;
}
