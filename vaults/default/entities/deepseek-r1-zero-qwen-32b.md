# DeepSeek-R1-Zero-Qwen-32B

**Summary**: A 32-billion parameter model created by applying large-scale reinforcement learning directly to the Qwen-32B-Base model, without distillation.
**Source Context**: DeepSeek_R1.pdf (Section 4.1, Table 6).

---

## Experimental Model
[[entities/deepseek-r1-zero-qwen-32b.md]] was created to answer a specific research question: could a model achieve comparable reasoning performance through large-scale RL alone, without the benefit of [[concepts/knowledge-distillation.md]] from a more powerful teacher?

## Training and Results
The Qwen-32B-Base model underwent large-scale [[concepts/reinforcement-learning.md]] training on math, code, and STEM data for over 10,000 steps. The results (Table 6) showed that its performance was on par with [[entities/qwq-32b-preview.md]] but was **significantly worse** than [[entities/deepseek-r1-distill-qwen-32b.md]] across all reported benchmarks (AIME 2024, MATH-500, GPQA Diamond, LiveCodeBench). For example, it scored 47.0% on AIME versus the distilled model's 72.6%.

## Conclusion from Results
This model's performance was central to the paper's conclusion that distillation is a more economical and effective method for creating capable smaller reasoning models, whereas applying the described RL process directly requires enormous compute and may not reach the same performance level.

## Related pages
- [[concepts/distillation-vs-reinforcement-learning.md]]
- [[concepts/reinforcement-learning.md]]
- [[entities/deepseek-r1-distill-qwen-32b.md]]