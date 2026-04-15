# Sparse vs Dense Activated Models

**Summary**: A comparison between transformer architectures that activate all parameters (dense) versus those that activate only a subset per input (sparse), such as sparse transformers or mixture of experts.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

LLMs can use sparse modules to lower computational costs and increase model size and capacity. [[entities/gpt-3.md]] uses sparse transformers, while models like GLaM and [[entities/pangu-.md]] use the [[concepts/mixture-of-experts.md]] architecture [Source: Comprehensive Overview of LLMs.pdf].

According to the literature, these sparse modules do not degrade model performance [Source: Comprehensive Overview of LLMs.pdf]. However, the source notes that more experiments are required to verify this statement conclusively.

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[entities/gpt-3.md]]
- [[entities/pangu-.md]]