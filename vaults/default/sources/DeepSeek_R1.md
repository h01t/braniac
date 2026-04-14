# DeepSeek-R1 Paper
**Source:** DeepSeek_R1.pdf (Batch 1 of 3 - Partial)

This document is a research paper titled "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning" by DeepSeek-AI.

## Abstract
The paper introduces two reasoning models: **[[entities/DeepSeek_R1_Zero.md]]** and **[[entities/DeepSeek_R1.md]]**. DeepSeek-R1-Zero is trained via large-scale **[[concepts/Reinforcement_Learning_Reasoning.md]]** without **[[concepts/Cold_Start.md|supervised fine-tuning (SFT)]]**, demonstrating emergent reasoning behaviors. DeepSeek-R1 incorporates a cold-start phase and multi-stage training to address issues like poor readability, achieving performance comparable to **[[entities/OpenAI_o1_1217.md]]**.

## Key Contributions
1. **Post-Training via RL:** Demonstrates reasoning capabilities can be incentivized purely through RL without SFT.
2. **Pipeline for DeepSeek-R1:** Uses a multi-stage pipeline with RL and SFT.
3. **Distillation:** Shows reasoning patterns from large models can be distilled into smaller dense models (e.g., based on **[[entities/Qwen.md]]** and **[[entities/Llama.md]]**), achieving strong benchmark performance.

## Key Results (From Partial Text)
- **DeepSeek-R1-Zero:** Achieves 71.0% Pass@1 on AIME 2024 (up from 15.6%), and 86.7% with majority voting.
- **DeepSeek-R1:** Matches OpenAI-o1-1217 on reasoning tasks (e.g., 79.8% on AIME 2024, 97.3% on MATH-500).
- **Distilled Models:** Smaller distilled models (e.g., 7B, 32B) show exceptional reasoning, outperforming previous open-source models.

## Method Overview
- **DeepSeek-R1-Zero:** Applies **[[concepts/Group_Relative_Policy_Optimization.md|GRPO]]** directly to **[[entities/DeepSeek_V3_Base.md]]**.
- **DeepSeek-R1:** Adds a cold-start SFT phase followed by reasoning-oriented RL.
- **Reward Modeling:** Uses rule-based accuracy and format rewards (no neural reward model to avoid hacking).
- **Training Template:** Uses a simple template with `<think>` and `<answer>` tags to structure reasoning.

*Note: This summary is based on the first part of the paper. More details are expected in subsequent batches.*