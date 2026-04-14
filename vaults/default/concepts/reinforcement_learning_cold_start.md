# Reinforcement Learning with Cold Start
A training methodology that incorporates a small amount of high-quality, human-readable Chain-of-Thought (CoT) data to fine-tune a base model before beginning large-scale [[concepts/reinforcement_learning.md]]. This addresses drawbacks of the pure [[concepts/self-evolution.md]] approach, such as poor readability and language mixing.

The pipeline for this method, as used in [[entities/DeepSeek-R1.md]], involves four stages:
1. **Cold Start**: Fine-tuning on a small, readable CoT dataset.
2. **Reasoning-oriented RL**: Applying large-scale RL focused on reasoning tasks, with rewards for accuracy and language consistency.
3. **Rejection Sampling and SFT**: Collecting and curating high-quality reasoning and non-reasoning data for supervised fine-tuning.
4. **RL for all Scenarios**: A secondary RL stage to align the model with human preferences for helpfulness and harmlessness.