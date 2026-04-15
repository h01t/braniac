# Flan

**Summary**: A series of instruction-tuned models that scaled up task and prompt diversity, significantly advancing zero-shot and chain-of-thought capabilities.
**Source Context**: Comprehensive Overview of LLMs.pdf, Section 3.2.1 and Table 2.

---

The **Flan** models are instruction-tuned versions of T5 and later PaLM, trained on a massive collection of tasks (over 1.8k) formatted with various prompt types.

## Key Findings & Contributions
*   **Scaling Tasks and Prompts**: Flan curated a very large dataset of tasks and included diverse prompting setups: zero-shot, few-shot, and **chain-of-thought (CoT)**.
*   **CoT Tuning**: Fine-tuning with CoT data was shown to improve a model's reasoning abilities and enable **zero-shot reasoning**.
*   **Compute Efficiency**: Instruction tuning was found to be a compute-efficient way to improve model usability compared to sheer scaling of pre-training.
*   **Performance Scaling**: Model performance was shown to improve with the number of tasks used during instruction tuning.

## Impact
The Flan methodology and dataset became a cornerstone for subsequent instruction tuning research. The "Flan training paradigm" is frequently cited as an effective approach for eliciting generalizable abilities from LLMs.

## Related pages
- [[concepts/instruction-tuning.md]]
- [[concepts/chain-of-thought.md]]
- [[entities/t5.md]]