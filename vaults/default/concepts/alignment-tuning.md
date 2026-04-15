# Alignment-Tuning

**Summary**: The process of fine-tuning LLMs to ensure their outputs are helpful, honest, and harmless, aligning them with human intentions and values.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Alignment-tuning addresses the tendency of pre-trained LLMs to generate false, biased, or harmful content. The goal is to make models fulfill the "HHH" criteria: Helpful, Honest, and Harmless.

According to the source, alignment involves showing the LLM undesirable responses and updating its parameters to avoid generating such content in the future. This process ensures the model operates according to human values.

A common technical approach for alignment-tuning is [[concepts/reinforcement-learning-human-feedback.md|Reinforcement Learning from Human Feedback (RLHF)]]. The source defines a model as "aligned" if it successfully meets the HHH criteria. It is important to note that the term "alignment" is sometimes used in literature for other purposes, but in this context, it specifically refers to alignment with human preferences.

## Related pages
- [[concepts/fine-tuning.md]]
- [[concepts/reinforcement-learning-human-feedback.md]]