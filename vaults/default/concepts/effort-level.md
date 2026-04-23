# Effort Level

**Summary**: An API parameter that allows tuning of Claude's intelligence versus token spend, trading capability for speed and cost.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Overview
The `effort` parameter is a feature of the Claude API that lets developers balance the model's cognitive expenditure against the speed and cost of a request (Source). Higher effort levels generally yield more capable reasoning and tool use but consume more tokens and time (Source).

## Levels in Claude Opus 4.7
Claude Opus 4.7 introduces a new `xhigh` effort level (Source). The documentation provides per-level guidance:
* **`xhigh`**: Recommended for coding and agentic use cases (Source).
* **`high`**: A minimum recommended level for most intelligence-sensitive use cases (Source).

## Interaction with Other Features
The effort level is configured within the `output_config` of an API request and works in conjunction with features like [[concepts/adaptive-thinking.md]] (Source). For agentic tasks, raising the effort level increases tool usage (Source). Claude Managed Agents handles effort automatically (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/adaptive-thinking.md]]
- [[concepts/task-budget.md]]