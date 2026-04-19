/**
 * GET /api/vaults
 * 
 * @description Lists all available vaults in the workspace.
 * @returns { vaults: Array<{id, path, createdAt}> } - Array of vault metadata
 * 
 * @example
 * ```bash
 * curl http://localhost:3000/api/vaults
 * ```
 */

/**
 * POST /api/vaults
 * 
 * @description Creates a new vault with the specified identifier.
 * @param vaultId - Unique identifier for the new vault
 * @returns { success: boolean, vaultId: string, path: string } - Success flag, vault ID, and file path
 * 
 * @example
 * ```bash
 * curl -X POST http://localhost:3000/api/vaults \
 *   -H "Content-Type: application/json" \
 *   -d '{"vaultId":"my-knowledge"}'
 * ```
 */
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
