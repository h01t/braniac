# Distributed LLM Training

**Summary**: Distributed training refers to a suite of parallelism techniques used to train Large Language Models across multiple computational devices (GPUs/TPUs) due to their massive size and data requirements.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Parallelism Strategies
Training [[concepts/large-language-models.md]] requires distributing the computational load. Common strategies include:
*   **Data Parallelism**: Replicates the entire model across multiple devices (e.g., GPUs) and splits the training batch across them. Gradients are synchronized at the end of each iteration (Source: Comprehensive Overview of LLMs.pdf, Section 2.6).
*   **Tensor (Model) Parallelism**: Also called horizontal or intra-layer parallelism. It splits individual layers (e.g., the weight matrices of linear layers or attention heads) across devices (Source: Comprehensive Overview of LLMs.pdf, Section 2.6).
*   **Pipeline Parallelism**: Also called vertical parallelism. It partitions the model's layers (different stages of the network) across multiple devices (Source: Comprehensive Overview of LLMs.pdf, Section 2.6).
*   **3D Parallelism**: A combination of data, tensor, and pipeline parallelism for optimal scaling on large clusters (Source: Comprehensive Overview of LLMs.pdf, Section 2.6).
*   **Optimizer Parallelism (ZeRO)**: The Zero Redundancy Optimizer (ZeRO) partitions the optimizer states, gradients, and parameters across devices to drastically reduce memory consumption per device while maintaining training efficiency (Source: Comprehensive Overview of LLMs.pdf, Section 2.6, referencing [37]).

## Supporting Libraries
Specialized libraries facilitate distributed LLM training, such as [[entities/deepspeed.md]] (which implements ZeRO), [[entities/megatron-lm.md]], and [[entities/colossal-ai.md]] (Source: Comprehensive Overview of LLMs.pdf, Section 2.7).

## Necessity for LLMs
Given that LLMs can have hundreds of billions of parameters and are trained on terabytes of data, distributed training is not optional but a fundamental requirement for their development.

## Related pages
- [[concepts/large-language-models.md]]
- [[entities/deepspeed.md]]
- [[entities/megatron-lm.md]]