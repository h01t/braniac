# DeepSeek-V2

**Summary**: A mixture-of-experts (MoE) model that introduces Multi-Head Latent Attention (MLA) to drastically reduce inference costs, achieving 5.76x faster throughput than its predecessor.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture and Innovations
DeepSeek-V2 is built as a [[concepts/mixture-of-experts.md]] (MoE) model, following the scaling research of the original [[entities/deepseek.md]]. Its primary technical innovation is **Multi-Head Latent Attention (MLA)** [[concepts/multi-head-latent-attention.md]].

**MLA** works by compressing the Key-Value (KV) cache—a major memory bottleneck during autoregressive inference—into a compact latent vector. This is a departure from standard attention mechanisms that maintain a separate KV cache for each token and attention head.

## Performance Gains
The implementation of MLA allowed DeepSeek-V2 to achieve significantly more efficient inference. The source reports that MLA outperformed standard Multi-Head Attention (MHA) and other efficient attention methods like Grouped Query Attention (GQA) and Multi-Query Attention (MQA). The overall result was a **5.76 times faster inference throughput** compared to the first DeepSeek model.

## Related pages
- [[concepts/multi-head-latent-attention.md]]
- [[concepts/mixture-of-experts.md]]
- [[entities/deepseek.md]]