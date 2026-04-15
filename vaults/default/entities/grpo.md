# GRPO (Group Relative Policy Optimization)

**Summary**: A reinforcement learning algorithm that estimates baselines from group scores instead of using a critic model, used in DeepSeek-R1 to reduce training costs.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
Group Relative Policy Optimization (GRPO) is the RL algorithm adopted in the DeepSeek-R1 paper for training both [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]]. It is based on prior work (Shao et al., 2024) and is designed to be computationally efficient by eliminating the need for a separate critic model.

## Algorithm Details
As described in the paper (Equations 1-3), for each question, GRPO samples a group of outputs from the old policy. The advantage for each output is computed relative to the group's reward statistics (mean and standard deviation). The policy is optimized by maximizing a clipped objective that includes a KL penalty to prevent excessive deviation from the base policy.

Key hyperparameters include:
- Y: Clipping range for the probability ratio.
- V: Coefficient for the KL penalty.

## Advantages
The paper notes that GRPO saves training costs by forgoing the critic model, which is typically the same size as the policy model. This makes large-scale RL more feasible.

## Usage in DeepSeek-R1
GRPO is applied to the base model [[entities/deepseek-v3-base.md]] with rule-based [[concepts/reward-modeling.md]]. It enables the model to explore and improve its [[concepts/chain-of-thought.md]] reasoning over thousands of RL steps.

## Related Concepts
GRPO is a specific implementation of [[concepts/reinforcement-learning.md]] that interacts with the reward design to drive model [[concepts/self-evolution.md]].

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[entities/deepseek-r1-zero.md]]
- [[sources/deepseek-r1-paper.md]]