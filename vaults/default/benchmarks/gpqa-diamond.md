# GPQA Diamond

**Summary**: A "graduate-level Google-proof" question-answering benchmark designed to test deep, expert-level knowledge and reasoning.
**Source Context**: DeepSeek_R1.pdf

---

## Benchmark Overview
**GPQA (Graduate-Level Google-Proof Q&A)** is a benchmark introduced by Rein et al. (2023) featuring challenging questions at the level of expert PhD candidates. The "Diamond" subset likely refers to the most difficult tier of questions. It is designed so that answers cannot be easily found via simple web search, requiring genuine comprehension and reasoning.

In the DeepSeek-R1 paper, GPQA Diamond is used as a benchmark for evaluating advanced, specialist-level reasoning capabilities (Source: DeepSeek_R1.pdf).

## Usage in DeepSeek-R1 Evaluation
Performance on GPQA Diamond (pass@1 percentage) is reported in Table 5. It shows:
*   [[entities/openai-o1-mini.md]]: 90.0%
*   [[entities/qwq-32b-preview.md]]: 90.6%
*   [[entities/deepseek-r1-distill-qwen-32b.md]]: 94.3% (Source: DeepSeek_R1.pdf)

The high scores across models indicate it is a difficult benchmark where even top models have room for improvement. The distilled DeepSeek models show competitive performance.

## Related pages
- [[concepts/benchmarking.md]]
- [[benchmarks/aime-2024.md]]
- [[benchmarks/livecodebench.md]]