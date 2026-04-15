# DeepSpeed

**Summary**: DeepSpeed is a deep learning optimization library developed by Microsoft that enables efficient distributed training and inference of very large models, featuring the ZeRO optimizer for memory efficiency.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Purpose and Features
DeepSpeed is designed to address the immense computational and memory challenges of training [[concepts/large-language-models.md]]. Its key features include:
*   **ZeRO (Zero Redundancy Optimizer)**: A family of memory optimization techniques that partitions optimizer states (ZeRO-1), gradients (ZeRO-2), and model parameters (ZeRO-3) across data-parallel processes, dramatically reducing memory footprint per GPU (Source: Comprehensive Overview of LLMs.pdf, Section 2.6 & 2.7, referencing [36, 37]).
*   **Support for Model and Pipeline Parallelism**: Works in conjunction with tensor and pipeline parallelism strategies for [[concepts/distributed-training.md]].
*   **Optimized Inference**: Provides libraries for fast and memory-efficient model inference.

## Integration and Use
DeepSpeed is widely used in both academia and industry for training large-scale models. It integrates with PyTorch and can be used alongside other frameworks. It is cited as a commonly used library for LLM training (Source: Comprehensive Overview of LLMs.pdf, Section 2.7).

## Related pages
- [[concepts/distributed-training.md]]
- [[concepts/large-language-models.md]]