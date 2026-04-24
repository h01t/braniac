# TurboQuant

**Summary**: A quantization algorithm introduced by Google Research that achieves extreme compression of large language models and vector search indices with zero accuracy loss, combining random rotations, PolarQuant compression, and a QJL error‑correction step.

**Source Context**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/

---

TurboQuant is a two‑stage compression method designed to eliminate the memory overhead typical of [[concepts/vector-quantization.md|vector quantization]]. According to the blog post, TurboQuant:

1. **First stage – PolarQuant**: Randomly rotates data vectors to simplify geometry, then applies [[concepts/polarquant.md|PolarQuant]] – a quantizer that converts Cartesian coordinates into polar coordinates, mapping angles onto a fixed grid to remove the need for per‑block normalization constants (source URL, "How TurboQuant works").
2. **Second stage – QJL error correction**: Uses 1 bit via [[concepts/quantized-johnson-lindenstrauss.md|Quantized Johnson-Lindenstrauss (QJL)]] to encode the residual error, producing an unbiased estimate of the attention score (source URL, same section).

The algorithm compresses key‑value caches to 3 bits without fine‑tuning, achieving near‑lossless performance on LongBench, Needle In A Haystack, and other benchmarks. On H100 GPUs, 4‑bit TurboQuant accelerates attention logit computation up to 8× over 32‑bit unquantized keys (source URL, "Experiments and results").

TurboQuant is data‑oblivious and requires no dataset‑specific tuning, giving it robust performance across different models (Gemma, Mistral, Llama‑3.1) and vector search tasks (e.g., GloVe dataset).

## Related pages
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/polarquant.md]]
- [[concepts/vector-quantization.md]]
- [[sources/turboquant-blog-post.md]]