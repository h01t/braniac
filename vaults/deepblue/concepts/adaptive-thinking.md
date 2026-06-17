# Adaptive Thinking

**Summary**: Adaptive thinking is the only thinking mode on Claude Fable 5 and Claude Mythos 5. It is always enabled and cannot be turned off. Raw chain‑of‑thought is never returned.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5

---

Adaptive thinking applies whenever the `thinking` parameter is unset. `thinking: {"type": "disabled"}` is not supported. Use the [[concepts/effort.md]] parameter to control the depth of reasoning.

**Thinking output**:

- The raw chain‑of‑thought is never returned.
- The `thinking.display` setting controls what is included in thinking blocks:
  - `"summarized"`: returns a readable summary of the reasoning.
  - `"omitted"` (default): returns thinking blocks with an empty `thinking` field.
- In multi‑turn conversations on the same model, pass thinking blocks back unchanged. See the [thinking output guide](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking#thinking-output-on-claude-fable-5-and-claude-mythos-5) for cross‑model handling.

**Applicability**: Claude Fable 5 and Claude Mythos 5 only. Earlier models (Opus, Sonnet, Haiku) use a different thinking implementation.

## Related pages
- [[entities/claude-fable-5.md]]
- [[entities/claude-mythos-5.md]]
- [[concepts/effort.md]]