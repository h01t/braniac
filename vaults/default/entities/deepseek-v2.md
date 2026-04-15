# DeepSeek-V2

**Summary**: A mixture-of-experts (MoE) large language model that introduces Multi-Head Latent Attention (MLA), an efficient attention mechanism that compresses the KV cache to achieve significantly faster inference.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Core Innovation: MLA
The defining feature of DeepSeek-V2 is **Multi-Head Latent Attention ([[concepts/multi-head-latent-attention.md]])**. MLA compresses the standard per-head Key-Value (KV) cache—which scales with sequence length—into a fixed-size latent vector. This dramatically reduces the memory footprint and bandwidth required during autoregressive generation (Source: Comprehensive Overview of LLMs.pdf).

## Performance and Architecture
*   **Efficiency Gain**: Due to MLA, DeepSeek-V2 achieves a **5.76 times faster inference throughput** compared to its predecessor, the original DeepSeek model.
*   **Attention Performance**: The source states that MLA achieves better performance than standard multi-head attention (MHA) and other efficient variants like grouped-query attention (GQA) and multi-query attention (MQA).
*   **MoE Design**: DeepSeek-V2 is also a [[concepts/mixture-of-experts.md]] model, contributing to its overall efficiency and capacity (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/multi-head-latent-attention.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/key-value-cache.md]]