# Encoder vs Decoder vs Encoder-Decoder Architectures

**Summary**: A comparison of fundamental LLM architectures, with a trend towards decoder-only models for both NLU and NLG, though encoder-decoder models with dynamic configurations show promise.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Traditionally, encoder-only models excelled at NLU tasks, decoder-only at NLG, and encoder-decoder at sequence-to-sequence tasks [Source: Comprehensive Overview of LLMs.pdf]. However, modern LLMs are primarily **decoder-only** (e.g., [[entities/gpt-3.md]], [[entities/palm.md]], [[entities/bloom.md]]) and show significant gains on both NLU and NLG tasks [Source: Comprehensive Overview of LLMs.pdf].

Contradicting this, T5 and UL2 found **encoder-decoder** models outperforming decoder-only ones [Source: Comprehensive Overview of LLums.pdf]. PaLM suggests increasing the size of decoder-only models can reduce this performance gap [Source: Comprehensive Overview of LLMs.pdf].

Recent approaches use **encoder-decoder architectures with mode-switching tokens** or multiple training objectives (e.g., CodeT5+) to activate components dynamically based on the task. This dynamic configuration may point to the future of LLM architectures [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/gpt-3.md]]
- [[entities/palm.md]]
- [[entities/bloom.md]]
- [[concepts/mode-switching.md]]