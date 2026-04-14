# OpenAI-o1-1217
**Source:** [[sources/DeepSeek_R1.md]]

OpenAI-o1-1217 is a closed-source reasoning model from OpenAI, released in December 2024 (inferred from the name). It serves as a key performance benchmark in the DeepSeek-R1 paper.

## Performance Comparison
- **DeepSeek-R1** is designed to match or surpass o1-1217 on reasoning tasks.
- According to the paper, DeepSeek-R1 achieves comparable scores:
  - AIME 2024: DeepSeek-R1 79.8% vs. o1-1217 (similar, exact number not given).
  - MATH-500: DeepSeek-R1 97.3% vs. o1-1217 (on par).
- o1-1217 is part of the o1 series, which uses inference-time scaling (longer CoT) to boost reasoning.

## Context
- The o1 series represents state-of-the-art reasoning capabilities at the time of the paper.
- DeepSeek-R1-Zero (the RL-only model) is compared to an earlier version, OpenAI-o1-0912.