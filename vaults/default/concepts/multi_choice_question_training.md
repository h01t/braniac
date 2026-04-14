# Multi-Choice Question Training Impact
Incorporating multi-choice (MC) question data during the alignment stage can significantly boost model performance on multiple-choice benchmarks (e.g., MMLU, C-Eval, CMMLU). This improvement is attributed to the model learning not just the underlying knowledge but also the specific skill of understanding and selecting from provided options.

However, a key finding is that this improvement does not generalize to evaluations using a generative format (e.g., TriviaQA, ChineseQA). This suggests that enhancing MC performance leads to overfitting on the benchmark format rather than contributing to a perceived increase in general conversational intelligence. Consequently, **[[entities/deepseek_llm.md]]** chose to exclude MC data from both pre-training and fine-tuning stages to avoid benchmark decoration and pursue "true intelligence."

**Related Concepts:** [[concepts/benchmark_decoration.md]], [[concepts/alignment.md]]
**Related Entities:** [[entities/deepseek_llm_7b_chat.md]]