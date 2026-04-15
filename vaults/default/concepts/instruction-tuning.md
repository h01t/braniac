# Instruction Tuning

**Summary**: A fine-tuning technique where large language models are trained on tasks described by natural language instructions to improve zero-shot generalization.
**Source Context**: Comprehensive Overview of LLMs.pdf (References)

---

## Concept Definition
Instruction tuning is a paradigm for adapting pre-trained large language models. Models are fine-tuned on a collection of tasks where each task is defined by a natural language instruction. The goal is to enhance the model's ability to perform new, unseen tasks based solely on an instruction prompt (zero-shot generalization) [[concepts/fine-tuning.md]].

## Key Cited Research
The source's reference list highlights several pivotal works in this area:
*   **Scaling Instruction-Finetuned Language Models** (Chung et al., 2022) explores the effect of scaling on instruction-tuned models.
*   **Multitask Prompted Training** (Sanh et al., 2021) and **Super-NaturalInstructions** (Wang et al., 2022) focus on creating broad datasets of tasks with instructions.
*   **Training language models to follow instructions with human feedback** (Ouyang et al., 2022) introduces Reinforcement Learning from Human Feedback (RLHF) as an advanced alignment technique building on instruction tuning.
*   **Self-Instruct** (Wang et al., 2022) proposes a method for a model to generate its own instruction-following training data.

## Purpose and Impact
This technique is a core method for **aligning** LLMs with human intent, moving them from passive text generators to interactive systems that follow commands. It is crucial for developing capable conversational agents and assistants [[concepts/llm-alignment.md]].

## Related pages
- [[concepts/fine-tuning.md]]
- [[concepts/llm-alignment.md]]
- [[concepts/zero-shot-learning.md]]