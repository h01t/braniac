# Quantized Johnson‑Lindenstrauss Transform

**Summary**: A variant of the Johnson‑Lindenstrauss lemma that uses quantization to reduce the storage cost of random projections, often applied to inner‑product estimation.

**Source Context**: turboquant.pdf

---

The quantized Johnson‑Lindenstrauss transform (QJL) projects high‑dimensional vectors using a random Gaussian matrix and then quantizes the result to low‑precision (e.g., sign bits). TurboQuant uses QJL in its `prod` variant for unbiased inner‑product estimation. See [[concepts/quasi-johnson-lindenstrauss-qjl.md]] for the specific implementation used.

## Related pages
- [[concepts/quasi-johnson-lindenstrauss-qjl.md]]
- [[concepts/turboquant-prod.md]]
- [[sources/turboquant-pdf.md]]