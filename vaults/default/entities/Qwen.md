# Qwen (Qwen2.5)
**Source:** [[sources/DeepSeek_R1.md]]

Qwen (specifically Qwen2.5) is a series of open-source language models developed by Qwen. In the DeepSeek-R1 paper, Qwen models are used as base models for **[[concepts/Distillation_Reasoning.md|distillation]]**.

## Role in DeepSeek-R1
- **Distillation Base:** The reasoning data from **[[entities/DeepSeek_R1.md]]** is used to fine-tune Qwen2.5 models (e.g., 7B, 32B).
- **Performance:** Distilled Qwen models achieve strong reasoning results, e.g., DeepSeek-R1-Distill-Qwen-32B scores 72.6% on AIME 2024.
- **Comparison:** Distilled models outperform applying RL directly on Qwen and set new records for open-source dense models.

## Released Models
The paper open-sources distilled checkpoints based on Qwen2.5 at sizes 1.5B, 7B, 8B, 14B, 32B, and 70B.