# CHID
A Chinese dataset for idiom comprehension.

**Evaluation Context:**
*   **Method:** [[concepts/perplexity_evaluation.md]] (0-shot).
*   **Performance:** DeepSeek models excel (67B: 92.1) due to Chinese pre-training, while [[entities/llama2.md]] underperforms significantly (70B: 55.5).
*   **Insight:** Demonstrates that tasks requiring specific cultural/linguistic knowledge (idioms) require substantial in-language pre-training tokens and do not transfer well across languages.

**Source:** Zheng et al., 2019.

**Related:**
*   [[concepts/model_evaluation.md]]