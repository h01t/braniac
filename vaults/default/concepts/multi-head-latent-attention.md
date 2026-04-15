# Multi-Head Latent Attention (MLA)

**Summary**: An efficient attention mechanism that compresses the Key-Value (KV) cache into a latent vector, significantly reducing memory footprint and accelerating inference compared to standard multi-head attention.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Innovation
[[concepts/multi-head-latent-attention.md]] (MLA) is an attention mechanism introduced in the DeepSeek-v2 model. Its core innovation is the compression of the standard per-head Key-Value (KV) cache—which grows linearly with sequence length—into a single, fixed-size **latent vector**. This drastic reduction in the size of the cache directly lowers memory requirements and increases inference speed (Source: Comprehensive Overview of LLMs.pdf).

## Performance and Comparison
According to the source, MLA achieves better performance than standard [[concepts/multi-head-attention.md]] (MHA) and other efficient variants like [[concepts/grouped-query-attention.md]] (GQA) and [[concepts/multi-query-attention.md]] (MQA). The implementation in DeepSeek-v2 reportedly results in a **5.76 times faster inference throughput** compared to the previous DeepSeek model (Source: Comprehensive Overview of LLMs.pdf).

## Context
MLA is part of a broader research effort to develop more efficient transformer architectures that maintain high performance while reducing the computational and memory costs associated with long-context inference, which is critical for deploying large models at scale.

## Related pages
- [[concepts/multi-head-attention.md]]
- [[concepts/key-value-cache.md]]
- [[entities/deepseek-v2.md]]