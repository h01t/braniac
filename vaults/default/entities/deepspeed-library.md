# DeepSpeed Library

**Summary**: DeepSpeed is a Microsoft-developed open-source library designed for efficient distributed training and inference of extremely large deep learning models, featuring the innovative ZeRO optimizer.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Purpose and Function
DeepSpeed is a critical tool in the [[concepts/llm-training-pipeline.md]], enabling the training of models that would otherwise not fit into GPU memory. It is listed among the commonly used libraries for scalable distributed training of LLMs (Source: Comprehensive Overview of LLMs.pdf).

## Key Feature: ZeRO Optimizer
A core component of DeepSpeed is the **ZeRO (Zero Redundancy Optimizer)** family of optimizers. ZeRO implements **optimizer parallelism**, which partitions the optimizer states, gradients, and model parameters across available devices. This dramatically reduces the memory footprint per device, allowing for the training of models with billions or trillions of parameters (Source: Comprehensive Overview of LLMs.pdf).

## Ecosystem Role
DeepSpeed often works in conjunction with other frameworks like PyTorch and is complementary to other parallelism strategies such as tensor and pipeline parallelism, forming part of a comprehensive 3D parallelism approach for LLM training (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/llm-training-pipeline.md]]
- [[concepts/efficient-llms.md]]