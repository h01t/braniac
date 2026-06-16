# Effort

**Summary**: The effort parameter controls the depth of adaptive thinking on Claude Fable 5 and Claude Mythos 5, allowing users to manage reasoning cost and performance.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5

---

Effort is used to adjust how much reasoning the model performs when [[concepts/adaptive-thinking.md]] is active (always on for [[entities/claude-fable-5.md]] and [[entities/claude-mythos-5.md]]). It is a supported feature at launch and replaces the ability to disable thinking.

Effort levels determine the depth of the adaptive thinking process. More effort means more thorough reasoning but higher cost and latency; less effort trades depth for speed and lower cost.

Effort is set via the API parameter and is one of the key ways to optimize integration with these models.

## Related pages
- [[concepts/adaptive-thinking.md]]
- [[entities/claude-fable-5.md]]
- [[entities/claude-mythos-5.md]]