# DeepSeek LLM
DeepSeek LLM is a series of open-source large language models trained from scratch on a dataset of 2 trillion tokens in both English and Chinese. The models are developed with a focus on avoiding benchmark decoration and "dark secrets" in training.

**Key Characteristics:**
*   **Training Data:** 2 trillion tokens, bilingual (English & Chinese).
*   **Open-Source:** The model series is publicly released.
*   **Training Philosophy:** Avoids practices that artificially inflate benchmark scores without improving general capability (e.g., excluding multi-choice question data from main training).
*   **Safety:** Incorporates safety assurance throughout pre-training, SFT, and DPO.

**Known Limitations:**
*   Knowledge cutoff (up to May 2023).
*   Potential for generating non-factual information or hallucinations.
*   Suboptimal performance on some Chinese-specific topics due to non-exhaustive initial Chinese data.
*   Delicate proficiency in languages other than English and Chinese.

**Future Work:** Planned releases on code intelligence and Mixture-of-Experts (MoE) models, construction of larger datasets, and alignment research using reinforcement learning to boost complex reasoning.

**Related Concepts:** [[concepts/scaling_laws.md]], [[concepts/safety_evaluation.md]], [[concepts/benchmark_decoration.md]]
**Variants:** [[entities/deepseek_llm_7b_chat.md]], [[entities/deepseek_67b_chat.md]]