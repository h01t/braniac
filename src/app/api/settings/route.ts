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
