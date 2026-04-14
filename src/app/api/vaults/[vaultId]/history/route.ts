import { NextResponse } from 'next/server';
import { getHistory } from '@/lib/vaultManager';

export async function GET(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const history = await getHistory(vaultId);
  return NextResponse.json({ history });
}
