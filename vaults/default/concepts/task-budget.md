# Task Budget

**Summary**: A beta feature that gives Claude an advisory token allowance for a full agentic loop, allowing it to self-moderate and prioritize work.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Definition and Purpose
A [[concepts/task-budget.md]] is a mechanism in Claude Opus 4.7 that provides the model with a rough estimate of tokens to target for completing an entire agentic task (Source). This budget encompasses thinking, tool calls, tool results, and the final output (Source). The model sees a running countdown and uses this information to scope its work and finish gracefully as the budget is consumed (Source).

## Implementation
To use task budgets, a beta header (`task-budgets-2026-03-13`) must be set, and the `task_budget` must be specified in the `output_config` (Source). The budget is defined as a `type` (e.g., "tokens") and a `total` value (Source). The minimum allowable task budget is 20,000 tokens (Source).

## Distinction from Max Tokens
A task budget is an **advisory cap** across the full agentic loop, of which the model is aware (Source). In contrast, `max_tokens` is a **hard per-request cap** on generated tokens, and the model is not aware of this limit (Source). Use a task budget when you want the model to self-moderate, and use `max_tokens` as a safety ceiling (Source).

## Use Case Guidance
Task budgets are recommended for workloads where scoping work to a token allowance is necessary (Source). For open-ended agentic tasks where quality is paramount, the documentation advises against setting a task budget (Source). If the budget is too restrictive, the model may complete the task less thoroughly or refuse it entirely (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/effort-level.md]]