# HumanEval
A benchmark for evaluating code generation from docstrings.

**Evaluation Context:**
*   **Method:** [[concepts/generation_evaluation.md]] (0-shot).
*   **Performance:** DeepSeek 67B achieves 42.7, considerably better than LLaMA2 70B (28.7).
*   **SFT Effect:** Chat models show massive improvement (e.g., 67B Chat: 73.8), suggesting the base model was underfitted for code.

**Source:** Chen et al., 2021.

**Related:**
*   [[concepts/supervised_fine_tuning_effects.md]]