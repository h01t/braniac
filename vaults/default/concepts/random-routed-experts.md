# Random Routed Experts (RRE)

**Summary**: A sparse model architecture similar to Mixture of Experts (MoE) where tokens are randomly routed to experts within a domain, used to enable trillion-scale models and reduce catastrophic forgetting.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition and Architecture
Random Routed Experts (RRE) is an architecture used in the [[entities/pangu-σ.md]] model to scale to a trillion parameters. It is similar to a standard [[concepts/mixture-of-experts.md]] (MoE) architecture but with a key distinction at the second level of routing: tokens are **randomly routed** to experts within a specific domain, rather than using a learnable gating network.

The PanGu-Σ model uses a hybrid design:
*   **Bottom Layers**: Densely activated and shared across all domains.
*   **Top Layers**: Sparsely activated according to the domain, using the RRE pattern.

## Advantages and Use Cases
The RRE approach provides several benefits:
1.  **Scalability**: Allows for the creation of extremely large (trillion-parameter) models by activating only a subset of experts per token.
2.  **Task-Specific Extraction**: Enables the extraction of a smaller, domain-specific sub-model for deployment, which is computationally efficient while maintaining performance similar to the full model.
3.  **Reduced Catastrophic Forgetting**: The random routing and domain-specific expert structure helps mitigate catastrophic forgetting effects, which is important for continual learning scenarios.

## Related pages
- [[entities/pangu-σ.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/sparse-activation.md]]