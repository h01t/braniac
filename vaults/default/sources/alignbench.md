# AlignBench
A comprehensive benchmark for evaluating Chinese LLMs on open-ended questions.

**Details:**
*   **Purpose:** Chinese open-ended evaluation.
*   **Content:** 683 questions across 8 primary categories and 36 secondary categories. Provides professional reference answers and GPT-4 rating templates.
*   **Usage in DeepSeek Evaluation:**
    *   Used to evaluate [[entities/deepseek_chat.md]] models.
    *   Implementation via official GitHub repository.
    *   Temperature settings: 0.7 for role-playing, writing, open-ended Qs; 0.1 for others.
*   **Result:** DeepSeek 67B Chat ranked highly, surpassing ChatGPT and other Chinese LLMs, trailing only GPT-4 variants.

**Source:** Liu et al., 2023.

**Related:**
*   [[concepts/open_ended_evaluation.md]]