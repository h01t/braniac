# DBpedia Entities Dataset

**Summary**: A dataset of DBpedia entities encoded into high-dimensional embeddings using OpenAI's text-embedding-3-large model. Used in experiments for quantization and nearest neighbor search.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

The DBpedia Entities dataset is used in experiments in turboqaunt.pdf (Section 4.1 and 4.4). It is encoded into 1536- and 3072-dimensional spaces. The dataset is available on Hugging Face (references [53] and links in the paper). 100,000 data points are sampled for training, and 1,000 distinct entries serve as queries. It is used to validate theoretical bounds on [[concepts/turboquant.md]] and to benchmark [[concepts/near-neighbor-search.md]] methods.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/near-neighbor-search.md]]
- [[concepts/inner-product-estimation.md]]
- [[sources/turboqaunt-paper.md]]