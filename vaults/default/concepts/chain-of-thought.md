# Chain-of-Thought

**Summary**: A reasoning technique where models generate intermediate reasoning steps before producing a final answer, used extensively in DeepSeek-R1 to solve complex problems.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1
Chain-of-thought (CoT) is central to the reasoning capabilities of DeepSeek-R1 models. The paper highlights that OpenAI's o1 series popularized inference-time scaling via long CoT processes. DeepSeek-R1 adopts a similar approach, using RL to incentivize the model to produce detailed CoT reasoning.

## Training and Inference
During training, models are encouraged via [[concepts/reward-modeling.md]] to generate reasoning within `<think>` tags. The paper notes that [[concepts/reinforcement-learning.md]] naturally leads the model to develop CoT behaviors, including self-verification and reflection, without explicit SFT.

## Impact on Performance
Long and coherent CoT reasoning is correlated with improved accuracy on benchmarks. For example, DeepSeek-R1-Zero's CoT outputs contribute to its high scores on AIME and MATH. The paper also shows that majority voting over multiple CoT samples further boosts performance (e.g., 86.7% on AIME).

## Distillation
The CoT patterns discovered by large models like [[entities/deepseek-r1.md]] are distilled into smaller models via [[concepts/distillation.md]], transferring reasoning capabilities effectively.

## Related Concepts
CoT is intertwined with [[concepts/self-evolution.md]] during RL, as models learn to generate better reasoning through trial and error.

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[entities/deepseek-r1-zero.md]]
- [[sources/deepseek-r1-paper.md]]