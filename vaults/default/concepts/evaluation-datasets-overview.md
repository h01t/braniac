# Evaluation Datasets and Benchmarks for LLMs

**Summary**: A categorized overview of datasets and benchmarks used to evaluate the capabilities of large language models across tasks like reasoning, understanding, and safety.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Introduction
Evaluating large language models requires a diverse battery of tests. Benchmarks are grouped by the type of capability they probe, such as multi-task proficiency, language understanding, mathematical reasoning, or bias detection.

## Categorized Evaluation Benchmarks
*   **Multi-Task**: Benchmarks that aggregate many tasks, including [[sources/mmlu-benchmark.md]], [[sources/superglue-benchmark.md]], [[sources/big-bench-benchmark.md]], [[sources/glue-benchmark.md]], and [[sources/helm-benchmark.md]].
*   **Language Understanding**: Tests for core language skills, including [[sources/wikitext103-dataset.md]], [[sources/pg19-dataset.md]], [[sources/c4-dataset.md]], [[sources/lcqmc-dataset.md]], and [[sources/race-dataset.md]].
*   **Story Cloze & Sentence Completion**: Tests for narrative coherence and context, like [[sources/storycloze-dataset.md]] and [[sources/lambada-dataset.md]].
*   **Physical & World Knowledge**: Tests of real-world and factual knowledge, including [[sources/piqa-dataset.md]], [[sources/triviaqa-dataset.md]], and the [[sources/arc-dataset.md]] family.
*   **Commonsense Reasoning**: Tests requiring everyday reasoning, such as [[sources/hellaswag-dataset.md]], [[sources/copa-dataset.md]], and [[sources/commonsenseqa-dataset.md]].
*   **Reading Comprehension**: Tests of understanding written passages, like [[sources/squad-dataset.md]], [[sources/boolq-dataset.md]], and [[sources/drop-dataset.md]].
*   **Mathematical Reasoning**: Tests of quantitative problem-solving, including [[sources/math-dataset.md]], [[sources/gsm8k-dataset.md]], and [[sources/mathqa-dataset.md]].
*   **Problem Solving & Coding**: Tests of algorithmic and coding ability, like [[sources/humaneval-dataset.md]] and [[sources/mbpp-dataset.md]].
*   **Truthfulness & Fact Checking**: Tests for generating true statements and avoiding hallucinations, such as [[sources/truthfulqa-dataset.md]].
*   **Bias & Ethics**: Tests for detecting and mitigating model biases, including [[sources/ethos-dataset.md]] and [[sources/stereoset-dataset.md]].
*   **Cross-Lingual Understanding**: Tests for capabilities across languages, like [[sources/xnli-dataset.md]] and [[sources/paws-x-dataset.md]].

## Related pages
- [[concepts/large-language-models.md]]
- [[concepts/model-evaluation.md]]
- [[concepts/training-datasets-overview.md]]