# Layer Normalization in LLMs

**Summary**: A key architectural module that significantly affects the performance and training stability of large language models, with variants like pre-norm, post-norm, and deep-norm.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Layer normalization is critical for stabilizing the training of LLMs. The **pre-norm** variant (normalizing inputs) is common and stabilizes training [Source: Comprehensive Overview of LLMs.pdf]. Models like [[entities/bloom.md]] and AlexaTM use an additional layer normalization before the embedding layer for stability, though this can negatively impact zero-shot generalization [Source: Comprehensive Overview of LLMs.pdf].

However, one study found that pre-norm can degrade fine-tuned model performance compared to **post-norm** at very large scales (beyond 100B parameters), with no additional stability benefit [Source: Comprehensive Overview of LLMs.pdf]. Therefore, **[[entities/glm-130b.md]]** uses **deep-norm**, a variant of post-norm, for better downstream task performance after fine-tuning [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/bloom.md]]
- [[entities/glm-130b.md]]