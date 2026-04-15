# LiveCodeBench

**Summary**: A holistic and contamination-free evaluation suite for benchmarking large language models on code generation tasks.
**Source Context**: DeepSeek_R1.pdf

---

## Benchmark Overview
**LiveCodeBench**, introduced by Jain et al. (2024), is designed to provide a robust evaluation of LLM coding abilities. Its key features include being "holistic" (covering various aspects of coding) and "contamination free" (mitigating the issue of benchmark data being present in training sets, which can inflate scores).

In the DeepSeek-R1 paper, LiveCodeBench is used as the primary coding benchmark to evaluate models' software engineering and programming capabilities (Source: DeepSeek_R1.pdf).

## Usage in DeepSeek-R1 Evaluation
The paper reports pass@1 scores on LiveCodeBench in Table 5. Examples include:
*   [[entities/openai-o1-mini.md]]: 60.0%
*   [[entities/qwq-32b-preview.md]]: 54.5%
*   [[entities/deepseek-r1-distill-qwen-32b.md]]: 62.1% (Source: DeepSeek_R1.pdf)

The paper notes a limitation: **"large-scale RL has not been applied extensively in software engineering tasks"** for DeepSeek-R1 due to long evaluation times hindering RL loop efficiency. As a result, DeepSeek-R1 did not show a huge improvement over its base model on coding benchmarks like LiveCodeBench, pointing to an area for future work (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/benchmarking.md]]
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[benchmarks/gpqa-diamond.md]]