import { deepseek } from '@ai-sdk/deepseek';

const INGEST_MODEL = process.env.INGEST_MODEL || 'deepseek-reasoner';
const LINT_MODEL = process.env.LINT_MODEL || 'deepseek-chat';

export const ingestModel = deepseek(INGEST_MODEL);
export const lintModel = deepseek(LINT_MODEL);
