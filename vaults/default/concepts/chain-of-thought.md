# Chain-of-Thought

**Summary**: A reasoning technique where a model generates a step-by-step explanation before producing a final answer, often used to improve performance on complex tasks like mathematics and coding.
**Source Context**: DeepSeek_R1.pdf

---

## Definition and Purpose

Chain-of-thought (CoT) reasoning involves breaking down a problem into intermediate logical steps. This technique helps models tackle complex problems by making the reasoning process explicit, which often leads to higher accuracy.

## Role in DeepSeek-R1 Training

In the DeepSeek-R1 models, CoT is not explicitly taught via supervised data. Instead, it is incentivized through [[concepts/reinforcement-learning-reasoning.md]]. The training template requires the model to output its reasoning process within `<think>` tags and the final answer within `<answer>` tags. This structure is enforced by format rewards during RL training.

## Emergent Behaviors

The paper notes that models like [[entities/deepseek-r1-zero.md]] naturally develop long and detailed CoT reasoning through RL. This includes behaviors like re-checking steps and self-verification, which emerge without direct supervision.

## Performance Impact

CoT is a key factor in the models' strong performance on benchmarks like AIME 2024 and MATH-500. The ability to generate lengthy, coherent reasoning chains allows the models to solve difficult problems effectively.

## Related pages
- [[concepts/reinforcement-learning-reasoning.md]]
- [[entities/deepseek-r1-zero.md]]