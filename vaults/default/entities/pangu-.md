# PanGu-α

**Summary**: A 200B parameter LLM from Huawei that uses a mixture of experts architecture and advanced 5D training parallelism.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

PanGu-α is a 200B parameter model. It uses a [[concepts/mixture-of-experts.md]] (MoE) architecture [Source: Comprehensive Overview of LLums.pdf]. For distributed training, it goes beyond standard 3D parallelism to apply **5D parallelism**, which includes optimizer parallelism and rematerialization [Source: Comprehensive Overview of LLums.pdf].

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[concepts/training-parallelism.md]]