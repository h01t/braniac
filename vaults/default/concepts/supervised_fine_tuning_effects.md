# Supervised Fine-Tuning (SFT) Effects
Analysis of performance changes between **base models** and **chat models** after Supervised Fine-Tuning.

**Observed Trends:**
*   **Knowledge Tasks (e.g., [[entities/triviaqa.md]], [[entities/mmlu.md]]):** Minor fluctuations, but the key value is enabling chat models to achieve comparable 0-shot performance to the base model's few-shot setting.
*   **Reasoning Tasks (e.g., [[entities/bbh.md]]):** Slight improvements, attributed to learning the correct [[concepts/chain_of_thought.md]] format, not reasoning capability itself.
*   **Performance Drop Tasks:** Some cloze/sentence completion tasks (e.g., [[entities/hellaswag.md]]) decline, as pure language models are better suited.
*   **Math and Code Tasks (e.g., [[entities/gsm8k.md]], [[entities/humaneval.md]]):** Significant improvements (e.g., >20 points). This suggests the base model was underfitted, and SFT data provided additional knowledge. However, capabilities may be focused on code completion and algebraic questions.

**Training Strategy:**
For the 7B model, a two-stage SFT was used (first with all data, then excluding math/code) to reduce repetition. For the 67B model, one stage was sufficient.

**Related:**
*   [[entities/deepseek_base.md]]
*   [[entities/deepseek_chat.md]]
*   [[concepts/knowledge_retention.md]]