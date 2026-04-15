# Group Relative Policy Optimization

**Summary**: A reinforcement learning algorithm that estimates the baseline from group scores, eliminating the need for a separate critic model and reducing training costs.
**Source Context**: DeepSeek_R1.pdf

---

## Algorithm Overview

Group Relative Policy Optimization (GRPO) is the RL algorithm used to train the DeepSeek-R1 models. It is designed to be computationally efficient by forgoing a critic model, which is typically the same size as the policy model.

## Mechanism

For each input question, GRPO samples a group of outputs from the old policy. It then optimizes the policy model by maximizing an objective that includes:
- A clipped surrogate objective based on the probability ratio between the new and old policies.
- A KL divergence penalty to prevent the policy from deviating too far from a reference model (often the initial base model).

The advantage for each output in the group is computed as the reward minus the mean of the group's rewards, divided by the standard deviation. This group-relative advantage serves as the baseline.

## Advantages

GRPO reduces training costs and complexity by not requiring a separate critic network. This makes it suitable for large-scale RL training of language models, as demonstrated in the DeepSeek-R1 paper.

## Usage in DeepSeek-R1

GRPO was key to training [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]], enabling efficient exploration and optimization of reasoning behaviors.

## Related pages
- [[concepts/reinforcement-learning-reasoning.md]]
- [[entities/deepseek-r1-zero.md]]