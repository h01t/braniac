# Vector Quantization

**Summary**: A classical data compression technique that reduces the size of high‑dimensional vectors by mapping continuous values to a discrete set, used widely in AI for key‑value cache compression and vector search.

**Source Context**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/

---

Vector quantization compresses high‑dimensional vectors by partitioning the space into regions and representing each vector by a codeword index. However, traditional methods incur memory overhead because they must store per‑block quantization constants (e.g., scaling factors) in full precision. The blog post notes that this overhead can add 1–2 extra bits per number, partially defeating the purpose of compression (source URL, introduction).

[[concepts/turboquant.md|TurboQuant]] overcomes this limitation by combining random rotations, [[concepts/polarquant.md|PolarQuant]] (which eliminates constant storage), and [[concepts/quantized-johnson-lindenstrauss.md|QJL]] (zero‑overhead 1‑bit encoding). The blog evaluates TurboQuant against baselines such as [[KIVI]], [[PQ]], and [[RabbiQ]] on benchmarks like LongBench and GloVe, showing superior recall and distortion (source URL, "Experiments and results").

Vector quantization is critical for scaling [[key-value cache]] (KV cache) in LLMs and for large‑scale vector search engines. The blog positions TurboQuant as a new benchmark for efficient, provably near‑optimal quantization.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/polarquant.md]]
- [[sources/turboquant-blog-post.md]]