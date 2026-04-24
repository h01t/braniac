# KV Cache Compression

**Summary**: KV cache compression reduces memory usage in transformer inference by quantizing key-value cache entries. TurboQuant applies theoretical quantization to achieve high compression ratios with minimal performance loss.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

KV cache compression is critical for long-context LLMs. TurboQuant is applied to compress the KV cache during streaming generation, unlike methods like KIVI and PolarQuant that leave generated tokens unquantized (source: turboqaunt.pdf, Section 4.3). The method uses a split strategy: outlier channels are quantized at higher bits, while regular channels use fewer bits, resulting in non-integer bit precisions (e.g., 2.5-bit, 3.5-bit). For example, 32 outlier channels at 3 bits and 96 regular channels at 2 bits gives an effective 2.5 bits per dimension.

Experiments on [[concepts/needle-in-a-haystack-test.md]] and [[concepts/longbench-dataset.md]] show that TurboQuant achieves identical or better performance than competing methods at 4× compression or higher.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/needle-in-a-haystack-test.md]]
- [[concepts/longbench-dataset.md]]
- [[entities/llama-3-1-8b-instruct.md]]
- [[entities/ministral-7b-instruct.md]]