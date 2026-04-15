# Fedus et al. Switch Transformers (2022)

**Summary**: Introduces the Switch Transformer, a simplified and scalable Mixture-of-Experts (MoE) architecture that can be scaled to models with over a trillion parameters.
**Source Context**: *The Journal of Machine Learning Research*, 23(1), 2022.

---

## Contribution
This work simplifies and improves upon the classic [[concepts/mixture-of-experts.md]] layer. The key simplification is the "Switch" routing strategy: instead of routing tokens to a Top-K set of experts, it routes each token to **a single expert** (Top-1). This reduces routing computation and communication costs while maintaining model quality [Source: [90]].

The paper demonstrates that these models can be scaled efficiently to over a trillion parameters, achieving significant speedups over dense T5 baselines of comparable quality. It also addresses challenges in training MoE models, such as load balancing (ensuring all experts receive a roughly equal number of tokens) and communication costs in distributed settings.

## Impact
Switch Transformers popularized a highly efficient and practical form of sparsity for scaling language models. The design principles influenced subsequent large-scale sparse models and contributed to the feasibility of trillion-parameter architectures [[entities/pangu-sigma-model.md]].