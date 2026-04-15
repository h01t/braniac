# GLM-130B

**Summary**: A 130B parameter bilingual (English/Chinese) LLM that uses deep-norm (a post-norm variant) for better fine-tuning performance and identifies rotary positional encoding as superior.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

GLM-130B is a 130B parameter model. For [[concepts/layer-normalization-in-llms.md]], it uses **deep-norm**, a variant of post-norm, because pre-norm was found to degrade fine-tuned model performance at this scale without offering stability benefits [Source: Comprehensive Overview of LLMs.pdf].

Regarding [[concepts/positional-encoding-in-llms.md]], GLM-130B identifies **rotary positional encoding** as being better than ALiBi, presenting a contradiction to findings from [[entities/bloom.md]] [Source: Comprehensive Overview of LLums.pdf]. It also uses embedding layer gradient shrink to stabilize training [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/layer-normalization-in-llms.md]]
- [[concepts/positional-encoding-in-llms.md]]
- [[concepts/training-instability.md]]