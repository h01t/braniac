# Llama-3.1-8B-Instruct

**Summary**: A large language model from Meta, used in experiments for KV cache compression with TurboQuant. It is an 8-billion-parameter instruct-tuned model.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

Llama-3.1-8B-Instruct is used in [[concepts/needle-in-a-haystack-test.md]] and [[concepts/longbench-dataset.md]] evaluations (turboqaunt.pdf, Sections 4.2 and 4.3). TurboQuant compression at 4× achieves the same performance as the full-precision model on the Needle-In-A-Haystack test (recall score 0.997). On LongBench, TurboQuant at 3.5-bit achieves average score 50.06, matching the full cache.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/kv-cache-compression.md]]
- [[concepts/needle-in-a-haystack-test.md]]
- [[concepts/longbench-dataset.md]]