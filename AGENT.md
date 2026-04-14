# AI Knowledge Compiler Agent Workflow

An automated, local-first knowledge base maintained by DeepSeek Reasoner.
This architecture implements an automated version of Karpathy's LLM Wiki pattern through a Next.js UI, accelerated ingestion tools, and semantic search.

## Purpose

This system is an automated, interlinked knowledge base for tracking and compiling research.
DeepSeek ingests inputs through the UI, chunks the data, outputs interlinked Markdown matrices, and generates a cohesive global state, while `qmd` handles live semantic mapping.

## Folder Structure

```
vaults/default/               -- Git-backed markdown pages maintained completely by DeepSeek
vaults/default/concepts/      -- Concept, topic, or entity pages
vaults/default/sources/       -- Auto-ingested raw data mapping files
vaults/default/index.md       -- Table of contents for the entire wiki
vaults/default/glossary.md    -- Definitions of key terms and concepts
vaults/default/log.md         -- Append-only record of all operations
```

Note: The `raw/` folder concept is handled natively in memory via High-Performance Rust `grapper` execution. The raw source is passed directly into the reasoning engine and discarded, while its facts are permanently compiled into `sources/`.

## Automated Ingest Workflow

When the user drops a PDF or URL into the Ingest UI:

1. The API natively extracts the data using `grapper`.
2. The server chunks the document into 3000-word batches and loops over them sequentially.
3. For **each batch**, DeepSeek evaluates the context and generates/updates files in `concepts/` and `sources/`.
4. After all batches finish, the API triggers a **Consolidation Pass**. DeepSeek reviews every path it just touched, and dynamically updates `index.md`, `glossary.md`, and `log.md`.
5. Finally, the system automatically runs `qmd embed` in the background to update the local Apple Metal-accelerated Llama GGUF vector embeddings for semantic search.

## Page Format

Every wiki page emitted by DeepSeek MUST follow this standard Markdown structure:

```markdown
# Page Title

**Summary**: One to two sentences describing this page.

**Source Context**: URL or Filename this knowledge was extracted from.

---

Main content goes here. Use clear headings and short paragraphs.

Link to related concepts using [[concepts/name.md]] syntax throughout the text for visual graph mapping.

## Related pages
- [[concepts/related-concept.md]]
```

## Citation Rules

- Every factual claim extracted must link back to its `sources/` origin node.
- If two sources disagree, note the contradiction explicitly in the concept document.

## Linting via EvalOps

When the user triggers `✨ Mint & Lint Vault` in the sidebar:
- DeepSeek scans the entire `vaults/default` directory.
- It identifies contradictions between nodes.
- It finds orphaned pages (no inbound links from other concepts).
- It flags outdated claims.
- It generates a detailed markdown report inside the modal.

## Agent System Rules

- Automatically categorize and output via `<file path="concepts/name.md">` XML tagging.
- Never write standard conversational text outside of the XML file blocks.
- Output filenames as lowercase with hyphens (e.g. `machine-learning.md`).
- Ensure every markdown file has bidirectional [[links]] to map the React Force Graph dynamically.
