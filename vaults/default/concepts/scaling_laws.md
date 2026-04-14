# Scaling Laws in Large Language Models
Scaling laws describe how the performance of large language models (LLMs) scales with factors like model size, data size, and computational budget. Previous literature, such as [[sources/hoffmann_et_al_2022.md]] and [[sources/kaplan_et_al_2020.md]], presents varying conclusions, which DeepSeek LLM investigates to guide efficient scaling.

Key findings from the DeepSeek study include:
- Trends for batch size and learning rate with model size.
- Optimal allocation strategies for model and data scaling.
- Significant differences in scaling laws across datasets, indicating caution in generalization.

These insights were applied to train models like [[entities/deepseek_llm.md]] in 7B and 67B configurations. For more on model training, see [[concepts/pre_training.md]].