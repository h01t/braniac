# Perplexity-Based Evaluation
An evaluation method used for multiple-choice question datasets.

**Process:**
1.  Calculate the perplexity of each possible answer option given the context/question.
2.  Select the option with the **lowest perplexity** as the model's prediction.

**Datasets using this method (with normalization details):**
*   [[entities/hellaswag.md]], [[entities/piqa.md]], [[entities/winogrande.md]], [[entities/race.md]], [[entities/mmlu.md]], [[entities/arc.md]], [[entities/openbookqa.md]], [[entities/chid.md]], [[entities/c_eval.md]], [[entities/cmmlu.md]], [[entities/c3.md]], [[entities/ccpm.md]]
*   **Unconditional Normalization:** Used for ARC and OpenBookQA.
*   **Length Normalization:** Used for other datasets.

**Related:**
*   [[concepts/model_evaluation.md]]