# Held-Out Evaluation Datasets
A collection of recently released or crawled datasets used to evaluate model generalization and mitigate contamination.

**Datasets Included:**
1.  **LeetCode Weekly Contest Problems:** 126 problems from contests 351-372 and 108-117 (July-Nov 2023). Evaluation metric is pass@1.
2.  **Hungarian National High-School Exam:** 33 math problems, scored via human annotation.
3.  **Instruction Following Evaluation (IFEval):** ~500 prompts with verifiable instructions, released by Google. Uses a prompt-level loose metric.

**Key Insight from Evaluation:** Reveals a significant performance gap between large and small models on these new datasets, even when small models perform well on conventional benchmarks.

**Related:**
*   [[concepts/held_out_evaluation.md]]