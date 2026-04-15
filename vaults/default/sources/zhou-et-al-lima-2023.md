# Zhou et al., LIMA (2023)

**Summary**: The LIMA (Less Is More for Alignment) paper demonstrates that a strong aligned language model can be trained with a relatively small set of carefully curated, high-quality demonstration data, challenging the notion that massive reinforcement learning from human feedback (RLHF) datasets are always necessary.
**Source Context**: Zhou, C., Liu, P., Xu, P., et al. *LIMA: Less is More for Alignment*, arXiv:2305.11206 (2023). From Comprehensive Overview of LLMs.pdf (citation 185)

---

The LIMA study shows that a large language model (LLaMA 65B) fine-tuned with only 1,000 carefully selected prompt-response pairs can perform remarkably well in following instructions and generating appropriate responses, often matching or approaching the performance of models trained with extensive RLHF.

This work has significant implications for [[concepts/alignment.md]] and [[concepts/training-efficiency-techniques.md]]. It suggests that data quality and diversity may be more critical than sheer quantity for teaching models desired behaviors, potentially reducing the cost and complexity of alignment.

## Related pages
- [[concepts/alignment.md]]
- [[concepts/training-efficiency-techniques.md]]
- [[entities/zhou-c.md]]