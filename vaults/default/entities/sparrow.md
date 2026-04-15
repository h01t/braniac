# Sparrow

**Summary**: An aligned dialogue agent focused on generating helpful, correct, and harmless answers, using a combination of rule-based and preference-based rewards.
**Source Context**: Comprehensive Overview of LLMs.pdf, Table 2 and Section 3.2.3.

---

**Sparrow** is a research model from DeepMind designed to be a helpful and safe conversational agent, incorporating lessons from information retrieval and alignment.

## Alignment Methodology
Sparrow employed an advanced RLHF-style pipeline:
*   **Dual Reward Model**: It used two distinct reward signals:
    1.  **Preference Reward**: Based on human preferences for helpfulness.
    2.  **Rule Reward**: Based on whether the model's response adhered to a set of predefined, detailed natural language rules (e.g., "don't make threatening statements"). Human annotators adversarially probed the model to test rule violations.
*   **Optimal Training Strategy**: The combination of **reinforcement learning (RL) with a reranking** step was found to yield the best performance in terms of preference win rates and resilience against adversarial probing.

## Key Insights
*   **Rule Formalization**: It showed that good dialogue goals (helpful, correct, harmless) can be broken down into detailed natural language rules for both the AI agent and the human raters.
*   **Adversarial Probing**: Actively using humans to adversarially test the model (red-teaming) was integral to collecting data to improve its safety.

## Related pages
- [[concepts/alignment.md]]
- [[concepts/reinforcement-learning-from-human-feedback.md]]
- [[entities/webgpt.md]]