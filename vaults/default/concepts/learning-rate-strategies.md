# Learning Rate Strategies for LLMs

**Summary**: The use of low learning rates with warmup and decay schedules is standard for stable LLM training, with rates often interpolated based on model size.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

A suitable, low learning rate is important for stable training of LLMs. It is typically used with a warmup phase followed by a decay schedule (cosine or linear) [Source: Comprehensive Overview of LLMs.pdf]. Learning rates usually fall within the range of 1e-4 to 8e-4 [Source: Comprehensive Overview of LLMs.pdf].

To avoid hyperparameter tuning, some models interpolate learning rates based on model size. For example, MT-NLG (530B) and [[entities/gpt-neox.md]] (20B) interpolate rates using [[entities/gpt-3.md]] models (13B to 175B) as reference points [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[entities/gpt-3.md]]
- [[entities/gpt-neox.md]]