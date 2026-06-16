# Product Quantization

**Summary**: Product quantization splits high-dimensional vectors into subspaces, each quantized independently with its own codebook. It is a common baseline for vector compression.

**Source Context**: turboquant.pdf

---

Product quantization (PQ) is a lossy compression technique that divides a D‑dimensional vector into M subspaces of dimension D/M, learns a separate codebook for each subspace, and encodes the vector as a tuple of codebook indices. TurboQuant compares against PQ variants in its experiments.

## Related pages
- [[concepts/vector-quantization.md]]
- [[concepts/turboquant-mse.md]]
- [[concepts/turboquant-prod.md]]
- [[sources/turboquant-pdf.md]]