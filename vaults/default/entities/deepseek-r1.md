# DeepSeek-R1

**Summary**: A reasoning model trained using a four-stage pipeline that incorporates a human-friendly cold-start phase, reasoning-oriented RL, curated SFT, and a final RL alignment stage.
**Source Context**: DeepSeek_R1.pdf

---

## Training Pipeline
DeepSeek-R1 is developed to address the readability issues of [[entities/deepseek-r1-zero.md]]. Its training involves four key stages (Source: DeepSeek_R1.pdf):

1.  **[[concepts/cold-start-rl-reasoning.md]]**: The [[entities/deepseek-v3-base.md]] is fine-tuned on thousands of high-quality, readable chain-of-thought examples.
2.  **[[concepts/reasoning-oriented-reinforcement-learning.md]]**: RL is applied to the fine-tuned model to boost reasoning performance on tasks like math and coding, using a reward that combines accuracy and language consistency.
3.  **[[concepts/rejection-sampling-sft-reasoning.md]]**: High-quality reasoning and general-purpose data (~800k samples) are curated via rejection sampling from the RL checkpoint and used for supervised fine-tuning.
4.  **Reinforcement Learning for All Scenarios**: A final RL stage aligns the model with human preferences for helpfulness and harmlessness across both reasoning and general tasks.

## Architecture and Performance
DeepSeek-R1 is a Mixture of Experts (MoE) model with 671B total parameters and 37B activated parameters. It demonstrates state-of-the-art performance on numerous [[concepts/evaluation-benchmarks-reasoning-models.md]], showing particular strength in mathematics and coding, with results competitive with OpenAI's o1 series (Source: DeepSeek_R1.pdf).

The model's curated training data is also used for [[concepts/distillation-reasoning-capabilities.md]] to smaller models like Qwen and Llama (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-v3-base.md]]
- [[entities/deepseek-r1-zero.md]]
- [[concepts/cold-start-rl-reasoning.md]]