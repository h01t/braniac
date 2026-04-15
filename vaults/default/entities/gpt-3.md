# GPT-3

**Summary**: A large-scale autoregressive model with 175B parameters, showing that performance improves with scale and is competitive with fine-tuned models.
**Source Context**: Comprehensive Overview of LLMs.pdf, Batch 2 of 15.

---

GPT-3 is a prominent LLM with these characteristics:

- **Architecture**: Similar to GPT-2 but with dense and sparse attention layers, inspired by the Sparse Transformer [Source: Comprehensive Overview of LLMs.pdf].

- **Training**: Uses larger batch sizes with lower learning rates, determined by gradient noise scale for efficient training [Source: Comprehensive Overview of LLMs.pdf].

- **Performance**: With 175B parameters, it demonstrates that scaling model size leads to better performance, often matching fine-tuned models on various tasks [Source: Comprehensive Overview of LLMs.pdf].

GPT-3 exemplifies [[concepts/scaling-laws.md]] and influences later models like [[entities/gpt-neox-20b.md]].

## Related pages
- [[concepts/scaling-laws.md]]
- [[entities/gpt-neox-20b.md]]