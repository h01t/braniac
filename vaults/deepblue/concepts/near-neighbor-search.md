# Near Neighbor Search

**Summary**: Near neighbor search (or maximum inner product search) aims to find the closest vectors to a query using approximate methods. TurboQuant provides a quantization-based approach with strong recall.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

In Section 4.4 of turboqaunt.pdf, TurboQuant is evaluated for near neighbor search on three datasets: [[entities/dbpedia-entities.md]] (dimensions 1536 and 3072) and [[entities/glove-embeddings.md]] (dimension 200). It is compared against [[concepts/product-quantization.md]] and [[concepts/rabitq.md]].

TurboQuant consistently achieves higher recall@k than both baselines, despite baselines having inherent advantages (PQ uses k-means codebooks on the same training set; RabitQ lacks full vectorization). Table 2 shows quantization time: TurboQuant is orders of magnitude faster (e.g., 0.0013 seconds for 1536 dimensions vs. 2267 seconds for RabitQ).

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/product-quantization.md]]
- [[concepts/rabitq.md]]
- [[entities/dbpedia-entities.md]]
- [[entities/glove-embeddings.md]]