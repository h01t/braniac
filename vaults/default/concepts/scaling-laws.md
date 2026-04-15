# Scaling Laws in LLMs

**Summary**: Studies on how model performance scales with parameters, dataset size, and computational resources, following power-law relationships.
**Source Context**: Comprehensive Overview of LLMs.pdf, Batch 2 of 15.

---

Scaling laws investigate the optimal combination of model parameters, dataset size, and compute to predict performance improvements. Key insights include:

- Loss scales according to a power-law with model size, dataset size, and compute resources, suggesting larger models are more important than big data for better performance [Source: Comprehensive Overview of LLMs.pdf].

- Another variant indicates that model size and the number of training tokens should be scaled equally for compute-optimal training [Source: Comprehensive Overview of LLMs.pdf].

These laws guide the development of models like [[entities/gpt-3.md]] and [[entities/chinchilla.md]].

## Related pages
- [[concepts/training-objectives.md]]
- [[entities/gpt-3.md]]