# Model Scaling Effects
Observations on how model size affects performance and capabilities.

**Key Insights from DeepSeek LLM Evaluation:**
*   **Emergent Improvement:** Tasks like [[entities/gsm8k.md]] and [[entities/bbh.md]] show boosted performance with model scale (7B to 67B), attributed to the powerful few-shot learning ability of larger models.
*   **Language Conflict:** The advantage of DeepSeek 67B over [[entities/llama2.md]] 70B is larger than that of DeepSeek 7B over LLaMA2 7B, suggesting language conflict in the bilingual training corpus has a greater negative impact on smaller models.
*   **Capability Transfer:** Models like LLaMA2, not specifically trained on Chinese, can still perform well on Chinese tasks requiring fundamental abilities like mathematical reasoning ([[entities/cmath.md]]), indicating cross-language transfer.
*   **Held-Out Performance:** A significant gap exists between large and small models on new, held-out evaluation datasets (e.g., [[sources/held_out_evaluation.md]]), emphasizing the role of total compute.

**Related:**
*   [[concepts/model_evaluation.md]]
*   [[entities/deepseek_base.md]]