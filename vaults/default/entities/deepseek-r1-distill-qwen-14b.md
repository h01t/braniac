# DeepSeek-R1-Distill-Qwen-14B

**Summary**: A 14-billion parameter distilled model that surpassed the performance of the larger 32B QwQ-32B-Preview model across all evaluation metrics.
**Source Context**: DeepSeek_R1.pdf

---

## Model Overview
**DeepSeek-R1-Distill-Qwen-14B** is a mid-sized model in the distilled family, created by applying [[concepts/knowledge-distillation.md]] to a Qwen-14B base model. The paper also abbreviates it as **DeepSeek-R1-14B** (Source: DeepSeek_R1.pdf).

## Performance
As reported in Table 5, the model achieved strong results, including 69.7% on [[benchmarks/aime-2024.md]], 80.0% on [[benchmarks/math-500.md]], and 93.9% on [[benchmarks/gpqa-diamond.md]] (Source: DeepSeek_R1.pdf).

## Key Comparative Result
The paper highlights a specific finding regarding this model: **"DeepSeek-R1-14B surpasses QwQ-32B-Preview on all evaluation metrics"** (Source: DeepSeek_R1.pdf). This means a distilled 14B model outperformed a strong 32B model ([[entities/qwq-32b-preview.md]]) that was not specialized via the same distillation process. This further underscores the efficiency gains of the distillation approach.

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[entities/qwq-32b-preview.md]]
- [[entities/deepseek-r1.md]]