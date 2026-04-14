# GSM8K
A dataset of grade-school math word problems.

**Evaluation Context:**
*   **Method:** [[concepts/generation_evaluation.md]] (8-shot for base models).
*   **Performance:** DeepSeek 67B achieves 63.4, considerably better than LLaMA2 70B (58.4).
*   **Scaling:** Performance boosts with model scale (7B: 17.4, 67B: 63.4).
*   **SFT Effect:** Chat models show massive improvement (>20 points), suggesting the base model was underfitted.

**Source:** Cobbe et al., 2021.

**Related:**
*   [[concepts/model_scaling.md]]
*   [[concepts/supervised_fine_tuning_effects.md]]