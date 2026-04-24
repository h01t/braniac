# Needle-In-A-Haystack Test

**Summary**: A benchmark to evaluate a model's ability to retrieve a specific piece of information (the "needle") embedded within a long document (the "haystack"). Used to assess long-context understanding in LLMs.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

The Needle-In-A-Haystack test involves placing a unique sentence at an arbitrary location within a much larger text and checking whether the model can extract it. In turboqaunt.pdf, this test is used to evaluate KV cache compression methods on [[entities/llama-3-1-8b-instruct.md]] over sequence lengths from 4k to 104k tokens. The metric is recall score.

Results (Figure 4 in turboqaunt.pdf) show that quantization methods with theoretical guarantees ([[concepts/turboquant.md]] and PolarQuant) outperform token-level compression (SnapKV, PyramidKV) and scalar quantization (KIVI). TurboQuant achieves identical recall to the full-precision model even at 4× compression.

## Related pages
- [[concepts/kv-cache-compression.md]]
- [[concepts/turboquant.md]]
- [[concepts/longbench-dataset.md]]
- [[entities/llama-3-1-8b-instruct.md]]