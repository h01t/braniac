# Claude Opus 4.7

**Summary**: The most capable generally available Claude model from Anthropic, designed for complex reasoning, agentic coding, and long-horizon tasks.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Model Overview
Claude Opus 4.7 is Anthropic's most capable generally available model as of its launch. It is designed to excel at long-horizon agentic work, knowledge work, vision tasks, and memory tasks (Source). The model supports a 1M token context window, 128k max output tokens, [[concepts/adaptive-thinking.md]], and the same platform features as its predecessor, Claude Opus 4.6 (Source).

## Key Features and Improvements
The model introduces several new capabilities and improvements over previous versions.

### High-Resolution Vision
Claude Opus 4.7 is the first Claude model with high-resolution image support, increasing the maximum resolution to 2576px (3.75MP) from a previous limit of 1568px (1.15MP) (Source). This is intended to improve performance on vision-heavy workloads, particularly for computer use and document understanding. The model also features 1:1 coordinate mapping to pixels, eliminating the need for scale-factor math (Source). Improvements are noted in low-level perception (pointing, measuring, counting) and image localization (Source).

### New Effort Level
A new `xhigh` [[concepts/effort-level.md]] is introduced for coding and agentic use cases (Source). The documentation recommends using a minimum of `high` effort for most intelligence-sensitive tasks (Source).

### Task Budgets (Beta)
The model introduces [[concepts/task-budget.md]] as a beta feature. A task budget provides the model with an advisory token allowance for a full agentic loop, including thinking, tool calls, and final output (Source). The model sees a running countdown and uses it to prioritize work. The minimum value for a task budget is 20k tokens (Source). This is distinct from the hard per-request cap of `max_tokens` (Source).

## Breaking Changes
These changes apply to the Messages API.

### Thinking Mode Changes
Extended thinking budgets are removed. Setting `thinking: {"type": "enabled", "budget_tokens": N}` will return an error (Source). [[concepts/adaptive-thinking.md]] is now the only thinking-on mode and is off by default; it must be explicitly enabled (Source).

### Parameter Removal
Setting `temperature`, `top_p`, or `top_k` to any non-default value will return a 400 error (Source). The recommended migration path is to omit these parameters and use prompting to guide behavior (Source).

### Thinking Content Omission
Thinking content is omitted from the response by default to improve latency (Source). To stream reasoning to users, the `display` field must be set to `"summarized"` (Source).

### Updated Tokenizer
Claude Opus 4.7 uses a new tokenizer that may use 1x to 1.35x as many tokens for text processing compared to Claude Opus 4.6 (Source). This affects the `/v1/messages/count_tokens` endpoint (Source).

## Capability Improvements
The model shows meaningful gains in specific areas.

### Knowledge Work
Improvements are noted in tasks requiring visual self-verification, such as .docx redlining, .pptx editing, and chart/figure analysis using image-processing libraries (Source).

### Memory
The model is better at writing and using file-system-based memory, such as maintaining scratchpads or structured memory stores across agent turns (Source).

### Vision
Beyond high-resolution support, improvements are noted in low-level perception and image localization (Source).

## Behavior Changes
The model exhibits several behavioral shifts that may require prompt updates.
* **More literal instruction following**, especially at lower effort levels (Source).
* **Response length calibrates to perceived task complexity** (Source).
* **Fewer tool calls by default**, using reasoning more; raising effort increases tool usage (Source).
* **More direct, opinionated tone** with less validation-forward phrasing and fewer emoji (Source).
* **More regular progress updates** during long agentic traces (Source).
* **Fewer subagents spawned by default** (Source).
* **Real-time cybersecurity safeguards** may lead to refusals for prohibited or high-risk topics (Source).

## Related pages
- [[concepts/adaptive-thinking.md]]
- [[concepts/effort-level.md]]
- [[concepts/task-budget.md]]
- [[concepts/high-resolution-vision.md]]
- [[concepts/model-migration.md]]
- [[sources/whats-new-claude-opus-4-7-docs.md]]