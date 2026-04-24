# KV Cache Quantization

**Summary**: KV cache quantization compresses key/value embeddings stored in transformer models during autoregressive generation, reducing memory usage and inference latency.
**Source Context**: turboqaunt.pdf

---

The KV cache stores embeddings from previously generated tokens. Its size scales with model size and context length, becoming a bottleneck. TurboQuant applies online vector quantization to compress the KV cache with minimal quality loss. Experiments show absolute quality neutrality at 3.5 bits per channel and marginal degradation at 2.5 bits per channel.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/vector-quantization.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[sources/turboquant-paper.md]]