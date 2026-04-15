# Parallel Attention

**Summary**: A transformer block architecture where the feed-forward and attention layers are parallel rather than sequential, reducing training time by approximately 15% without observed performance degradation.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

In this architectural variant, the feed-forward and attention layers are placed in parallel within a transformer block. This design has been shown to reduce training time by about 15% [Source: Comprehensive Overview of LLMs.pdf]. The literature reports no evidence of performance drop due to this change.

Notable models that use parallel attention include [[entities/palm.md]], [[entities/gpt-neox.md]], and CodeGen [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/palm.md]]
- [[entities/gpt-neox.md]]