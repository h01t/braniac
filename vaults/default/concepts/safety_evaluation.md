# Safety Evaluation
Safety evaluation is a critical component in the development of general artificial intelligence to ensure models possess human-aligned values and exhibit friendliness. The process involves incorporating safety assurance throughout the entire training pipeline, including pre-training, Supervised Fine-Tuning (SFT), and Direct Preference Optimization (DPO).

A key method involves constructing a comprehensive safety content classification system aligned with human values. An expert team manually creates high-quality test cases for each safety subcategory, paying attention to both content diversity (e.g., discrimination, legal rights, illegal behaviors) and format diversity (e.g., inducement, role-playing, multi-turn dialogues) to avoid vulnerabilities like the "grandmother" loophole.

Safety is manually reviewed by a trained team using a three-category annotation: safe, unsafe, and model refusal. Both securely answered and model-refused cases are typically counted as secure responses.

Complementary evaluation uses datasets like the **[[sources/do_not_answer_dataset.md|Do-Not-Answer Dataset]]** to benchmark model performance on handling sensitive queries.

**Related Concepts:** [[concepts/alignment.md]], [[concepts/direct_preference_optimization.md]]
**Related Entities:** [[entities/deepseek_67b_chat.md]], [[entities/expert_safety_team.md]]