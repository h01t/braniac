import { NextResponse } from 'next/server';
import { getDiff } from '@/lib/vaultManager';

export async function GET(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const { searchParams } = new URL(request.url);
  const hash = searchParams.get('hash');
  
  if (!hash) {
    return NextResponse.json({ error: 'hash is required' }, { status: 400 });
  }
  
  const diff = await getDiff(vaultId, hash);
  return NextResponse.json({ diff });
}
