# Fine-Tuning

**Summary**: The process of further training a pre-trained language model on a specific, often smaller, dataset to adapt it for particular tasks, improve safety, or enhance its ability to follow instructions.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Rationale for Fine-Tuning
While pre-trained LLMs have strong generalization abilities, they are typically trained with a simple next-token prediction objective. This leaves them with limited capacity to follow user intent and makes them prone to generating unethical, toxic, or inaccurate responses. Fine-tuning addresses these limitations with minimal additional compute (e.g., noted as 0.2% of total pre-training for PaLM 540B).

## Benefits
Fine-tuning LLMs, particularly for **instruction following** and **safety**, leads to several improvements:
*   Increased zero-shot, few-shot, and cross-task generalization.
*   Better alignment with human intentions and safety guidelines.
*   More effective utilization of the model's underlying capabilities.

## Fine-Tuning Strategies Mentioned
The text introduces this as a section header, indicating a review of various fine-tuned LLMs and strategies follows in the document. It sets the stage for discussing models and techniques specialized for this phase of training.

## Related pages
- [[concepts/instruction-tuning.md]]
- [[concepts/alignment.md]]
- [[concepts/pre-training.md]]