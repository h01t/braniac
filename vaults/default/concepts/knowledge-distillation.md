# Knowledge Distillation

**Summary**: A training technique where a smaller "student" model learns to mimic the outputs or behavior of a larger, more powerful "teacher" model, effectively compressing reasoning capability.
**Source Context**: DeepSeek_R1.pdf (Section 3.2, 4.1).

---

## Role in DeepSeek-R1 Research
The paper highlights [[concepts/knowledge-distillation.md]] as a highly effective and economical method for transferring strong [[concepts/reasoning-ability.md]] from large models to smaller ones. The team used [[entities/deepseek-r1.md]] as a teacher to generate 800K training samples, which were then used to fine-tune various smaller "distilled" models.

## Demonstrated Effectiveness
The results were promising. For instance, even the tiny [[entities/deepseek-r1-distill-qwen-1-5b.md]] outperformed models like GPT-4o and Claude-3.5-Sonnet on math benchmarks. Larger distilled models like [[entities/deepseek-r1-distill-qwen-32b.md]] significantly exceeded the performance of other comparable models, including OpenAI's o1-mini, on most reasoning benchmarks (Source: DeepSeek_R1.pdf, Table 5). This demonstrated that distillation could achieve results that were difficult to match with pure [[concepts/reinforcement-learning.md]] on smaller base models.

## Related pages
- [[concepts/distillation-vs-reinforcement-learning.md]]
- [[entities/deepseek-r1.md]]