# Adaptation Stages

**Summary**: The sequential phases of developing and utilizing an LLM, from initial self-supervised pre-training to final prompting for tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

LLMs are developed and adapted through distinct stages, each with a specific goal. The source outlines a typical pipeline from pre-training to utilization.

**Pre-Training**: The initial, compute-intensive stage where a model is trained on a massive, unlabeled text corpus using a self-supervised objective like [[concepts/training-objectives.md|causal language modeling]]. This builds the model's general linguistic knowledge and world understanding.

**Fine-Tuning**: The process of adapting a pre-trained model to perform better on specific tasks or behaviors. The source describes several styles:
*   **Transfer Learning**: Fine-tuning the pre-trained model on a dataset specific to a downstream task.
*   **Instruction-Tuning**: Fine-tuning on data formatted as instructions (input-output pairs in natural language) to improve the model's ability to follow user queries. This enhances zero-shot generalization.
*   **Alignment-Tuning**: A specialized fine-tuning process aimed at making models "helpful, honest, and harmless" (HHH). It often uses [[concepts/reinforcement-learning-human-feedback.md|Reinforcement Learning from Human Feedback (RLHF)]] to align the model's outputs with human preferences and values.

**Prompting / Utilization**: The final stage where a trained (and possibly fine-tuned) model is queried to generate responses. This involves various [[concepts/prompting-techniques.md|prompting techniques]] without further weight updates.

## Related pages
- [[concepts/pre-training.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/alignment-tuning.md]]
- [[concepts/prompting-techniques.md]]
- [[concepts/reinforcement-learning-human-feedback.md]]