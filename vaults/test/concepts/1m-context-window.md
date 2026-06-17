# 1 Million Token Context Window

**Summary**: A context window of one million tokens allows Claude Opus 4.8 to process and reason over extremely long documents, conversations, or codebases in a single session.
**Source Context**: https://www.anthropic.com/claude/opus

---

The 1M context window enables [[entities/claude-opus-4-8.md]] to handle large-scale tasks such as analyzing entire codebases, reviewing lengthy legal documents, or maintaining coherent long-running agent sessions. A token is a unit of text (roughly 0.75 words in English), so 1M tokens corresponds to about 750,000 words—equivalent to several long books.

This capacity is paired with [[concepts/adaptive-thinking.md]] and the [[concepts/hybrid-reasoning-model.md]], allowing the model to retrieve and reason over information across the full context without losing track of earlier content. The context window is a differentiator from smaller models (which have lower limits) and is critical for enterprise workflows that involve multi-day projects with persistent state.

## Related pages
- [[entities/claude-opus-4-8.md]]
- [[concepts/adaptive-thinking.md]]
- [[concepts/hybrid-reasoning-model.md]]