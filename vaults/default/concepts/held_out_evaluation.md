# Held-Out Evaluation
Evaluation on recently published or non-standard test sets to mitigate data contamination and benchmark overfitting.

**Datasets Used:**
1.  **LeetCode Weekly Contest:** 126 problems from contests held between July-Nov 2023. Pass@1 score is used (model solves the problem if it passes all test cases).
2.  **Hungarian National High-School Exam:** 33 math problems, scored via human annotation following official solutions.
3.  **Instruction Following Evaluation (IFEval):** ~500 prompts with verifiable instructions, using a prompt-level loose metric.

**Key Findings:**
*   Significant performance gap between large and small models on these new datasets, even when small models perform well on conventional benchmarks (e.g., [[entities/chatglm3.md]] on MBPP vs. LeetCode).
*   Total compute (model scale) plays a crucial role, as seen in the large performance difference between DeepSeek 7B and 67B Chat models using the same pipeline.

**Related:**
*   [[sources/held_out_evaluation.md]]
*   [[concepts/model_scaling.md]]