# Benchmarks

**Summary**: Standardized datasets and tasks used to evaluate, compare, and track the progress of AI and NLP models, particularly large language models.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Overview
In AI and NLP, benchmarks are critical tools for objectively measuring model capabilities. They provide a common ground for comparing different architectures and training approaches. For [[concepts/large-language-models.md]], benchmarks span a wide range of cognitive tasks including [[concepts/machine-reading-comprehension.md]], [[concepts/question-answering.md]], [[concepts/code-generation.md]], [[concepts/reasoning.md]], and [[concepts/bias-detection.md]].

The development of increasingly difficult and diverse benchmarks has been a key driver in the advancement of LLMs, pushing them from pattern recognition towards more general reasoning and problem-solving.

## Types of Benchmarks
*   **Knowledge & QA**: Test factual knowledge and answer retrieval (e.g., [[sources/natural-questions.md]], [[sources/drcd.md]]).
*   **Reasoning**: Evaluate logical, mathematical, or commonsense reasoning (e.g., [[sources/logiqa.md]], GSM8K).
*   **Robustness & Safety**: Measure model reliability, truthfulness, and safety (e.g., [[sources/truthfulqa.md]], [[sources/realtoxicityprompts.md]], [[sources/bbq-bias-benchmark.md]]).
*   **Specialized Tasks**: Target specific skills like coding ([[sources/code-competence-apps.md]]), summarization, or translation.
*   **Multi-task & Instruction**: Evaluate generalization across many tasks from a single model (e.g., BIG-bench, SuperGLUE).

## Role in LLM Development
Benchmarks serve as the primary metric for claiming state-of-the-art (SOTA) performance. They are used to identify model weaknesses (e.g., via adversarial benchmarks like [[sources/dureaderrobust.md]]) and guide research directions. However, there is an ongoing concern about models overfitting to benchmark data, leading to the creation of hidden test sets and dynamic benchmarks.

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/evaluation.md]]
- [[concepts/machine-reading-comprehension.md]]
- [[concepts/question-answering.md]]