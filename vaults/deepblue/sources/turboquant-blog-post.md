# TurboQuant Blog Post (Google Research)

**Summary**: A Google Research blog post introducing TurboQuant, a set of advanced quantization algorithms for extreme compression of large language models and vector search engines, alongside Quantized Johnson-Lindenstrauss (QJL) and PolarQuant.

**Source Context**: https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/

---

This blog post, published March 24, 2026, by Amir Zandieh and Vahab Mirrokni of Google Research, presents three mathematically grounded compression techniques: [[concepts/turboquant.md|TurboQuant]], [[concepts/quantized-johnson-lindenstrauss.md|Quantized Johnson-Lindenstrauss (QJL)]], and [[concepts/polarquant.md|PolarQuant]]. The post claims these methods achieve near‑lossless compression of key‑value caches to as low as 3 bits without training or fine‑tuning, while accelerating attention computation up to 8× on H100 GPUs (source URL, sections "How TurboQuant works" and "Experiments and results").

The techniques are evaluated on long‑context benchmarks (LongBench, Needle In A Haystack, ZeroSCROLLS, RULER, L‑Eval) using Gemma, Mistral, and Llama‑3.1‑8B‑Instruct models. TurboQuant is scheduled for presentation at ICLR 2026, and PolarQuant at AISTATS 2026 (source URL, "Quick links" and "Experiments and results").

The blog also acknowledges collaborators: Praneeth Kacham, Majid Hadian, Insu Han, Majid Daliri, Lars Gottesbüren, and Rajesh Jayaram.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/polarquant.md]]
- [[concepts/vector-quantization.md]]