# DeepSeek-R1-Distill-Qwen-1.5B

**Summary**: A very small 1.5-billion parameter model created by distilling knowledge from the DeepSeek-R1 teacher model.
**Source Context**: DeepSeek_R1.pdf (Table 5, Section 5).

---

## Performance
Despite its small size, [[entities/deepseek-r1-distill-qwen-1-5b.md]] demonstrates the power of [[concepts/knowledge-distillation.md]]. The paper notes it "outperforms GPT-4o and Claude-3.5-Sonnet on math benchmarks" with scores of 28.9% on [[entities/aime-2024.md]] and 83.9% on [[entities/math-500.md]] (Source: DeepSeek_R1.pdf, Table 5, Section 5).

## Significance
The strong performance of this tiny model underscores the paper's key finding: distilling reasoning capability from a powerful model like [[entities/deepseek-r1.md]] is an extremely efficient way to create competent smaller models, far exceeding the performance of standard instruction-tuned models based on the same base checkpoint.

## Related pages
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1.md]]