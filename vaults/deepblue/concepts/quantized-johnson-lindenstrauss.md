# Quantized Johnson-Lindenstrauss (QJL)

**Summary**: A zero‑overhead, 1‑bit quantization technique that compresses high‑dimensional vectors to a single sign bit while preserving pairwise distances through the Johnson‑Lindenstrauss Transform, used as the error‑correction stage in TurboQuant.

**Source Context**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/

---

Quantized Johnson‑Lindenstrauss (QJL) is a compression algorithm that applies a [[Johnson-Lindenstrauss Transform]] (a random linear mapping that approximately preserves distances) and then reduces each dimension to a single [[sign bit]] (+1 or −1). This yields zero memory overhead because no quantization constants are stored (source URL, "QJL: The zero‑overhead, 1‑bit trick").

QJL is used in [[concepts/turboquant.md|TurboQuant]] as the second compression stage. It encodes the residual error from the first stage ([[concepts/polarquant.md|PolarQuant]]) into 1 bit. A special estimator balances a high‑precision query with the low‑precision data, allowing accurate [[attention score]] calculation (source URL, same section).

The blog states that QJL is mathematically backed by the [[Johnson-Lindenstrauss Lemma]] and is presented in a separate paper (arxiv.org/abs/2406.03482). It was published at AAAI 2025 (source URL, "Quick links").

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/polarquant.md]]
- [[concepts/vector-quantization.md]]
- [[sources/turboquant-blog-post.md]]