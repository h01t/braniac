# Instruction Data in Pre-Training
Incorporating instruction data during the final phase of pre-training (e.g., the last 10%) is a known technique to enhance a base model's performance on benchmark tasks. The approach involves mixing instructional data, often multi-choice questions, into the pre-training corpus.

Experiments with **[[entities/deepseek_llm.md]]** indicated that while this method improves benchmark scores, the final model capability after full training and fine-tuning is nearly identical to simply adding the same data during the Supervised Fine-Tuning (SFT) stage. Therefore, the overall potential gain is considered equivalent.

The decision to include such data in pre-training may be acceptable if the volume of instruction data is substantial. However, due to a preference for excluding multi-choice questions and a limited supply of other instructional formats, **[[entities/deepseek_llm.md]]** opted not to include instruction data in pre-training.

**Related Concepts:** [[concepts/supervised_fine_tuning.md]], [[concepts/multi_choice_question_training.md]]