# Distillation vs. Reinforcement Learning

**Summary**: A comparison of two training methodologies for enhancing reasoning in language models, where distilling knowledge from a powerful teacher model is found to be more economically effective than applying large-scale reinforcement learning from scratch on smaller models.
**Source Context**: DeepSeek_R1.pdf (Section 4.1).

---

## Core Findings
The research compares two primary approaches for improving model reasoning: [[concepts/knowledge-distillation.md]] and large-scale [[concepts/reinforcement-learning.md]].

**Distillation Effectiveness**: By distilling outputs from the powerful [[entities/deepseek-r1.md]] into smaller models (like [[entities/deepseek-r1-distill-qwen-7b.md]]), the resultant models can outperform non-reasoning models like GPT-4o and even surpass other reasoning-optimized models like [[entities/qwq-32b-preview.md]]. For example, [[entities/deepseek-r1-distill-qwen-32b.md]] achieved 72.6% on AIME 2024, significantly higher than models trained with RL alone (Source: DeepSeek_R1.pdf, Table 5 & 6).

**Reinforcement Learning Limitations**: Training a base model like Qwen-32B-Base with large-scale RL on math, code, and STEM data for over 10K steps resulted in [[entities/deepseek-r1-zero-qwen-32b.md]]. Its performance was only on par with [[entities/qwq-32b-preview.md]] and was significantly worse than its distilled counterpart across all benchmarks (Source: DeepSeek_R1.pdf, Table 6).

## Key Conclusions
The paper draws two primary conclusions:
1.  **Distillation Superiority**: Distilling from more powerful models into smaller ones yields excellent results efficiently. In contrast, achieving similar performance via the large-scale RL methodology described requires enormous computational power and may not match distillation's effectiveness.
2.  **Future Path for Advancement**: While distillation is economical and effective for knowledge transfer, pushing the boundaries of model intelligence may still require more powerful base models and even larger-scale reinforcement learning.

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[concepts/reinforcement-learning.md]]
- [[concepts/reasoning-ability.md]]