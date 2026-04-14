import { NextResponse } from 'next/server';
import { listVaults, initVault } from '@/lib/vaultManager';

export async function GET() {
  const vaults = await listVaults();
  return NextResponse.json({ vaults });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { vaultId } = body;
  
  if (!vaultId) {
    return NextResponse.json({ error: 'vaultId is required' }, { status: 400 });
  }
  
  const path = await initVault(vaultId);
  return NextResponse.json({ success: true, vaultId, path });
}
