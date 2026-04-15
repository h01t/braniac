# DeepSeek-R1

**Summary**: An enhanced reasoning model that builds upon DeepSeek-R1-Zero by incorporating cold-start supervised fine-tuning data and a multi-stage training pipeline, achieving performance comparable to OpenAI-o1-1217.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
DeepSeek-R1 is the flagship reasoning model introduced in the DeepSeek-R1 paper. It addresses the limitations of [[entities/deepseek-r1-zero.md]] (e.g., poor readability) and further enhances reasoning performance through a more sophisticated training pipeline.

## Training Pipeline
The pipeline involves multiple stages:
1. **Cold Start**: The base model [[entities/deepseek-v3-base.md]] is fine-tuned with thousands of long chain-of-thought ([[concepts/chain-of-thought.md]]) examples to provide an initial reasoning capability.
2. **Reasoning-oriented RL**: Similar to DeepSeek-R1-Zero, the model undergoes reinforcement learning ([[concepts/reinforcement-learning.md]]) using the [[entities/grpo.md]] algorithm to discover improved reasoning patterns.
3. **Rejection Sampling and SFT**: Upon RL convergence, new SFT data is created via rejection sampling from the RL checkpoint, combined with supervised data from DeepSeek-V3 in domains like writing and factual QA. The base model is then retrained on this data.
4. **RL for All Scenarios**: The fine-tuned model undergoes an additional RL process considering prompts from all scenarios (not just reasoning) to improve alignment and general capability.

## Performance
As reported in the paper, DeepSeek-R1 achieves state-of-the-art performance on reasoning benchmarks:
- **AIME 2024**: 79.8% pass@1 (slightly surpassing OpenAI-o1-1217).
- **MATH-500**: 97.3% pass@1 (on par with OpenAI-o1-1217).
- **Coding**: 2,029 Elo rating on Codeforces, outperforming 96.3% of human participants.
- **Knowledge**: Scores 90.8% on MMLU, 84.0% on MMLU-Pro, and 71.5% on GPQA Diamond, competitive with but slightly below OpenAI-o1-1217.
- **General Tasks**: Excels in creative writing, QA, editing, and long-context understanding, with a 87.6% win-rate on AlpacaEval 2.0 and 92.3% on ArenaHard.

## Distillation
The paper also details [[concepts/distillation.md]] from DeepSeek-R1 to smaller dense models (Qwen and Llama series), resulting in highly capable models that outperform previous open-source benchmarks.

## Significance
DeepSeek-R1 demonstrates that combining cold-start SFT with multi-stage RL can produce a model with strong reasoning and general capabilities, rivaling leading closed-source models. The open-source release of the model and pipeline aims to benefit the research community.

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[concepts/reinforcement-learning.md]]
- [[sources/deepseek-r1-paper.md]]