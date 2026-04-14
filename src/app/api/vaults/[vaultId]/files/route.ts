import { NextResponse } from 'next/server';
import { listFiles } from '@/lib/vaultManager';

export async function GET(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '';
  
  const files = await listFiles(vaultId, path);
  return NextResponse.json({ files });
}
