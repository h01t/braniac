# Direct Preference Optimization (DPO)
DPO is a training method used for Large Language Model alignment. In the DeepSeek LLM project, DPO training was conducted using preference data constructed for **helpfulness** and **harmlessness**.

**Training Details:**
*   **Helpfulness Data:** Constructed from multilingual prompts covering creative writing, question answering, and instruction following. Responses were generated using DeepSeek Chat models as candidates.
*   **Harmlessness Data:** Constructed using a similar method.
*   **Training:** 1 epoch with a learning rate of 5e-6, batch size of 512, using a learning rate warmup and cosine learning rate scheduler.
*   **Observed Effect:** Strengthened the model's open-ended generation skill with little difference in performance on standard benchmarks.

**Related:**
*   [[concepts/alignment.md]]
*   [[concepts/model_evaluation.md]]
*   [[entities/deepseek_chat.md]]