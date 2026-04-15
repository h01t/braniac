# Natural Language Understanding (NLU)

**Summary**: A category of evaluation tasks that measure a language model's capacity to comprehend language, including tasks like classification, reasoning, and question answering.
**Source Context**: Comprehensive Overview of LLMs.pdf (Section 5.2)

---

Natural Language Understanding (NLU) encompasses tasks where a model must interpret, infer, or reason about the meaning of text. While the boundary is soft, NLU tasks typically have more constrained or "correct" answers compared to open-ended [[concepts/natural-language-generation-nlg.md]].

## Common NLU Tasks and Datasets
*   **Question Answering (QA)**: Models answer questions based on a context. *CoQA* is a prominent conversational QA dataset.
*   **Natural Language Inference (NLI)**: Determining if a hypothesis is entailed by, contradicts, or is neutral to a premise.
*   **Commonsense Reasoning (CR)**: Testing understanding of everyday situations. *WinoGrande* tests pronoun resolution based on commonsense.
*   **Word Sense Disambiguation**: Determining a word's meaning from context. *WiC* (Words-in-Context) is a key dataset.
*   **Mathematical Reasoning (MR)**: Solving math word problems.
*   **Reading Comprehension (RC)**: Answering questions about a passage.

NLU capabilities are frequently tested in multi-task benchmarks like [[concepts/evaluation-datasets-and-tasks.md#multi-task-benchmarks|MMLU and SuperGLUE]].

## Related pages
- [[concepts/natural-language-inference-nli.md]]
- [[concepts/question-answering.md]]
- [[concepts/evaluation-datasets-and-tasks.md]]