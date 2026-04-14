# MT-Bench
A multi-turn dialogue benchmark for evaluating chat assistants.

**Details:**
*   **Purpose:** English open-ended, multi-turn evaluation.
*   **Content:** 8 categories of multi-turn questions.
*   **Usage in DeepSeek Evaluation:**
    *   Used to evaluate [[entities/deepseek_chat.md]] models.
    *   DeepSeek 67B Chat outperformed other open-source models (LLaMA-2-Chat 70B, Xwin 70B) and achieved a score (8.35) comparable to GPT-3.5-turbo.
    *   The DPO version improved the score to 8.76, behind only GPT-4.

**Source:** Zheng et al., 2023.

**Related:**
*   [[concepts/open_ended_evaluation.md]]