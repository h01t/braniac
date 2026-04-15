# DeepSeek-R1-Zero

**Summary**: A reasoning model trained purely via large-scale reinforcement learning without any supervised fine-tuning, demonstrating the emergence of powerful reasoning capabilities.
**Source Context**: DeepSeek_R1.pdf

---

## Overview

DeepSeek-R1-Zero is the first model introduced in the DeepSeek-R1 paper. It is created by applying [[concepts/reinforcement-learning-reasoning.md]] directly to the base model [[entities/deepseek-v3-base.md]] without any preceding supervised fine-tuning (SFT). This experiment validates that reasoning can be incentivized through RL alone.

## Training Methodology

The training uses the [[concepts/group-relative-policy-optimization.md]] algorithm. The reward model combines accuracy and format rewards ([[concepts/reward-modeling.md]]). The model is prompted to generate reasoning within `<think>` tags and the answer in `<answer>` tags.

## Performance and Evolution

During RL training, DeepSeek-R1-Zero shows a steady improvement on reasoning benchmarks. Its pass@1 score on AIME 2024 increases from 15.6% to 71.0%. With majority voting (sampling 64 responses), the score reaches 86.7%, matching the performance of [[entities/openai-o1-series.md]] (o1-0912). It also achieves high scores on MATH-500 (95.9%) and LiveCodeBench (73.3%).

## Emergent Behaviors and Limitations

The model naturally develops behaviors like self-verification, reflection, and long [[concepts/chain-of-thought.md]] reasoning. However, it also exhibits issues such as poor readability and language mixing (e.g., mixing Chinese and English), which motivated the development of the improved [[entities/deepseek-r1.md]].

## Related pages
- [[concepts/reinforcement-learning-reasoning.md]]
- [[entities/deepseek-r1.md]]