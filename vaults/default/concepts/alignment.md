# Alignment in Large Language Models
Alignment refers to techniques that make LLMs better follow user intentions and instructions. In [[entities/deepseek_llm.md]], this involves:

**Supervised Fine-Tuning (SFT):**
- Collected over 1 million instances from diverse sources.
- Aims to improve conversational capabilities and instruction following.

**Direct Preference Optimization (DPO):**
- Applied after SFT to enhance conversational performance.
- Based on the method described in [[sources/rafailov_et_al_2023.md]].

These steps transform base models into chat models, such as DeepSeek LLM 67B Chat, which excels in open-ended evaluations. For evaluation details, refer to [[concepts/evaluation.md]].