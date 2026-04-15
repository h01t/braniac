# Cold Start for RL

**Summary**: A training strategy where a model is first fine-tuned on a small, high-quality dataset of readable reasoning traces before commencing reinforcement learning, used to improve stability and readability.
**Source Context**: DeepSeek_R1.pdf

---

## Purpose and Motivation
The cold start phase was introduced for [[entities/deepseek-r1.md]] to address the early instability and poor readability observed in the purely RL-driven [[entities/deepseek-r1-zero.md]] (Source: DeepSeek_R1.pdf). It aims to provide a stable, human-friendly starting point for the subsequent [[concepts/reinforcement-learning-reasoning.md]] process.

## Implementation
Thousands of long, detailed Chain-of-Thought (CoT) examples are collected using methods like few-shot prompting and human refinement (Source: DeepSeek_R1.pdf). The base model (DeepSeek-V3-Base) is then supervised fine-tuned on this data, establishing an initial "actor" for RL (Source: DeepSeek_R1.pdf).

## Key Design Features
A crucial aspect is the design of a readable output pattern: `|special_token|<reasoning_process>|special_token|<summary>` (Source: DeepSeek_R1.pdf). The data is filtered to ensure reader-friendly formatting, including a final summary, which directly tackles the readability issues of the zero-start approach (Source: DeepSeek_R1.pdf).

## Advantages
This approach provides better initial performance and convergence potential compared to starting RL from scratch, as it incorporates human priors about desirable reasoning structure and presentation (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning-reasoning.md]]