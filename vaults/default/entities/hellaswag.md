# HellaSwag
A benchmark for commonsense natural language inference.

**Evaluation Context:**
*   **Method:** [[concepts/perplexity_evaluation.md]] (0-shot).
*   **Performance:** DeepSeek models show performance comparable to [[entities/llama2.md]].
*   **SFT Effect:** Performance consistently declines after fine-tuning for chat models, as it is a sentence completion task better suited for pure language models.

**Source:** Zellers et al., 2019.

**Related:**
*   [[concepts/supervised_fine_tuning_effects.md]]