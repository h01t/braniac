# Architecture and Workflow

This document is the technical companion to [project-overview.md](./project-overview.md). It focuses on how the system is structured, how knowledge moves through the application, and how vault integrity is maintained over time.

## High-Level Architecture

Braniac uses a local-first **Tauri 2 desktop** architecture: a React UI calls Rust Tauri commands, which orchestrate vault I/O, AI providers, `qmd` indexing, and graph layout in `braniac-core`.

```mermaid
flowchart LR
    U["User"] --> UI["React UI"]
    UI --> CMD["Tauri commands"]
    CMD --> CORE["braniac-core"]
    CORE --> EXT["grapper extraction"]
    CORE --> LLM["Provider-configurable LLM"]
    CORE --> QMD["qmd index"]
    CORE --> VAULT["Git-backed markdown vaults"]
    VAULT --> QMD
    QMD --> UI
```

### Core Components

- `apps/desktop/src/`: React UI (graph, ingest, search, lint modal, settings)
- `apps/desktop/src-tauri/src/commands.rs`: Tauri command surface
- `crates/braniac-core/src/vault.rs`: filesystem and Git vault operations
- `crates/braniac-core/src/jobs.rs`: ingest and lint job orchestration
- `crates/braniac-core/src/index.rs`: SQLite metadata + `qmd` integration
- `crates/braniac-core/src/extract.rs`: local `grapper` integration

## Ingestion Workflow

The ingest path turns raw input into markdown files that can be searched, linked, and versioned.

```mermaid
sequenceDiagram
    participant User
    participant UI as Ingest UI
    participant API as /api/ingest
    participant Extract as grapper
    participant Chunk as chunkText
    participant Model as LLM
    participant Parse as XML-like parser
    participant Vault as Git-backed vault
    participant Index as qmd update

    User->>UI: Submit text, URL, or PDF
    UI->>CMD: job_start_ingest
    CMD->>Extract: prepare_source (grapper when needed)
    Extract-->>CMD: text
    CMD->>Model: INGEST_SYSTEM_PROMPT + source
    Model-->>CMD: file blocks
    CMD->>Parse: parse_file_tags
    Parse-->>Vault: apply_batch (single commit)
    CMD->>Index: rebuild_with_vaults (warning if failed)
```

## Search and Navigation Workflow

Graph navigation and semantic search are designed to complement each other rather than compete.

```mermaid
flowchart LR
    Q["Search query"] --> CMD["search_query command"]
    CMD --> QMD["qmd query"]
    QMD --> R["Ranked snippets"]
    R --> UI["SearchBar / GraphView"]
    UI --> N["Open node or related page"]
    N --> CMD2["document_read"]
    CMD2 --> M["Markdown editor with wikilink navigation"]
```

The graph is generated directly from stored markdown files by scanning `[[wikilinks]]`, which means the visualization and the stored knowledge structure stay aligned.

## Mint and Lint Workflow

The "Mint & Lint" flow is intentionally human-reviewed. The model proposes changes, but the user approves them before they are written back to the vault.

```mermaid
flowchart TD
    Start["Trigger lint from sidebar"] --> Scan["Read markdown files from active vault"]
    Scan --> Analyze["LLM structural analysis"]
    Analyze --> Report["Generate report + fix proposals"]
    Report --> Review["Review diffs in modal"]
    Review -->|Approve| Apply["Apply changes and commit"]
    Review -->|Reject| End["Close without changes"]
    Apply --> Refresh["Refresh qmd index and UI state"]
```

![Mint & Lint interface](../img/lint_and_mint.png)

## Data Model and Vault Layout

Each vault is a local directory with its own Git history. The current implementation uses lightweight folder conventions rather than a database schema.

| Folder | Purpose |
|---|---|
| `concepts/` | conceptual or thematic pages |
| `entities/` | people, companies, models, tools, institutions |
| `sources/` | source-origin pages and extraction anchors |
| `events/` | notable time-bounded items |
| root files | overview documents such as `index.md`, `glossary.md`, `log.md` |

## UI Reference

![Landing page](../img/landing_page.png)

![Node detail panel](../img/node-overview.png)

![EvalOps commit history](../img/evalops.png)

## Implementation Notes

- The app supports multiple vaults and persists the active vault in local storage.
- Ingest and lint models are configurable through the Settings page.
- The repository includes sample vaults to make the demo immediately inspectable.
- Lint caching is used to skip previously healthy files when possible.

## Known Boundaries

- The system is single-user and local-first by design.
- Extraction and indexing rely on local CLI availability.
- AI-generated knowledge is reviewable, but not guaranteed correct.
- The current graph is optimized for explorable knowledge artifacts, not for very large collaborative deployments.
