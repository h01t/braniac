# DeepSeek-R1-Distill-Qwen-32B

**Summary**: A 32-billion parameter model created by distilling DeepSeek-R1, which significantly outperforms both its RL-trained counterpart and other comparable models like o1-mini.
**Source Context**: DeepSeek_R1.pdf (Table 5, Table 6, Section 4.1).

---

## Star Performer in Distillation
[[entities/deepseek-r1-distill-qwen-32b.md]] is presented as one of the most successful outcomes of the [[concepts/knowledge-distillation.md]] experiments. It is the direct point of comparison for the RL-trained [[entities/deepseek-r1-zero-qwen-32b.md]].

## Benchmark Results
The model achieved top scores among the distilled models in Table 5, including 72.6% on [[entities/aime-2024.md]], 83.3% on [[entities/math-500.md]], and 57.2% on [[entities/livecodebench.md]]. In the critical comparison in Table 6, it significantly exceeded the performance of both [[entities/qwq-32b-preview.md]] and the RL-trained [[entities/deepseek-r1-zero-qwen-32b.md]] on all five benchmarks. The paper states it "significantly exceed[s] o1-mini on most benchmarks."

## Related pages
- [[concepts/distillation-vs-reinforcement-learning.md]]
- [[concepts/knowledge-distillation.md]]
- [[entities/deepseek-r1-zero-qwen-32b.md]]