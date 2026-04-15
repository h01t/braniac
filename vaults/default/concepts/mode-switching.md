# Mode Switching

**Summary**: A training technique that adds task-related tokens (e.g., for NLU or NLG) at the beginning of text during training to improve downstream task performance.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Mode switching involves adding special tokens at the beginning of input text during training to indicate the task type, such as natural language understanding (NLU) or natural language generation (NLG) [Source: Comprehensive Overview of LLums.pdf]. This has been shown to improve downstream task performance.

During fine-tuning and inference, the appropriate tokens are appended based on the target task. This technique is used in models with [[concepts/encoder-decoder-architectures.md]] to enable task-specific modes [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/encoder-decoder-architectures.md]]