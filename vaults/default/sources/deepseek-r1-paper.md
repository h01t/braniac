# DeepSeek-R1 Research Paper

**Summary**: The research paper "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" introduces two reasoning models, DeepSeek-R1-Zero and DeepSeek-R1, trained via large-scale reinforcement learning to enhance reasoning in LLMs without relying on supervised fine-tuning.
**Source Context**: DeepSeek_R1.pdf

---

## Paper Overview

This paper presents a novel approach to enhancing reasoning capabilities in large language models (LLMs) through reinforcement learning (RL). The authors introduce **DeepSeek-R1-Zero**, a model trained purely via RL without any supervised fine-tuning (SFT), and **DeepSeek-R1**, which incorporates a small amount of cold-start data and multi-stage training. The work demonstrates that RL can incentivize the emergence of complex reasoning behaviors like chain-of-thought, self-verification, and reflection.

## Key Contributions

The paper makes several key contributions:
1. **Post-Training via RL**: It validates that reasoning capabilities can be incentivized purely through RL without SFT, as shown by DeepSeek-R1-Zero.
2. **Pipeline for Enhanced Reasoning**: It introduces a multi-stage pipeline for DeepSeek-R1 that combines cold-start data, RL, and SFT to achieve performance comparable to OpenAI's o1-1217 model.
3. **Distillation to Smaller Models**: It shows that reasoning patterns from large models can be effectively distilled into smaller dense models (1.5B to 70B parameters), which then achieve state-of-the-art performance on reasoning benchmarks.

## Evaluation Results

The models are evaluated on a wide range of tasks:
- **Reasoning**: DeepSeek-R1 achieves 79.8% Pass@1 on AIME 2024 and 97.3% on MATH-500, matching OpenAI-o1-1217.
- **Knowledge**: It scores 90.8% on MMLU and 71.5% on GPQA Diamond, outperforming DeepSeek-V3.
- **Others**: It excels in creative writing, long-context understanding, and coding (achieving a 2029 Elo rating on Codeforces).

## Approach Details

The paper details the RL algorithm ([[concepts/group-relative-policy-optimization.md]]), reward modeling ([[concepts/reward-modeling.md]]), and training templates used. It also discusses the self-evolution process of DeepSeek-R1-Zero and the challenges like poor readability that led to the development of DeepSeek-R1.

## Related Concepts and Entities

This paper is central to understanding the development of [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]], and it explores concepts like [[concepts/reinforcement-learning-reasoning.md]], [[concepts/chain-of-thought.md]], and [[concepts/distillation-reasoning.md]].

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning-reasoning.md]]