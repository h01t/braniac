# Qwen Models

**Summary**: A series of open-source language models developed by Qwen, used in the distillation experiments to demonstrate the transfer of reasoning capabilities.
**Source Context**: DeepSeek_R1.pdf

---

## Role in Distillation
Several Qwen model variants were used as base models for the [[concepts/distillation-reasoning-capabilities.md]] experiments. These models were fine-tuned on the ~800k sample SFT dataset curated from the [[entities/deepseek-r1.md]] training pipeline (Source: DeepSeek_R1.pdf).

## Specific Models Used
The paper lists the following Qwen models: Qwen2.5-Math-1.5B, Qwen2.5-Math-7B, Qwen2.5-14B, and Qwen2.5-32B. The "Math" variants indicate models pre-trained with a focus on mathematical reasoning (Source: DeepSeek_R1.pdf).

The goal was to show that the distilled reasoning data could significantly enhance the reasoning abilities of these smaller, efficient models (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/distillation-reasoning-capabilities.md]]
- [[entities/llama-models.md]]