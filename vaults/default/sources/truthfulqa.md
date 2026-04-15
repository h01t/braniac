# TruthfulQA: Measuring How Models Mimic Human Falsehoods

**Summary**: A benchmark designed to measure whether language models generate truthful answers to questions, focusing on their tendency to reproduce common human misconceptions and falsehoods.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Overview
TruthfulQA is a benchmark that evaluates the truthfulness of language model generations. It consists of questions that some humans would answer falsely due to misconceptions (e.g., about health, history, law). The benchmark tests whether models, trained on vast human text corpora, simply replicate popular falsehoods or can provide accurate, truthful information. It addresses the critical issue of [[concepts/hallucination-in-llms.md]] and model reliability.

## Key Details
*   **Authors**: Lin, S., Hilton, J., Evans, O.
*   **Venue**: arXiv preprint arXiv:2109.07958.
*   **Year**: 2021.
*   **Focus**: Truthfulness, avoiding misinformation, factuality.

## Related Concepts
This benchmark is central to evaluating [[concepts/ai-safety.md]] and [[concepts/trustworthiness.md]] in LLMs. It relates to work on fact-checking like [[sources/fever.md]] and bias measurement like [[sources/stereoset.md]].

## Related pages
- [[concepts/benchmarks.md]]
- [[concepts/ai-safety.md]]
- [[concepts/hallucination-in-llms.md]]