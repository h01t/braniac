# Product Quantization

**Summary**: Product quantization decomposes high-dimensional vectors into subvectors and quantizes each independently, enabling efficient approximate nearest neighbor search and vector compression. It is used as a building block for KV cache quantization.

**Source Context**: turboqaunt.pdf

---

Product quantization (PQ) was introduced by Jegou et al. ([[31]]) for nearest neighbor search [31]. It splits a vector into subvectors, each quantized using a separate codebook. Variants include optimized product quantization (OPQ) by Ge et al. ([[24]]) [24] and additive quantization (AQ) by Babenko and Lempitsky ([[9]]) [9].

PQ is applied in retrieval (e.g., [[concepts/kv-cache-quantization.md]]) and has been extended for asymmetric distance computation (see ColBERT [[35]], ColBERTv2 [[46]]). The source also references practical and asymptotically optimal quantization methods for Euclidean space by Gao et al. ([[22]]) [22].

## Related pages
- [[concepts/vector-quantization.md]]
- [[concepts/kv-cache-quantization.md]]
- [[sources/turboqaunt.md]]