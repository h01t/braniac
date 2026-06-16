# Adaptive Thinking

**Summary**: Adaptive thinking is a feature of Claude Opus 4.8 that automatically adjusts the amount of compute or "thinking" applied to a task based on its complexity, enabling faster responses for simple queries and deeper reasoning for difficult ones.
**Source Context**: https://www.anthropic.com/claude/opus

---

Adaptive thinking allows [[entities/claude-opus-4-8.md]] to spend more time on hard problems and respond quickly to easy ones without manual configuration. This is a key component of the [[concepts/hybrid-reasoning-model.md]] used by Anthropic's frontier model. The approach is designed to optimize both performance and cost efficiency: simpler tasks consume fewer tokens, while complex tasks receive the compute necessary for high-quality output.

In practice, adaptive thinking manifests in use cases like production coding, where the model may take extra steps to validate its own work, or in agentic workflows where it must plan and iterate over multiple steps.

## Related pages
- [[entities/claude-opus-4-8.md]]
- [[concepts/hybrid-reasoning-model.md]]