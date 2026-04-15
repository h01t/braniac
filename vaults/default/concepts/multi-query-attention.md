# Multi-Query Attention

**Summary**: An attention variant that shares key and value attention heads across all heads in a block, reducing memory usage and speeding up autoregressive decoding.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

In Multi-Query Attention (MQA), the key and value attention heads are shared across the transformer block, while query heads are projected independently as usual [Source: Comprehensive Overview of LLMs.pdf]. This design reduces memory usage and speeds up sampling during autoregressive decoding. No performance degradation has been observed with this change, and it enables more efficient training with larger batch sizes.

It is used in models like [[entities/palm.md]] and CodeGen [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/palm.md]]