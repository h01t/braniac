# Evaluation Benchmarks for Reasoning Models

**Summary**: A comprehensive set of benchmarks used to evaluate the reasoning, knowledge, coding, and general capabilities of models like DeepSeek-R1 against state-of-the-art baselines.
**Source Context**: DeepSeek_R1.pdf

---

## Benchmark Categories
The paper evaluates models across multiple categories (Source: DeepSeek_R1.pdf):
*   **Knowledge & QA**: MMLU, MMLU-Pro, GPQA Diamond, SimpleQA, C-Eval, CMMLU.
*   **Code**: LiveCodeBench, Codeforces, SWE-Bench Verified, Aider.
*   **Mathematics**: AIME 2024, MATH-500, CNMO 2024.
*   **Instruction Following & Safety**: IF-Eval, FRAMES.
*   **Open-ended Generation**: AlpacaEval 2.0, Arena-Hard (using LLMs as judges).

## Evaluation Methodology
For reasoning tasks, the paper primarily uses **pass@k** evaluation (e.g., pass@9) with sampling (temperature=0.6, top-p=0.95) rather than greedy decoding, to reduce variability and repetition. For some benchmarks like AIME 2024, a consensus (majority vote) result from 64 samples is also reported (Source: DeepSeek_R1.pdf).

Outputs are capped at 32,768 tokens. For generation benchmarks, only the final summary is fed to the judge (e.g., GPT-4) to avoid length bias (Source: DeepSeek_R1.pdf).

## Key Comparative Findings
As shown in the paper's results table, [[entities/deepseek-r1.md]] shows strong performance, particularly in mathematics and coding, achieving results on par with OpenAI-o1-1217 on several key benchmarks like AIME 2024 and MATH-500. It also shows significant improvement over its base model, [[entities/deepseek-v3-base.md]], in STEM-related knowledge benchmarks like MMLU-Pro and GPQA Diamond (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1.md]]
- [[entities/deepseek-v3-base.md]]