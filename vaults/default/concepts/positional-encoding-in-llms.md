# Positional Encoding in LLMs

**Summary**: A transformer building block for representing token order; its optimal form for LLMs is contested, with different models showing preferences for ALiBi or rotary encodings.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Positional encoding affects the performance and training stability of LLMs, but there is no consensus in the literature on the best approach [Source: Comprehensive Overview of LLMs.pdf].

*   **ALiBi**: The model [[entities/bloom.md]] finds that ALiBi outperforms learned and rotary positional encodings [Source: Comprehensive Overview of LLMs.pdf].
*   **Rotary**: Conversely, **[[entities/glm-130b.md]]** identifies rotary positional encoding as being better than ALiBi [Source: Comprehensive Overview of LLMs.pdf].

This represents a clear contradiction in findings between different major models.

## Related pages
- [[entities/bloom.md]]
- [[entities/glm-130b.md]]