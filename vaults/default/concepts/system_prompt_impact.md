# System Prompt Impact
A system prompt is a predefined instruction given to a language model to guide its behavior, encouraging helpful, respectful, honest, and safe responses. The impact of a system prompt varies significantly with model scale.

**Observation:** For smaller models (e.g., 7B parameters), introducing a system prompt can lead to a slight degradation in performance. For larger models (e.g., 67B parameters), the same system prompt leads to significantly improved results.

**Explanation:** Larger models possess a better ability to understand and adhere to the intent behind the system prompt, aligning their responses more effectively. Smaller models may struggle to grasp the prompt adequately, and the discrepancy between their training (which may not have heavily featured system prompts) and inference can negatively impact performance.

**Related Entities:** [[entities/deepseek_llm_7b_chat.md]], [[entities/deepseek_67b_chat.md]]