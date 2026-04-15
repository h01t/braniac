# DeepSeek_R1.pdf

**Summary**: A research paper detailing the development, training methodology, and evaluation of the DeepSeek-R1 reasoning model and its precursor, DeepSeek-R1-Zero.
**Source Context**: DeepSeek_R1.pdf

---

## Paper Overview
This document presents the DeepSeek-R1 project, focusing on training large language models for advanced reasoning. It contrasts two primary approaches: DeepSeek-R1-Zero, which uses reinforcement learning (RL) from a base model without supervised fine-tuning, and DeepSeek-R1, which incorporates a cold-start phase with human-friendly data.

## Key Sections
The paper outlines the self-evolution process of [[concepts/self-evolution-rl.md]], the emergence of an "aha moment," and the drawbacks of the zero-shot approach, such as poor readability. It then details the four-stage pipeline for DeepSeek-R1: cold start data collection, reasoning-oriented RL, rejection sampling with SFT, and a final RL phase for all scenarios.

The latter sections cover a [[concepts/distillation-reasoning-capabilities.md]] technique to transfer reasoning skills to smaller models and present comprehensive benchmark evaluations comparing DeepSeek-R1 against models like Claude-3.5-Sonnet, GPT-4o, and OpenAI's o1 series.

## Related pages
- [[concepts/self-evolution-rl.md]]
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]