# Mixture of Experts (MoE)

**Summary**: A neural network architecture where the model consists of multiple "expert" sub-networks, and a routing mechanism determines which experts process each input token, enabling massive model capacity with sparse, efficient computation.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Core Concept
A Mixture of Experts (MoE) layer replaces a standard dense feed-forward network in a transformer with multiple independent feed-forward networks (the "experts"). For each input token, a routing function (often a learned gating network) selects a small subset of these experts (e.g., 2 out of 8 or 128) to process that token. The outputs of the selected experts are then combined.

## Purpose and Benefits
The primary advantage of MoE is **efficiency**. It allows a model to have a very large total number of parameters (high capacity) while keeping the computational cost per token low because only a fraction of the parameters are active during a forward pass. This is known as **sparse activation**.

## Examples of MoE LLMs
The document mentions several LLMs utilizing MoE architectures:
*   **Mixtral8x22b**: Uses 8 experts, routing each token to 2 experts per layer.
*   **Snowflake Arctic**: A hybrid dense/MoE model with 128 experts, activating only 2 per token alongside a 10B dense transformer.
*   **Grok-1**: A 314B parameter MoE model with 8 experts (2 active per token).
*   **Gemini-1.5**: Built as an MoE model on the findings of Gemini-1.
*   **DeepSeek-v2**: An MoE model that also introduces Multi-Head Latent Attention (MLA).

## Related Insights
*   The [[entities/glam.md]] model found that model capacity could be maintained at reduced computation by replacing feed-forward layers with MoE layers.
*   The [[entities/pangu-σ.md]] model uses a variant called Random Routed Experts (RRE).

## Related pages
- [[concepts/sparse-activation.md]]
- [[entities/mixtral8x22b.md]]
- [[entities/snowflake-arctic.md]]
- [[entities/grok.md]]