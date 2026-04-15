# Natural Questions: A Benchmark for Question Answering Research

**Summary**: A large-scale question answering (QA) dataset where questions are real, user-posed queries to Google Search, and answers are drawn from Wikipedia pages, requiring both long-form and short-answer extraction.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Overview
The Natural Questions (NQ) corpus is a significant benchmark in open-domain [[concepts/question-answering.md]]. It consists of naturally occurring questions and requires systems to find answers within the entire text of a Wikipedia page. The benchmark tests a model's ability to comprehend long documents and locate precise answers, making it a key evaluation tool for [[concepts/large-language-models.md]].

The dataset is noted for its scale and realism, as questions are actual search queries.

## Key Details
*   **Authors**: Kwiatkowski, T., Palomaki, J., Redfield, O., Collins, M., Parikh, A., et al.
*   **Venue**: Transactions of the Association for Computational Linguistics, Volume 7.
*   **Year**: 2019.
*   **Content**: Contains over 300,000 question-answer pairs. Answers can be long (paragraph) or short (span).
*   **Impact**: Widely used to train and evaluate models on knowledge-intensive QA tasks.

## Related Concepts
This is a foundational [[concepts/benchmarks.md]] for evaluating [[concepts/reading-comprehension.md]] and [[concepts/information-retrieval.md]] capabilities within QA systems. It is closely related to other QA datasets like [[sources/drcd.md]] and [[sources/dureader.md]].

## Related pages
- [[concepts/benchmarks.md]]
- [[concepts/question-answering.md]]
- [[concepts/information-retrieval.md]]