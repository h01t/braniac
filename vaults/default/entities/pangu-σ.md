# PanGu-Σ

**Summary**: A trillion-parameter scale autoregressive model that extends a base architecture using Random Routed Experts (RRE), a sparse mixture-of-experts variant designed to reduce catastrophic forgetting and enable efficient task-specific sub-model extraction.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Architecture and Scaling
PanGu-Σ is an autoregressive model that scales up to a trillion parameters by employing **Random Routed Experts (RRE)**, a specialized form of [[concepts/mixture-of-experts.md]] architecture. Parameters are copied from a base model (PanGu-α) and extended with this sparse structure. The model features **densely activated bottom layers** that are shared across all domains, and **sparsely activated top layers** where tokens are randomly routed to experts within a specific domain (Source: Comprehensive Overview of LLMs.pdf).

## Key Features and Benefits
1.  **Reduces Catastrophic Forgetting**: The [[concepts/random-routed-experts.md]] design is highlighted for reducing [[concepts/catastrophic-forgetting.md]] effects, which is crucial for continual learning.
2.  **Enables Task-Specific Extraction**: The architecture allows for the extraction of smaller, domain-specific sub-models for deployment, which is computationally efficient while aiming to maintain performance close to the full model.
3.  **Sparse Efficiency**: It provides the benefits of a model with extremely high capacity (many parameters) at a lower computational cost per forward pass, as only a subset of experts is active (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/random-routed-experts.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/catastrophic-forgetting.md]]