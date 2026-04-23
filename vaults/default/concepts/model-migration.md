# Model Migration

**Summary**: The process and considerations for updating applications from previous Claude models to Claude Opus 4.7.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Key Breaking Changes
Migrating to Claude Opus 4.7 involves addressing several breaking changes in the Messages API:
1.  **Removal of Extended Thinking Budgets**: The `thinking` parameter can no longer use `{"type": "enabled", "budget_tokens": N}`. Use `{"type": "adaptive"}` instead (Source).
2.  **Removal of Sampling Parameters**: Setting `temperature`, `top_p`, or `top_k` to any non-default value will return a 400 error. Omit these parameters and use prompting (Source).
3.  **Thinking Content Omission**: By default, thinking content is not returned. Set `display: "summarized"` in the thinking config if needed (Source).
4.  **Updated Token Counting**: The new tokenizer may use up to ~35% more tokens for the same text. Adjust `max_tokens` parameters accordingly (Source).

## Behavioral Adjustments
Prompt updates may be required due to [[concepts/behavior-changes-claude-opus-4-7.md]], including more literal instruction following, calibrated response length, and a more direct tone (Source). Scaffolding added for interim status messages or subagent control may need to be removed or adjusted (Source).

## Automated Migration
For users of Claude Code or the Agent SDK, the Claude API skill can apply these migration steps to a codebase automatically (Source). A full migration checklist is provided in the dedicated migration guide (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/adaptive-thinking.md]]
- [[concepts/thinking-content-omission.md]]
- [[concepts/behavior-changes-claude-opus-4-7.md]]