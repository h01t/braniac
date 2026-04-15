# Benchmarking

**Summary**: The practice of evaluating and comparing the performance of AI models on standardized sets of tasks and datasets.
**Source Context**: DeepSeek_R1.pdf

---

## Benchmarks Used in DeepSeek-R1 Evaluation
The DeepSeek-R1 paper evaluates model performance on a suite of reasoning-focused benchmarks to measure progress in different domains. Key benchmarks include:

*   **Mathematical Reasoning**:
    *   [[benchmarks/aime-2024.md]] (American Invitational Mathematics Examination): A challenging math competition for high school students.
    *   [[benchmarks/math-500.md]]: A large-scale dataset of math problems.
*   **Scientific & Expert Knowledge**:
    *   [[benchmarks/gpqa-diamond.md]] (Graduate-Level Google-Proof Q&A): A difficult, expert-level question-answering benchmark.
*   **Coding**:
    *   [[benchmarks/livecodebench.md]]: A holistic evaluation suite for code generation by LLMs.

These benchmarks are used to compare models like [[entities/deepseek-r1.md]], [[entities/openai-o1-mini.md]], and [[entities/qwq-32b-preview.md]] (Source: DeepSeek_R1.pdf, Table 5).

## Insights from Benchmark Results
The benchmark results drive several key conclusions in the paper:
*   They demonstrate the effectiveness of [[concepts/knowledge-distillation.md]], showing that small distilled models can outperform much larger general-purpose models on reasoning tasks (Source: DeepSeek_R1.pdf).
*   They provide a direct comparison between models trained with [[concepts/reinforcement-learning-rl-for-reasoning.md]] from scratch and those created via distillation, clearly showing the superiority of distillation for efficient model creation (Source: DeepSeek_R1.pdf, Table 6).
*   They establish the competitive performance of DeepSeek-R1 against leading models like OpenAI's o1 series.

## Related pages
- [[benchmarks/aime-2024.md]]
- [[benchmarks/math-500.md]]
- [[benchmarks/gpqa-diamond.md]]
- [[benchmarks/livecodebench.md]]
- [[concepts/knowledge-distillation.md]]