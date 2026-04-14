# DeepSeek LLM 7B Chat
A 7 billion parameter chat model variant of the **[[entities/deepseek_llm.md]]** series.

**Notable Findings:**
*   Showed commendable performance on held-out tasks despite lagging on some standard benchmarks.
*   Benefited from **[[concepts/staged_fine_tuning.md]]** to reduce repetition while maintaining math/code skills.
*   Performance slightly degraded when a **[[concepts/system_prompt_impact.md|system prompt]]** was introduced, unlike larger models.
*   Adding multi-choice (MC) data improved MC benchmark scores but not generative benchmark performance.

**Related Concepts:** [[concepts/staged_fine_tuning.md]], [[concepts/multi_choice_question_training.md]]