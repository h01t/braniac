const locks: Map<string, Promise<void>> = new Map();

export async function withVaultLock<T>(vaultId: string, fn: () => Promise<T>): Promise<T> {
  const previous = locks.get(vaultId) || Promise.resolve();
  let resolve: () => void;
  const turn = new Promise<void>((r) => { resolve = r; });
  locks.set(vaultId, turn);

  try {
    await previous;
    return await fn();
  } finally {
    resolve!();
    if (locks.get(vaultId) === turn) {
      locks.delete(vaultId);
    }
  }
}
