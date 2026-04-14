# Group Relative Policy Optimization (GRPO)
**Source:** [[sources/DeepSeek_R1.md]]

Group Relative Policy Optimization (GRPO) is a reinforcement learning algorithm used in training **[[entities/DeepSeek_R1_Zero.md]]** and **[[entities/DeepSeek_R1.md]]**. It is designed to reduce training costs by eliminating the need for a separate critic model.

## How GRPO Works
For each prompt, GRPO samples a group of outputs from the current policy. It then computes advantages using group rewards and optimizes the policy with a clipped objective similar to PPO, but with a baseline estimated from the group scores.

### Key Equations (from paper):
- Objective function maximizes the expected advantage with a KL divergence penalty.
- Advantage for each output is computed as: `advantage = (reward - min(group_rewards)) / std(group_rewards)`.

## Benefits
- **Efficiency:** Removes the critic model, reducing memory and computation.
- **Stability:** Uses group statistics for baseline estimation, which can stabilize training.
- **Effectiveness:** Successfully applied to train LLMs for reasoning tasks, leading to significant performance improvements.

## Usage in DeepSeek-R1
GRPO is the core RL algorithm that enables the **[[concepts/Reinforcement_Learning_Reasoning.md]]** process, allowing the model to self-evolve without supervised data.