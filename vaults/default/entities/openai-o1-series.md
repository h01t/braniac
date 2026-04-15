# OpenAI o1 Series

**Summary**: A series of closed-source reasoning models from OpenAI known for their advanced reasoning capabilities, achieved through inference-time scaling and chain-of-thought.
**Source Context**: DeepSeek_R1.pdf

---

## Overview and Significance

The OpenAI o1 series models (e.g., o1-0912, o1-1217, o1-mini) are presented as state-of-the-art in reasoning performance at the time of the DeepSeek-R1 paper. They are noted for using inference-time scaling—increasing the length of the reasoning process—to improve performance on complex tasks.

## Performance Benchmarks

The paper cites several performance figures for comparison:
- **o1-0912**: 74.4% on AIME 2024, 94.8% on MATH-500.
- **o1-1217**: Used as the primary comparison point for DeepSeek-R1, with similar scores on AIME and MATH.

These models set a high benchmark that the DeepSeek-R1 project aims to match and surpass with open-source alternatives.

## Influence on Research

The success of the o1 series motivates the research community to explore methods for improving reasoning, such as the RL-based approach taken by DeepSeek. The DeepSeek-R1 paper explicitly positions its models as achieving "performance comparable to OpenAI-o1-1217."

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/chain-of-thought.md]]