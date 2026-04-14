# Model Alignment
Alignment fine-tunes models to follow instructions and ensure safety via:
- **Supervised Fine-Tuning (SFT)**: Uses instruction data in English and Chinese; for DeepSeek LLM, 7B model trained with 4 epochs, 67B with 2 epochs due to overfitting.
- **Direct Preference Optimization (DPO)**: Enhances model ability and reduces repetition ratio.
- **Data Collection**: ~1.5 million instances (1.2M helpfulness, 300K safety).
Metrics include benchmark accuracy and repetition ratio; techniques like two-stage fine-tuning and DPO mitigate repetition.

Related to [[entities/deepseek_llm.md]] and datasets like [[entities/datasets.md]].