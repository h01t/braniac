# Llama Models

**Summary**: Open-source language models developed by Meta AI, used alongside Qwen models in distillation experiments to transfer reasoning capabilities.
**Source Context**: DeepSeek_R1.pdf

---

## Role in Distillation
Llama models were used as base models for the [[concepts/distillation-reasoning-capabilities.md]] experiments. They were fine-tuned on the SFT dataset curated from the [[entities/deepseek-r1.md]] pipeline to evaluate the generalizability of the distillation technique across different model families (Source: DeepSeek_R1.pdf).

## Specific Models Used
The paper mentions using **Llama-3.1-8B** and **Llama-3.3-70B-Instruct**. Llama-3.3 was selected because its reasoning capability was noted to be slightly better than Llama-3.1's (Source: DeepSeek_R1.pdf).

As with the [[entities/qwen-models.md]], only supervised fine-tuning was applied without an RL stage for these distilled models (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/distillation-reasoning-capabilities.md]]
- [[entities/qwen-models.md]]