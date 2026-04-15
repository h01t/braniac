# Reinforcement Learning for Reasoning

**Summary**: The application of reinforcement learning (RL) techniques to train large language models specifically for enhancing their reasoning capabilities on complex tasks.
**Source Context**: DeepSeek_R1.pdf

---

## Core Application
Both [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]] utilize large-scale reinforcement learning as a core training methodology to boost performance on reasoning-intensive tasks like mathematics, coding, and logic (Source: DeepSeek_R1.pdf).

## Process in DeepSeek-R1-Zero
DeepSeek-R1-Zero initiates RL directly from a base model. The model is rewarded based on the correctness of its solutions, which drives a [[concepts/self-evolution.md]] process where it autonomously learns to allocate more computational effort (thinking time) to solve problems (Source: DeepSeek_R1.pdf).

## Process in DeepSeek-R1
DeepSeek-R1 employs RL in two stages: 1) **Reasoning-oriented RL**: Applied after a [[concepts/cold-start-rl.md]], using a combined reward of task accuracy and a language consistency reward to improve readability (Source: DeepSeek_R1.pdf). 2) **RL for all Scenarios**: A final alignment stage using a mix of rule-based rewards (for reasoning) and reward models (for general tasks) to optimize for helpfulness and harmlessness (Source: DeepSeek_R1.pdf).

## Outcome
This RL-focused approach is credited with significant performance gains on STEM and reasoning benchmarks, as seen in the evaluation of DeepSeek-R1 (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]
- [[concepts/self-evolution.md]]
- [[concepts/cold-start-rl.md]]