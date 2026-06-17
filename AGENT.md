# Agent workflow (desktop)

Braniac compiles sources into a local Git-backed markdown knowledge vault using a Tauri desktop app.

## Active paths

| Area | Location |
|------|----------|
| React UI | `apps/desktop/src/` |
| Tauri commands | `apps/desktop/src-tauri/src/commands.rs` |
| Core logic | `crates/braniac-core/` |
| Shared types | `crates/braniac-types/` |
| Vault markdown | `vaults/<vault-id>/` |

## Ingest flow

1. User submits text, URL, or PDF from `IngestBar` / `SourceDialog`
2. Frontend calls `job_start_ingest` → `JobManager::run_ingest`
3. Source is extracted (`extract.rs`), sent to configured AI provider (`ai.rs`)
4. Provider output is parsed into document patches (`job_parsers.rs`)
5. Patches are applied in one batch commit (`vault.rs` `apply_batch`)
6. Index rebuild runs after success; failures surface as warnings

## Lint flow

1. `job_start_lint` → `JobManager::run_lint` builds a corpus from vault scans
2. Provider returns fix proposals parsed by `parse_lint_output`
3. User reviews fixes in `MintLintModal`
4. Approved fixes apply atomically via batch vault write

## Vault layout

```
vaults/<id>/
  concepts/
  entities/
  sources/
  events/
  papers/
  index.md
```

See [migration-from-nextjs.md](migration-from-nextjs.md) for the retired Next.js workflow.
