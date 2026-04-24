# LongBench Dataset

**Summary**: LongBench is a bilingual, multitask benchmark for long-context understanding. Its subset LongBench-E provides a more uniform length distribution for fair evaluation.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

LongBench (introduced by Bai et al., 2023, reference [10] in turboqaunt.pdf) covers single- and multi-document QA, summarization, few-shot learning, synthetic tasks, and code completion. LongBench-E is a subset with balanced context lengths. In turboqaunt.pdf, Section 4.3, various KV cache compression methods are evaluated on LongBench using [[entities/llama-3-1-8b-instruct.md]] and [[entities/ministral-7b-instruct.md]].

Results (Table 1) show that [[concepts/turboquant.md]] outperforms baselines like KIVI, PolarQuant, SnapKV, and PyramidKV. TurboQuant at 2.5-bit and 3.5-bit precision achieves average scores comparable to full-precision models.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/kv-cache-compression.md]]
- [[concepts/needle-in-a-haystack-test.md]]
- [[entities/llama-3-1-8b-instruct.md]]
- [[entities/ministral-7b-instruct.md]]
- [[sources/turboqaunt-paper.md]]