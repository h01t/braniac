# Product Quantization

**Summary**: Product Quantization (PQ) is a classic vector quantization method that decomposes vectors into subvectors and quantizes each with a codebook learned via k-means. It is widely used for nearest neighbor search.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

In turboqaunt.pdf, PQ is used as a baseline for [[concepts/near-neighbor-search.md]]. The implementation uses AVX2 In-Register Lookup Tables with 256 codewords (LUT256) for better accuracy, grouping 4 coordinates per lookup for 2-bit and 2 coordinates for 4-bit. PQ benefits from training on the same dataset (DBpedia), giving it an inherent advantage. Despite this, [[concepts/turboquant.md]] outperforms PQ in recall@k (Figure 5 in turboqaunt.pdf).

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/near-neighbor-search.md]]
- [[concepts/rabitq.md]]