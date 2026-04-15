# DeepSeek-R1

**Summary**: A reasoning model built upon the DeepSeek-R1-Zero approach, incorporating a cold-start phase with human-readable chain-of-thought data and multi-stage reinforcement learning for improved performance and alignment.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
DeepSeek-R1 is an evolution of the [[entities/deepseek-r1-zero.md]] methodology, designed to address its limitations in readability and to potentially accelerate convergence (Source: DeepSeek_R1.pdf). The training pipeline consists of four key stages: Cold Start, Reasoning-oriented Reinforcement Learning, Rejection Sampling and Supervised Fine-Tuning (SFT), and Reinforcement Learning for all Scenarios (Source: DeepSeek_R1.pdf).

## Cold Start Phase
Unlike DeepSeek-R1-Zero, DeepSeek-R1 begins with a [[concepts/cold-start-rl.md|cold start]]: the base model (DeepSeek-V3-Base) is fine-tuned on a small, curated dataset of long, readable Chain-of-Thought (CoT) examples (Source: DeepSeek_R1.pdf). This data is collected via methods like few-shot prompting and post-processing by human annotators. A key design is a readable output format: `|special_token|<reasoning_process>|special_token|<summary>` (Source: DeepSeek_R1.pdf).

## Reasoning-Oriented RL
After the cold start, the model undergoes large-scale [[concepts/reinforcement-learning-reasoning.md]], similar to DeepSeek-R1-Zero, focusing on reasoning-intensive tasks (Source: DeepSeek_R1.pdf). To combat language mixing, a language consistency reward is introduced, which slightly trades off performance for improved human readability (Source: DeepSeek_R1.pdf). The final reward combines task accuracy and this language reward.

## SFT Data Curation and Training
Once RL converges, the model checkpoint is used to gather SFT data via [[concepts/rejection-sampling.md]] (Source: DeepSeek_R1.pdf). This stage expands the dataset to include approximately 600k reasoning samples and 200k non-reasoning samples (e.g., writing, factual QA). The combined ~800k sample dataset is used to fine-tune the base model (Source: DeepSeek_R1.pdf).

## RL for Alignment
A final RL stage aligns the model with broader human preferences for helpfulness and harmlessness (Source: DeepSeek_R1.pdf). For reasoning tasks, it uses rule-based rewards; for general tasks, it uses reward models. Helpfulness is judged on the final summary, while harmlessness assesses the entire response (Source: DeepSeek_R1.pdf).

## Performance
As shown in Table 4, DeepSeek-R1 demonstrates strong performance across benchmarks, often matching or exceeding models like OpenAI-o1-1217 in mathematics and coding (Source: DeepSeek_R1.pdf). It shows significant gains over its predecessor, DeepSeek-V3, on STEM and reasoning tasks, attributed to large-scale RL (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[concepts/cold-start-rl.md]]
- [[concepts/reinforcement-learning-reasoning.md]]
- [[concepts/rejection-sampling.md]]
- [[concepts/distillation-reasoning.md]]