# Ding et al., LongNet (2023)

**Summary**: Proposes LongNet, a Transformer variant that scales the sequence length to over 1 billion tokens without sacrificing performance on shorter sequences, using dilated attention.
**Source Context**: Ding, J., Ma, S., Dong, L., et al. *LongNet: Scaling transformers to 1,000,000,000 tokens*, arXiv:2307.02486 (2023). From Comprehensive Overview of LLMs.pdf (citation 188)

---

LongNet addresses a fundamental challenge in scaling the [[concepts/transformer-architecture.md]]: the quadratic complexity of self-attention with respect to sequence length. The paper introduces "dilated attention," which expands the attentive field exponentially as the distance between tokens grows, allowing it to handle extremely long sequences efficiently.

This work is a significant contribution to [[concepts/long-context-memory.md]], providing a potential architectural path toward models that can process entire books or long-term user histories in a single context window.

## Related pages
- [[concepts/long-context-memory.md]]
- [[concepts/transformer-architecture.md]]
- [[entities/ding-j.md]]