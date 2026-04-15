# Mixed Precision Training

**Summary**: A training strategy for LLMs that uses lower-precision (e.g., FP16) formats for forward/backward passes and higher-precision (FP32) for optimizer states to improve efficiency, with BF16 being a more stable but hardware-specific alternative.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Mixed precision is a common method to reduce memory usage and improve training efficiency in LLMs. Typically, forward and backward passes use FP16, while optimizer states and master weights are kept in FP32 [Source: Comprehensive Overview of LLMs.pdf]. A drawback is training instability due to FP16's smaller value range, which can cause loss spikes [Source: Comprehensive Overview of LLMs.pdf].

An alternative is **BF16**, which has a larger range than FP16. Precision-sensitive operations like gradient accumulation and softmax are performed in FP32. BF16 offers better performance and training stability but uses more memory and is supported on specific hardware like A100 GPUs, limiting its adoption [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/training-instability.md]]