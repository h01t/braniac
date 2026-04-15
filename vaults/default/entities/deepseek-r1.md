# DeepSeek-R1

**Summary**: An enhanced reasoning model that uses cold-start data and a multi-stage training pipeline to achieve state-of-the-art reasoning performance, addressing limitations of the pure RL approach.
**Source Context**: DeepSeek_R1.pdf

---

## Overview

DeepSeek-R1 is the flagship reasoning model presented in the paper. It builds upon the lessons from [[entities/deepseek-r1-zero.md]] by incorporating a small amount of [[concepts/cold-start-data.md]] and a more complex training pipeline to achieve stronger and more robust reasoning capabilities.

## Training Pipeline

The development of DeepSeek-R1 involves four key stages:
1. **Cold-Start Fine-Tuning**: The base model [[entities/deepseek-v3-base.md]] is fine-tuned on thousands of long chain-of-thought examples.
2. **Reasoning-Oriented RL**: Similar to DeepSeek-R1-Zero, RL is applied to this fine-tuned checkpoint to further enhance reasoning.
3. **Rejection Sampling and SFT**: New supervised data is created via rejection sampling from an RL checkpoint, combined with data from other domains (writing, QA), and used for another round of SFT.
4. **RL for All Scenarios**: A final RL stage is conducted using prompts from both reasoning and non-reasoning scenarios to improve general alignment.

## Performance

DeepSeek-R1 achieves performance comparable to OpenAI-o1-1217 on reasoning tasks:
- **AIME 2024**: 79.8% Pass@1
- **MATH-500**: 97.3% Pass@1
- **Codeforces**: 2029 Elo rating (top 96.3% of human participants)
It also excels in knowledge tasks (MMLU, GPQA) and general capabilities like creative writing and long-context understanding.

## Distillation and Open-Sourcing

The reasoning capabilities of DeepSeek-R1 are distilled into smaller models via [[concepts/distillation-reasoning.md]], resulting in a family of open-source models that set new records. The model itself and its API are released to support research.

## Related pages
- [[concepts/cold-start-data.md]]
- [[entities/deepseek-r1-zero.md]]
- [[entities/openai-o1-series.md]]