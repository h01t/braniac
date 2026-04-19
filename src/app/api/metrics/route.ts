import { NextResponse } from 'next/server';
import { listFiles, readMarkdown } from '@/lib/vaultManager';

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
  
  const nodeCount = files.filter((f: any) => f.type === 'file' && f.name.endsWith('.md')).length;
  
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
      metadata: { nodeCount, vaultSize }
    });
    
    return NextResponse.json({ logs });
  } catch (err) {
    console.error('Metrics collection failed:', err);
    return NextResponse.json({ error: 'Failed to collect metrics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { vaultId, operation, duration, metadata } = await request.json();
    
    const log: MetricLog = {
      timestamp: new Date().toISOString(),
      vaultId,
      operation,
      duration,
      metadata
    };
    
    // In a real implementation, this would write to a database or file
    // For now, we'll just log to console
    console.log(`[Metrics] ${log.timestamp} ${vaultId}:${log.operation} (${log.duration}ms)`, metadata);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Metrics logging failed:', err);
    return NextResponse.json({ error: 'Failed to log metric' }, { status: 500 });
  }
}
