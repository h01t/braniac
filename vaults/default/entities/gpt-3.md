# GPT-3

**Summary**: A 175-billion parameter autoregressive language model that demonstrated the power of scale, showing that large models could be competitive with fine-tuned models on many tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Architecture & Training**: GPT-3 follows the GPT-2 architecture but incorporates dense and sparse attention patterns within its transformer layers, similar to the Sparse Transformer. It uses a next-token prediction (causal language modeling) objective. A key finding was that very large models could be trained effectively with larger batch sizes and a correspondingly lower learning rate. The model employed the "gradient noise scale" method to decide batch size during training.

**Key Findings & Impact**: The primary contribution of GPT-3 was demonstrating that performance across a wide range of NLP tasks improves predictably with model scale. With 175B parameters, it showed strong few-shot and zero-shot capabilities, often matching or exceeding the performance of smaller models that had been specifically fine-tuned for a task. This finding spurred significant investment and research into scaling LLMs.

**Related Models**: It is a direct successor to [[entities/gpt-2.md]] and a predecessor to models like [[entities/palm.md]] and [[entities/chinchilla.md]], which further explored scaling laws and architecture improvements.

## Related pages
- [[concepts/decoder-only-architectures.md]]
- [[concepts/scaling-laws.md]]
- [[concepts/in-context-learning.md]]
- [[entities/gpt-2.md]]
- [[entities/palm.md]]