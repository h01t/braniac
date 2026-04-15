# DeepSeek-R1-Zero

**Summary**: A model developed by DeepSeek using a pure reinforcement learning approach without any initial cold-start demonstration data.
**Source Context**: DeepSeek_R1.pdf

---

## Model Overview
**DeepSeek-R1-Zero** represents one of the two primary model families discussed in the DeepSeek-R1 paper. It embodies the "pure RL" approach to building reasoning models.

## Development Methodology
The defining characteristic of DeepSeek-R1-Zero is its training methodology:
*   **Pure Reinforcement Learning**: It is trained using large-scale [[concepts/reinforcement-learning-rl-for-reasoning.md]] **from scratch**, without relying on any pre-existing "cold-start" or demonstration data to initialize the model's behavior.
*   **Training Scale**: The paper mentions training for **over 10,000 steps** on datasets focused on math, code, and STEM subjects (Source: DeepSeek_R1.pdf).

This approach is contrasted with the methodology used for the more powerful [[entities/deepseek-r1.md]], which does use cold-start data.

## Experimental Variant: DeepSeek-R1-Zero-Qwen-32B
The paper details a specific experiment to test the limits of this pure RL approach on a smaller model. Researchers applied large-scale RL to the **Qwen-32B-Base** model, creating **DeepSeek-R1-Zero-Qwen-32B** (Source: DeepSeek_R1.pdf).

The results of this experiment were pivotal:
*   This RL-trained 32B model achieved performance roughly on par with [[entities/qwq-32b-preview.md]] (Source: DeepSeek_R1.pdf, Table 6).
*   However, it was **significantly outperformed by a distilled 32B model** ([[entities/deepseek-r1-distill-qwen-32b.md]]) that learned from the larger DeepSeek-R1 teacher (Source: DeepSeek_R1.pdf).
*   This finding underscored the conclusion that [[concepts/knowledge-distillation.md]] is a more effective and economical path to creating capable smaller reasoning models than training them with large-scale RL from scratch.

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[entities/deepseek-r1-distill-qwen-32b.md]]
- [[entities/qwq-32b-preview.md]]