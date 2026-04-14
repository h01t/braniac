# Chain-of-Thought (CoT) Reasoning
**Source:** [[sources/DeepSeek_R1.md]]

Chain-of-Thought (CoT) is a reasoning technique where a model breaks down a complex problem into intermediate steps, mimicking human logical progression. It is a key capability enhanced by **[[concepts/Reinforcement_Learning_Reasoning.md]]** in DeepSeek models.

## Role in DeepSeek-R1
- **Training:** The RL process incentivizes the model to generate long, detailed CoT traces.
- **Template:** During training, the model is instructed to place its reasoning within `<think>` tags and the final answer within `<answer>` tags.
- **Emergence:** In **[[entities/DeepSeek_R1_Zero.md]]**, CoT reasoning naturally emerges without any CoT examples in supervised data.

## Benefits
- **Improved Accuracy:** CoT leads to higher accuracy on complex reasoning tasks (math, coding, etc.).
- **Interpretability:** The reasoning steps provide insight into the model's problem-solving process.
- **Scalability:** Longer CoT traces (inference-time scaling) correlate with better performance, as seen in OpenAI's o1 series.

## Benchmarks
CoT reasoning is evaluated on tasks like AIME 2024, MATH-500, and LiveCodeBench, where DeepSeek-R1 models show significant improvements.