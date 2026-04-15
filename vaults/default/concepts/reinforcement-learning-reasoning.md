# Reinforcement Learning for Reasoning

**Summary**: A training paradigm that uses reinforcement learning to enhance the reasoning capabilities of large language models, enabling them to develop complex problem-solving strategies without supervised fine-tuning.
**Source Context**: DeepSeek_R1.pdf

---

## Overview

Reinforcement learning (RL) is applied directly to base large language models to incentivize and improve their reasoning abilities. This approach, as demonstrated in the DeepSeek-R1 paper, allows models to self-evolve and discover effective reasoning patterns such as [[concepts/chain-of-thought.md]], self-verification, and reflection without any initial supervised fine-tuning data.

## Method in DeepSeek-R1

The DeepSeek-R1 models use [[concepts/group-relative-policy-optimization.md]] (GRPO) as the RL algorithm. This method samples a group of outputs for each question and optimizes the policy model by maximizing a surrogate objective with a KL penalty, using advantages computed from group rewards. This eliminates the need for a separate critic model, reducing training costs.

## Reward Design

The reward system for RL consists of two main components:
1. **Accuracy Rewards**: Rule-based verification of the final answer's correctness (e.g., for math problems) or using compilers/test cases for coding problems.
2. **Format Rewards**: Enforcing a specific output structure where reasoning is enclosed in `<think>` tags and the final answer in `<answer>` tags.

This combination guides the model towards both correct solutions and a structured reasoning process.

## Results and Implications

The paper shows that RL leads to steady improvement on reasoning benchmarks. For [[entities/deepseek-r1-zero.md]], the pass@1 score on AIME 2024 increased from 15.6% to 71.0% through RL training. With majority voting, it reached 86.7%, matching the performance of [[entities/openai-o1-series.md]]. This demonstrates that RL alone can unlock advanced reasoning capabilities in LLMs.

## Related pages
- [[concepts/group-relative-policy-optimization.md]]
- [[concepts/reward-modeling.md]]
- [[entities/deepseek-r1-zero.md]]