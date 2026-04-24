# TurboQuant

**Summary**: TurboQuant is a quantization algorithm designed for high-dimensional vectors, providing theoretical guarantees for both mean squared error (MSE) and inner product estimation distortion. It achieves optimal distortion rates up to a small constant factor and is applied to KV cache compression and nearest neighbor search.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

TurboQuant is introduced as a quantization method that minimizes distortion in both MSE and inner product estimation. The algorithm uses a two-stage process: first, it computes a mean squared error (MSE) approximant, then applies a randomized quantization based on the Quasi-Johnson-Lindenstrauss Lemma (QJL) to achieve unbiased inner product estimates.

Theoretical results show that TurboQuant achieves optimal distortion rates for any bit-width, proven via lower bounds using [[concepts/yao-minimax-principle.md]] and [[concepts/shannon-lower-bound.md]]. Specifically, Theorem 3 (source: turboqaunt.pdf) establishes that for any randomized quantization algorithm, there exists a hard input such that MSE ≥ 1/(4^b) and inner product distortion ≥ 1/(d·4^b).

Experiments on [[entities/dbpedia-entities.md]] with [[entities/openai-embeddings.md]] validate the theoretical bounds. Two variants are evaluated: **TurboQuant_prod** (unbiased for inner product) and **TurboQuant_mse** (optimized for MSE). The results confirm that TurboQuant_prod remains unbiased across all bit widths, while TurboQuant_mse exhibits bias that diminishes with increasing bit width (source: turboqaunt.pdf, Section 4.1).

In downstream tasks, TurboQuant is applied to [[concepts/kv-cache-compression.md]] on LLMs like [[entities/llama-3-1-8b-instruct.md]] and [[entities/ministral-7b-instruct.md]]. On the [[concepts/needle-in-a-haystack-test.md]] and [[concepts/longbench-dataset.md]], TurboQuant achieves performance matching full-precision models at 4× compression or higher (source: turboqaunt.pdf, Sections 4.2 and 4.3). It also outperforms [[concepts/product-quantization.md]] and [[concepts/rabitq.md]] in [[concepts/near-neighbor-search.md]] tasks (source: turboqaunt.pdf, Section 4.4).

## Related pages
- [[concepts/inner-product-estimation.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/lower-bound-compression.md]]
- [[entities/dbpedia-entities.md]]
- [[entities/llama-3-1-8b-instruct.md]]
- [[sources/turboqaunt-paper.md]]