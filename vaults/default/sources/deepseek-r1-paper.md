# DeepSeek-R1 Paper

**Summary**: The research paper "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" introduces two reasoning models, DeepSeek-R1-Zero and DeepSeek-R1, trained primarily through reinforcement learning, and details their performance on various benchmarks.
**Source Context**: DeepSeek_R1.pdf

---

## Introduction
The paper addresses enhancing reasoning capabilities in large language models (LLMs) through post-training methods, specifically reinforcement learning (RL). It highlights the success of OpenAI's o1 series in inference-time scaling via long chain-of-thought processes and positions DeepSeek's work as an open-source alternative achieving comparable performance. The key goal is to explore the potential of LLMs to develop reasoning without supervised fine-tuning (SFT) data, focusing on self-evolution through RL.

## Approach Overview
The paper presents two main approaches:
1. **DeepSeek-R1-Zero**: Applies RL directly to the base model ([[entities/deepseek-v3-base.md]]) without any SFT data, using the GRPO algorithm ([[entities/grpo.md]]) and rule-based rewards.
2. **DeepSeek-R1**: Incorporates a small amount of cold-start SFT data and a multi-stage pipeline including RL, rejection sampling, and additional SFT to improve readability and performance.
3. **Distillation**: Transfers reasoning patterns from DeepSeek-R1 to smaller dense models (e.g., Qwen, Llama) via supervised fine-tuning.

## Key Results
- **DeepSeek-R1-Zero**: Achieved 71.0% pass@1 on AIME 2024 (up from 15.6%) and 86.7% with majority voting, matching OpenAI-o1-0912. It exhibited emergent reasoning behaviors like self-verification and reflection but suffered from poor readability and language mixing.
- **DeepSeek-R1**: Achieved performance on par with OpenAI-o1-1217, with 79.8% on AIME 2024 and 97.3% on MATH-500. It also excelled in knowledge, coding, and general tasks.
- **Distilled Models**: Smaller models (e.g., 7B, 32B) distilled from DeepSeek-R1 set new records on reasoning benchmarks, outperforming previous open-source models like QwQ-32B-Preview.

## Related Concepts
The work involves [[concepts/reinforcement-learning.md]], [[concepts/chain-of-thought.md]], [[concepts/reward-modeling.md]], and [[concepts/distillation.md]]. It also discusses the [[concepts/self-evolution.md]] of models through RL.

## Conclusion
The paper demonstrates that reasoning capabilities can be significantly improved through large-scale RL, even without SFT, and that distillation effectively transfers these capabilities to smaller models. The models and training pipelines are open-sourced to support the community.

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning.md]]