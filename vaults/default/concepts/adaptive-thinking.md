# Adaptive Thinking

**Summary**: The only supported thinking-on mode in Claude Opus 4.7, which dynamically allocates thinking tokens based on task complexity.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Definition and Role
[[concepts/adaptive-thinking.md]] is a mode for the Claude model where the AI can perform internal reasoning before generating a final response. In Claude Opus 4.7, it is the *only* supported thinking-on mode, replacing the removed "extended thinking budgets" (Source). Internal evaluations by Anthropic indicated it reliably outperforms the previous extended thinking approach (Source).

## Configuration and Usage
In Claude Opus 4.7, adaptive thinking is **off by default**. To enable it, a request must explicitly set `thinking: {type: "adaptive"}` (Source). It is used in conjunction with the `effort` parameter in the output config (Source).

## Migration from Previous Models
For users migrating from Claude Opus 4.6, the configuration changes:
* **Before (Opus 4.6)**: `thinking = {"type": "enabled", "budget_tokens": 32000}`
* **After (Opus 4.7)**: `thinking = {"type": "adaptive"}` and `output_config = {"effort": "high"}` (Source).

Attempting to use the old extended thinking budget configuration in Claude Opus 4.7 will result in a 400 error (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/effort-level.md]]
- [[concepts/thinking-content-omission.md]]