# Scaling Laws

**Summary**: Empirical relationships that predict LLM performance improvements based on the scale of model parameters, dataset size, and computational resources.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Scaling laws are a crucial area of research for efficiently developing LLMs. They help predict how performance (measured as loss) improves as key factors are increased.

The source cites foundational work (Kaplan et al., 2020) showing that loss scales as a power-law with model size (parameters), dataset size, and compute budget. One finding from this study suggests that **increasing model size is more important than increasing dataset size** for better performance within a given compute budget.

A subsequent variant of the scaling law (Hoffmann et al., 2022, known as the "Chinchilla laws") suggests a different optimal balance. It proposes that **model size and the number of training tokens should be scaled equally**. This implies that under a fixed compute budget, training a somewhat smaller model on significantly more data can lead to better performance than training a very large model on less data. These two perspectives represent a key consideration in LLM development strategy.

## Related pages
- [[concepts/pre-training.md]]
- [[entities/chinchilla.md]]