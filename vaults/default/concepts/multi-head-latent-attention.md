# Multi-Head Latent Attention (MLA)

**Summary**: An efficient attention mechanism introduced in DeepSeek-v2 that compresses the Key-Value (KV) cache into a latent vector, significantly reducing inference memory and cost while maintaining performance.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Purpose and Innovation
Multi-Head Latent Attention (MLA) was designed to address the high memory and computational cost of the Key-Value (KV) cache during autoregressive inference in large language models. The standard approach stores a KV cache for each token and attention head, which grows linearly with sequence length.

MLA's core innovation is to **compress the per-head KV cache into a single, shared latent vector**. This drastic reduction in the size of the cached state leads to much more efficient inference.

## Performance
According to the source, MLA implemented in [[entities/deepseek-v2.md]] achieved better performance than standard Multi-Head Attention (MHA) and other efficient variants like Grouped Query Attention (GQA) and Multi-Query Attention (MQA). This efficiency translated to a reported **5.76 times faster inference throughput** compared to the original DeepSeek model.

## Related pages
- [[entities/deepseek-v2.md]]
- [[concepts/efficient-attention.md]]
- [[concepts/kv-cache.md]]