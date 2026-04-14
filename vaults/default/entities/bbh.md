# BigBench Hard (BBH)
A subset of the hardest tasks from the Beyond the Imitation Game Benchmark (BIG-bench).

**Evaluation Context:**
*   **Method:** [[concepts/generation_evaluation.md]] (3-shot).
*   **Performance:** DeepSeek 67B achieves 68.7, considerably better than LLaMA2 70B (62.9).
*   **Scaling:** Performance boosts with model scale.
*   **SFT Effect:** Chat models show slight improvements, attributed to learning the correct [[concepts/chain_of_thought.md]] format.

**Source:** Suzgun et al., 2022.

**Related:**
*   [[concepts/model_scaling.md]]
*   [[concepts/supervised_fine_tuning_effects.md]]