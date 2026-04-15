# Cold Start Data

**Summary**: A small set of supervised fine-tuning data used to initialize a model before reinforcement learning to improve initial performance and address issues like poor readability.
**Source Context**: DeepSeek_R1.pdf

---

## Purpose and Definition

Cold start data refers to a limited amount of high-quality supervised data used to fine-tune a base model before applying reinforcement learning. In the DeepSeek-R1 context, this data consists of thousands of long chain-of-thought examples.

## Role in DeepSeek-R1 Development

While [[entities/deepseek-r1-zero.md]] was trained purely via RL, it exhibited issues like poor readability and language mixing. To address these and further enhance performance, the authors introduced cold-start data for [[entities/deepseek-r1.md]].

The pipeline for DeepSeek-R1 begins with fine-tuning the base model [[entities/deepseek-v3-base.md]] on this cold-start data. This provides the model with a better initial understanding of reasoning structure before RL is applied.

## Impact on Model Performance

The inclusion of cold-start data helps the model start with stronger reasoning patterns, leading to better final performance. DeepSeek-R1, which uses cold-start data, achieves higher scores on reasoning benchmarks compared to DeepSeek-R1-Zero and matches the performance of [[entities/openai-o1-series.md]].

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning-reasoning.md]]