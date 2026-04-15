# Distillation for Reasoning Capability

**Summary**: A technique to transfer the reasoning capabilities of a large model to smaller, more efficient open-source models via supervised fine-tuning on curated data.
**Source Context**: DeepSeek_R1.pdf

---

## Method
The distillation process involves directly fine-tuning smaller open-source models, such as [[entities/qwen-models.md]] and [[entities/llama-models.md]], using the ~800k sample dataset curated during the [[concepts/rejection-sampling-sft-reasoning.md]] stage of [[entities/deepseek-r1.md]] training. This is a straightforward SFT approach without an additional RL stage (Source: DeepSeek_R1.pdf).

## Models and Goal
Base models used include Qwen2.5-Math-1.5B, 7B, 14B, 32B, Llama-3.1-8B, and Llama-3.3-70B-Instruct. The primary goal is to demonstrate the effectiveness of the distillation technique in enhancing reasoning abilities, leaving the exploration of an RL stage for the community (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]
- [[entities/qwen-models.md]]
- [[entities/llama-models.md]]