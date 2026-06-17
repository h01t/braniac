# Historical: Next.js architecture (pre-migration)

This document preserves context from when Braniac was a Next.js App Router application. **It is not the current architecture.**

The desktop app replaced:

- `src/app/api/*` routes → Tauri commands in `apps/desktop/src-tauri/src/commands.rs`
- `src/lib/qmd.ts`, `src/lib/extractor.ts` → `crates/braniac-core/src/index.rs`, `extract.rs`
- Server-side vault access → `VaultResolver` in `crates/braniac-core/src/vault.rs`

For current documentation see [project-overview.md](project-overview.md) and [Architecture_and_Workflow.md](Architecture_and_Workflow.md).
