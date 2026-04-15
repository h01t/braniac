# MATH-500

**Summary**: A large-scale dataset of 500 mathematical problems used to benchmark the reasoning capabilities of language models.
**Source Context**: DeepSeek_R1.pdf

---

## Benchmark Overview
**MATH-500** is a benchmark dataset containing 500 mathematical problems. While the exact provenance isn't detailed in the DeepSeek-R1 excerpt, it is clearly a substantial collection used for evaluating mathematical reasoning, likely related to or an extension of other MATH datasets (e.g., from Hendrycks et al.).

It is listed alongside [[benchmarks/aime-2024.md]] and [[benchmarks/gpqa-diamond.md]] as a core reasoning benchmark in the paper (Source: DeepSeek_R1.pdf).

## Usage in DeepSeek-R1 Evaluation
Performance on MATH-500 (pass@1 percentage) is a primary metric in Table 5 of the paper. Notable scores include:
*   [[entities/openai-o1-mini.md]]: 80.0%
*   [[entities/qwq-32b-preview.md]]: 60.0%
*   [[entities/deepseek-r1-distill-qwen-1-5b.md]]: 83.9%
*   [[entities/deepseek-r1-distill-qwen-32b.md]]: 94.3% (Source: DeepSeek_R1.pdf)

The high score (83.9%) of the tiny 1.5B distilled model on this benchmark was highlighted as evidence of effective [[concepts/knowledge-distillation.md]].

## Related pages
- [[concepts/benchmarking.md]]
- [[benchmarks/aime-2024.md]]
- [[entities/deepseek-r1-distill-qwen-1-5b.md]]