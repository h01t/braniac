# Quantization Constants

**Summary**: Per‑block scaling factors or centroids used in vector quantization to normalize or represent sub‑vectors.

**Source Context**: Derived from reference in PolarQuant description on the TurboQuant blog post.

---

In methods like [[concepts/product-quantization.md|product quantization]] and [[concepts/vector-quantization.md|vector quantization]], each block or subspace is often associated with a set of constants (e.g., codebook entries or normalization parameters). **PolarQuant** eliminates the need for per‑block quantization constants by using a fixed circular grid for angles.

## Related pages
- [[concepts/polarquant.md]]
- [[concepts/vector-quantization.md]]
- [[concepts/product-quantization.md]]