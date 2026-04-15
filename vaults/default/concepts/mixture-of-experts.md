# Mixture of Experts (MoE)

**Summary**: A sparse architecture that scales models to trillions of parameters by activating only a subset of "expert" networks per input, improving compute efficiency and suitability for continual learning.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

The Mixture of Experts (MoE) architecture enables scaling to trillions of parameters while remaining compute-efficient, as only a few experts are activated per computation [Source: Comprehensive Overview of LLMs.pdf]. For the same amount of data, MoE models can outperform dense models and require less computation during fine-tuning to achieve similar performance [Source: Comprehensive Overview of LLMs.pdf].

MoE architectures are less prone to catastrophic forgetting, making them well-suited for continual learning [Source: Comprehensive Overview of LLMs.pdf]. Furthermore, it is possible to extract smaller, hardware-friendly sub-models for downstream tasks without losing performance [Source: Comprehensive Overview of LLMs.pdf]. Models like GLaM and [[entities/pangu-.md]] use MoE architectures [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/pangu-.md]]
- [[concepts/sparse-vs-dense-models.md]]