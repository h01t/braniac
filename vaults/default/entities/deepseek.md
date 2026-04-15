# DeepSeek

**Summary**: A research initiative that studied scaling laws for LLMs in detail, deriving optimal equations for model size, data, batch size, and learning rate given a compute budget, leading to the DeepSeek-v2 MoE model.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Scaling Laws Research
The DeepSeek research performed a detailed empirical study of LLM scaling laws. Experiments were conducted across 8 different compute budgets (from 1e17 to 3e20 FLOPs), testing ten different model/data scale combinations for each budget. The goal was to find the optimal configuration of model size (M), training data (D), batch size (B), and learning rate (η) for a given compute budget (C).

The derived optimal equations are:
*   Batch Size: \( B_{opt} = 0.2920 \cdot C^{0.3271} \)
*   Learning Rate: \( η_{opt} = 0.3118 \cdot C^{-0.1250} \)
*   Model Size: \( M_{opt} = M_{base} \cdot C^{a} \)
*   Data: \( D_{opt} = D_{base} \cdot C^{b} \)
Where \( M_{base} = 0.1715 \), \( D_{base} = 5.8316 \), \( a = 0.5243 \), \( b = 0.4757 \).

A key finding was that the optimal batch size should increase with compute budget, while the optimal learning rate should decrease.

## Model Evolution: DeepSeek-v2
Building on this research, **DeepSeek-v2** was developed as a [[concepts/mixture-of-experts.md]] (MoE) model. It introduced **Multi-Head Latent Attention (MLA)**, a technique that compresses the Key-Value (KV) cache into a latent vector to drastically reduce inference costs. MLA was reported to achieve better performance than standard Multi-Head Attention (MHA) and other efficient attention mechanisms like GQA and MQA, resulting in **5.76 times faster inference throughput** compared to the original DeepSeek model.

## Related pages
- [[concepts/scaling-laws.md]]
- [[concepts/mixture-of-experts.md]]
- [[concepts/multi-head-latent-attention.md]]