# Reasoning Ability

**Summary**: The capability of a language model to perform logical, step-by-step thinking to solve complex problems, a core focus of the DeepSeek-R1 research.
**Source Context**: DeepSeek_R1.pdf (Throughout).

---

## Enhancing Reasoning
The central goal of the DeepSeek-R1 project was to enhance the [[concepts/reasoning-ability.md]] of language models. This was pursued primarily through [[concepts/reinforcement-learning.md]] and [[concepts/knowledge-distillation.md]]. The research measured reasoning ability on benchmarks like [[entities/aime-2024.md]], [[entities/math-500.md]], and [[entities/gpqa-diamond.md]].

## Findings on Training Methods
The research provided insights into how to cultivate reasoning:
*   **RL's Role**: Large-scale reinforcement learning was effective for building powerful reasoning models from strong base models or with cold-start data.
*   **Distillation's Efficiency**: Reasoning capability could be efficiently transferred from a powerful RL-trained model to much smaller models via distillation, outperforming the application of RL directly on those small models.

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[concepts/knowledge-distillation.md]]