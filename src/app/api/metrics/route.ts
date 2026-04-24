import { NextResponse } from 'next/server';
import { getErrorMessage } from '@/lib/errors';
import { listFiles } from '@/lib/vaultManager';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vaultId = searchParams.get('vaultId') || 'default';
  const files = await listFiles(vaultId);
  const nodeCount = files.filter((file) => file.path.endsWith('.md')).length;

  try {
    const startTime = Date.now();
    const vaultFiles = await listFiles(vaultId);
    const vaultSize = vaultFiles.length;
    await new Promise(resolve => setTimeout(resolve, 10)); // Simulate graph rendering
    const graphRenderTime = Date.now() - startTime;

    const logs: MetricLog[] = [];
    logs.push({
      timestamp: new Date().toISOString(),
      vaultId,
      operation: 'graph-render',
      duration: graphRenderTime,
      metadata: { nodeCount, vaultSize },
    });

    return NextResponse.json({ logs });
  } catch (error: unknown) {
    console.error('Metrics collection failed:', error);
    return NextResponse.json({ error: 'Failed to collect metrics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<MetricLog>;
    const vaultId = body.vaultId || 'default';
    const operation = body.operation || 'unknown';
    const duration = typeof body.duration === 'number' ? body.duration : 0;
    const metadata = body.metadata ?? {};

    const log: MetricLog = {
      timestamp: new Date().toISOString(),
      vaultId,
      operation,
      duration,
      metadata,
    };

    // In a real implementation, this would write to a database or file
    // For now, we'll just log to console
    console.log(`[Metrics] ${log.timestamp} ${vaultId}:${log.operation} (${log.duration}ms)`, metadata);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Metrics logging failed:', error);
    return NextResponse.json({ error: getErrorMessage(error, 'Failed to log metric') }, { status: 500 });
  }
}
