# DeepSeek-R1-Distill-Qwen-1.5B

**Summary**: A very small 1.5-billion parameter model created by distilling the DeepSeek-R1 teacher, notable for outperforming much larger general-purpose models on math benchmarks.
**Source Context**: DeepSeek_R1.pdf

---

## Model Overview
**DeepSeek-R1-Distill-Qwen-1.5B** is the smallest model in the distilled family presented in the DeepSeek-R1 paper. It was created by applying [[concepts/knowledge-distillation.md]] (SFT) to a Qwen-1.5B base model using samples from the [[entities/deepseek-r1.md]] teacher (Source: DeepSeek_R1.pdf).

## Performance and Significance
Despite its small size, this model's performance was highlighted as particularly impressive:
*   The paper states it **"outperforms GPT-4o and Claude-3.5-Sonnet on math benchmarks with 28.9% on AIME and 83.9% on MATH"** (Source: DeepSeek_R1.pdf).
*   This result starkly demonstrates the power of distillation. A tiny 1.5B parameter model, specialized via distillation from a reasoning expert, can surpass massive general-purpose models (like GPT-4o with likely over a trillion parameters) on specific, difficult reasoning tasks.
*   It serves as strong evidence for the paper's thesis that distillation is an economical and effective method for creating capable small models.

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1.md]]
- [[benchmarks/aime-2024.md]]
- [[benchmarks/math-500.md]]