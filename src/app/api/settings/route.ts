/**
 * GET /api/settings
 * 
 * @description Retrieves current application settings and available models.
 * @returns { settings: AppSettings, availableModels: Array<{id, name, provider}> }
 * 
 * Settings include:
 * - ingestProvider: AI provider for ingestion
 * - ingestModel: Model ID for ingestion
 * - lintProvider: AI provider for linting
 * - lintModel: Model ID for linting
 * 
 * @example
 * ```bash
 * curl http://localhost:3000/api/settings
 * ```
 */

/**
 * POST /api/settings
 * 
 * @description Updates application settings. Partial updates supported.
 * @param body - Partial AppSettings object with fields to update
 * @returns { settings: AppSettings } - Updated settings
 * 
 * @example
 * ```bash
 * curl -X POST http://localhost:3000/api/settings \
 *   -H "Content-Type: application/json" \
 *   -d '{"ingestModel":"gpt-4"}'
 * ```
 */
import { NextResponse } from 'next/server';
import { readSettings, writeSettings, AVAILABLE_MODELS, AppSettings } from '@/lib/config';

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json({ settings, availableModels: AVAILABLE_MODELS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<AppSettings>;
    const current = await readSettings();
    const updated: AppSettings = {
      ingestProvider: body.ingestProvider || current.ingestProvider,
      ingestModel: body.ingestModel || current.ingestModel,
      lintProvider: body.lintProvider || current.lintProvider,
      lintModel: body.lintModel || current.lintModel,
    };
    await writeSettings(updated);
    return NextResponse.json({ settings: updated });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
