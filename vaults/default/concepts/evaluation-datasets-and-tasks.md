# Evaluation Datasets and Tasks

**Summary**: Benchmarks and tasks used to measure the capabilities and limitations of large language models, broadly categorized into Natural Language Understanding (NLU) and Natural Language Generation (NLG).
**Source Context**: Comprehensive Overview of LLMs.pdf (Section 5.2)

---

Evaluating [[concepts/large-language-models.md]] is essential to gauge their proficiency. Evaluation is divided into two overlapping categories: [[concepts/natural-language-understanding-nlu.md]] and [[concepts/natural-language-generation-nlg.md]].

## Multi-task Benchmarks
These benchmarks aggregate many tasks to test general capability:
*   **MMLU**: Measures knowledge across 57 subjects in zero/few-shot settings.
*   **BIG-bench**: A large-scale benchmark testing reasoning, creativity, and ethics.
*   **SuperGLUE & GLUE**: Challenging suites for natural language understanding tasks like NLI and QA.

## Natural Language Understanding (NLU) Tasks
Tasks that test comprehension include:
*   **Question Answering (QA)**: e.g., CoQA (conversational QA).
*   **Common-sense & Reasoning**: e.g., WinoGrande (pronoun resolution), WiC (word sense disambiguation).

## Natural Language Generation (NLG) Tasks
Tasks that test generation quality include summarization, machine translation, and dialogue generation.

## Related pages
- [[concepts/benchmarking.md]]
- [[concepts/few-shot-learning.md]]
- [[concepts/zero-shot-learning.md]]