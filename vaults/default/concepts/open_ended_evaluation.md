# Open-Ended Evaluation
Evaluation of chat model performance on free-form, open-domain questions, crucial for user experience.

**Chinese Open-Ended Evaluation:**
*   Uses the [[sources/alignbench.md]] benchmark.
*   DeepSeek 67B Chat surpasses ChatGPT and other Chinese LLMs, trailing only GPT-4 variants.
*   The [[concepts/dpo_training.md]] model showed improvements across almost all metrics.
*   Excels in both basic Chinese language tasks and advanced Chinese reasoning tasks.

**English Open-Ended Evaluation:**
*   Uses the [[sources/mt_bench.md]] benchmark.
*   DeepSeek 67B Chat outperforms other open-source models (LLaMA-2-Chat 70B, Xwin 70B) and is comparable to GPT-3.5-turbo.
*   The DPO version further improved the score, placing it just behind GPT-4.

**Related:**
*   [[entities/deepseek_chat.md]]
*   [[concepts/dpo_training.md]]
*   [[sources/held_out_evaluation.md]]