# Product Quantization

**Summary**: Product quantization (PQ) is a technique for compressing high-dimensional vectors by dividing them into subspaces and quantizing each subspace separately, commonly used in nearest neighbor search.
**Source Context**: turboqaunt.pdf

---

In the nearest neighbor search literature, PQ often relies on codebooks learned via k-means during indexing, making it ill-suited for online settings. TurboQuant outperforms PQ in recall while reducing indexing time to virtually zero, due to its data-oblivious and accelerator-friendly design.

## Related pages
- [[concepts/vector-quantization.md]]
- [[concepts/turboquant.md]]
- [[concepts/nearest-neighbor-search.md]] (optional, but not in the source explicitly; may be omitted)
- [[sources/turboquant-paper.md]]