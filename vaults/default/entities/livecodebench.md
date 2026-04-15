# LiveCodeBench

**Summary**: A holistic and contamination-free benchmark for evaluating large language models on code generation tasks.
**Source Context**: DeepSeek_R1.pdf (Table 5, Table 6, References: Jain et al., 2024).

---

## Benchmark Role
[[entities/livecodebench.md]] is used to evaluate the coding capabilities of the models. It is part of the "reasoning-related benchmarks," linking coding proficiency to systematic reasoning.

## Performance Context
The benchmark uses a "cons@64" metric (likely consensus over 64 samples). The best-performing model on this metric in the provided tables was [[entities/openai-o1-mini.md]] with a score of 717. Among the DeepSeek models, the distilled 32B and 70B variants scored 1691 and 1633 respectively on an unspecified but related metric (pass@1 is reported for other benchmarks).

## Related pages
- [[concepts/reasoning-ability.md]]