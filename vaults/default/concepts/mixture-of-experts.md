# Mixture of Experts (MoE)

**Summary**: A neural network architecture design where the model contains multiple sub-networks ("experts"), and a routing mechanism directs each input token to a subset of these experts, enabling large model capacity with reduced computational cost per forward pass.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Core Concept
In a [[concepts/mixture-of-experts.md]] (MoE) layer, the standard dense feed-forward network (FFN) of a transformer block is replaced with multiple parallel FFNs (the experts). For each input token, a routing function (e.g., a gating network) selects a small number of experts (e.g., 2 out of 8 or 128) to process that token. The outputs from the selected experts are then combined. This design decouples model parameter count (which can be enormous) from computational cost, as only the parameters of the activated experts are used during inference (Source: Comprehensive Overview of LLMs.pdf).

## Benefits
*   **Massive Scale**: MoE allows the creation of models with hundreds of billions or trillions of parameters (e.g., Snowflake Arctic has 480B parameters) while keeping the active parameters per token relatively low (e.g., 17B for Arctic).
*   **Computational Efficiency**: By activating only a fraction of the total parameters for each token, training and inference FLOPs are significantly reduced compared to a dense model of equivalent size.
*   **Specialization**: Experts can potentially learn to specialize in different types of data or linguistic phenomena.

## Variants and Examples
*   **Standard MoE**: Used in models like **Mixtral8x22b** and **Grok-1**, where a learnable gating network routes tokens.
*   **Random Routed Experts (RRE)**: A variant used in **PanGu-Σ** where tokens are randomly routed to experts within a domain, rather than using a learned gate, which helps reduce [[concepts/catastrophic-forgetting.md]].
*   **Hybrid Dense/MoE**: Used in **Snowflake Arctic**, which places a large MoE layer in parallel with a dense transformer block.
*   **DeepSeek-v2** also utilizes an MoE architecture in combination with its novel [[concepts/multi-head-latent-attention.md]] (Source: Comprehensive Overview of LLMs.pdf).

## Challenges
*   **Training Instability**: Routing can be noisy and difficult to train.
*   **Load Balancing**: Ensuring all experts receive a roughly equal amount of training data is a common challenge.
*   **High Memory Footprint**: While compute-efficient, the entire large parameter set must still be stored in memory.

## Related pages
- [[concepts/random-routed-experts.md]]
- [[entities/mixtral8x22b.md]]
- [[entities/snowflake-arctic.md]]
- [[entities/grok-1.md]]
- [[entities/deepseek-v2.md]]