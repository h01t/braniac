# Instruction Tuning

**Summary**: A fine-tuning process where a pre-trained large language model is trained on datasets of instructions and desired outputs, enabling it to follow human prompts more effectively.
**Source Context**: Comprehensive Overview of LLMs.pdf (Table 4)

---

Instruction tuning is a critical step in adapting pre-trained [[concepts/large-language-models.md]] for interactive and helpful behavior. Models are trained on datasets composed of (instruction, response) pairs, which teaches them to understand and execute a wide variety of user commands. This process often uses [[concepts/reinforcement-learning-from-human-feedback-rlhf.md]] or supervised fine-tuning.

As shown in Table 4, many prominent models are instruction-tuned variants of larger pre-trained models. For example, [[entities/flan-upalm.md]] is an instruction-tuned version of [[entities/upalm.md]], and [[entities/vicuna.md]] is tuned from [[entities/llama.md]]. The number of training steps and samples for this phase is typically much smaller than pre-training.

## Purpose and Impact
The primary purpose is to align the model's outputs with human intent, improving usability in dialog, coding, and general task completion. It shifts the model from a passive text predictor to an active assistant.

## Related pages
- [[concepts/reinforcement-learning-from-human-feedback-rlhf.md]]
- [[concepts/fine-tuning.md]]
- [[concepts/training-datasets.md]]