# PanGu-Σ

**Summary**: A trillion-scale autoregressive model that extends PanGu-α using Random Routed Experts (RRE), a sparse architecture that allows for efficient task-specific sub-models and reduces catastrophic forgetting.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture and Scaling
PanGu-Σ is an autoregressive model scaled to a trillion parameters. It builds upon PanGu-α but introduces a novel sparse architecture called **Random Routed Experts (RRE)** [[concepts/random-routed-experts.md]]. RRE is similar to [[concepts/mixture-of-experts.md]] but differs in its second-level routing mechanism, where tokens are randomly assigned to experts within a domain instead of using a learned gating function.

The model uses a hybrid activation pattern:
*   **Shared Bottom Layers**: The lower transformer layers are densely activated and shared across all input domains.
*   **Sparse Top Layers**: The upper layers are sparsely activated based on the input's domain, following the RRE pattern.

## Key Benefits and Insights
This architectural design provides significant advantages for large-scale model deployment and learning:
*   **Extraction of Task-Specific Models**: Allows practitioners to extract a smaller, domain-specific sub-model for efficient deployment, maintaining performance close to the full model.
*   **Mitigates Catastrophic Forgetting**: The RRE structure helps reduce catastrophic forgetting effects, making it more suitable for continual learning settings where the model needs to learn new tasks without forgetting old ones.
*   **Sparse Model Benefit**: Demonstrates that sparse models can provide the benefits of massive parameter counts at a significantly lower computational cost during inference.

## Related pages
- [[concepts/random-routed-experts.md]]
- [[concepts/sparse-activation.md]]
- [[concepts/mixture-of-experts.md]]