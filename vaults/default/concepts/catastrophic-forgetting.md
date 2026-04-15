# Catastrophic Forgetting

**Summary**: The phenomenon where a neural network loses previously learned information or capabilities when trained on new data or tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf, Sections mentioning XuanYuan 2.0 and Continued Pre-Training.

---

In the context of LLM fine-tuning, catastrophic forgetting refers to the degradation of a model's general knowledge and abilities acquired during pre-training when it is fine-tuned on a specific downstream task or dataset.

## Mitigation Strategies
The literature proposes methods to avoid this issue during instruction tuning or task adaptation:
*   **Combining Pre-training and Fine-tuning**: As noted in **XuanYuan 2.0**, combining stages in a single training run can help avoid forgetting.
*   **Continued Pre-Training with Original Data**: A common and effective technique is to concatenate the new fine-tuning data with a small number of randomly sampled batches from the original pre-training corpus in each iteration. This reminds the model of its foundational knowledge.
*   **Prompt-based Continued Pre-training (PCP)**: This method first continues pre-training the model on task-related text and instructions before the final instruction-tuning step for downstream tasks.

## Related pages
- [[concepts/fine-tuning.md]]
- [[concepts/instruction-tuning.md]]