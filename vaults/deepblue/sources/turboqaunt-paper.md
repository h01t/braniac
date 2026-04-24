# TurboQuant Paper (turboqaunt.pdf)

**Summary**: The academic paper introducing the TurboQuant algorithm, its theoretical guarantees, and experimental evaluation on KV cache compression and nearest neighbor search.

**Source Context**: turboqaunt.pdf (complete document, Chunk 4 of 5 provided)

---

The paper presents TurboQuant, a quantization algorithm with optimal distortion rates for both MSE and inner product estimation. Key sections include:

- **Lower Bounds (Section 3.3)**: Uses [[concepts/yao-minimax-principle.md]] and [[concepts/shannon-lower-bound.md]] to prove optimality.
- **Experiments (Section 4)**: Validates theory on [[entities/dbpedia-entities.md]] with [[entities/openai-embeddings.md]]. Downstream tasks: [[concepts/needle-in-a-haystack-test.md]] on [[entities/llama-3-1-8b-instruct.md]], [[concepts/longbench-dataset.md]] on two LLMs, and [[concepts/near-neighbor-search.md]] on multiple datasets.
- **Baselines**: [[concepts/product-quantization.md]], [[concepts/rabitq.md]], PolarQuant, SnapKV, PyramidKV, KIVI.

The paper concludes that TurboQuant achieves state-of-the-art compression performance while maintaining provable guarantees.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/lower-bound-compression.md]]
- [[concepts/kv-cache-compression.md]]
- [[concepts/near-neighbor-search.md]]