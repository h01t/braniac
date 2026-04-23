# Thinking Content Omission

**Summary**: A default behavior in Claude Opus 4.7 where the model's internal reasoning content is not included in the API response unless explicitly requested.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## Behavior Change
Starting with Claude Opus 4.7, the content of thinking blocks is omitted from the API response by default (Source). Thinking blocks still appear in the response stream, but their `thinking` field will be empty unless the caller opts in (Source). This is a silent change that slightly improves response latency (Source).

## User Impact
For products that stream reasoning to users, the new default will manifest as a long pause before output begins, with no visible progress during thinking (Source).

## Opting Back In
To restore the visibility of thinking content, the `display` field within the `thinking` configuration must be set to `"summarized"` (Source). The configuration change is:
```python
thinking = {
    "type": "adaptive",
    "display": "summarized",  # or "omitted" (default)
}
```
(Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/adaptive-thinking.md]]