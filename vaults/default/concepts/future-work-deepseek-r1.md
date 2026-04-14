# Future Work for DeepSeek-R1
Identified limitations and planned research directions for the [[entities/DeepSeek-R1.md]] model.

1.  **General Capability:** Enhancing capabilities in areas where R1 currently falls short of [[entities/DeepSeek-V3.md]], such as:
    *   Function calling
    *   Multi-turn dialogue
    *   Complex role-playing
    *   Structured JSON output
    *   *Approach:* Explore leveraging Chain-of-Thought (CoT) reasoning in these fields.

2.  **Language Mixing:** Addressing the issue where R1, optimized for Chinese and English, may use English for reasoning and responses even when queried in other languages.

3.  **Prompting Engineering:** The model is sensitive to prompts; few-shot prompting degrades performance. Recommendation: Use zero-shot settings. Future work may involve making the model more robust.

4.  **Software Engineering Tasks:** Large-scale [[concepts/reinforcement-learning-rl.md]] has not been extensively applied to software engineering data due to long evaluation times hindering RL efficiency.
    *   *Planned Solutions:* Implement rejection sampling on software engineering data or incorporate asynchronous evaluations during RL.

**Source:** [[sources/DeepSeek_R1_References.md]]