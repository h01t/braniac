# QwQ-32B-Preview

**Summary**: A 32-billion parameter preview model from the QwQ project, designed for deep reflection and reasoning, used as a baseline for comparison in the DeepSeek-R1 paper.
**Source Context**: DeepSeek_R1.pdf

---

## Role as a Benchmark
In the DeepSeek-R1 research, **QwQ-32B-Preview** serves as an important benchmark and point of comparison. It represents a strong, publicly discussed reasoning model against which the performance of new techniques can be measured.

## Performance Comparisons
The paper makes several direct comparisons to QwQ-32B-Preview:
1.  **Vs. Distilled Models**: The distilled model [[entities/deepseek-r1-distill-qwen-14b.md]] (14B parameters) is reported to **"surpass QwQ-32B-Preview on all evaluation metrics"** (Source: DeepSeek_R1.pdf). The larger [[entities/deepseek-r1-distill-qwen-32b.md]] also outperforms it.
2.  **Vs. RL-trained Models**: The pure RL-trained model **DeepSeek-R1-Zero-Qwen-32B** (trained from Qwen-32B-Base) achieved performance **"on par with QwQ-32B-Preview"** (Source: DeepSeek_R1.pdf, Table 6). This established a baseline for what large-scale RL from scratch could achieve on a 32B model.

These comparisons helped the researchers quantify the gains from their distillation strategy versus a strong existing model and versus their own RL-from-scratch approach.

## Related pages
- [[entities/deepseek-r1-distill-qwen-32b.md]]
- [[entities/deepseek-r1-zero.md]]
- [[concepts/knowledge-distillation.md]]
- [[concepts/benchmarking.md]]