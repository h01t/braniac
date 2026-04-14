# Staged Fine-Tuning
Staged Fine-Tuning is a technique to address the trade-off where extensive fine-tuning of small models on specialized datasets (e.g., math and code) can degrade conversational abilities, such as by increasing repetition behavior.

The process involves two distinct stages:
1.  **Stage 1:** Fine-tuning the model with all available data.
2.  **Stage 2:** A subsequent fine-tuning stage focused specifically on conversational data.

This approach aims to maintain or improve proficiency in specialized tasks (code, math) while reducing undesirable behaviors (repetition) and enhancing general instruction-following capability, as measured by benchmarks like IFEval.

**Related Concepts:** [[concepts/supervised_fine_tuning.md]], [[concepts/repetition_behavior.md]]
**Related Entities:** [[entities/deepseek_llm_7b_chat.md]]