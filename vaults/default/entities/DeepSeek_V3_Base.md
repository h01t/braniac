# DeepSeek-V3-Base
**Source:** [[sources/DeepSeek_R1.md]]

DeepSeek-V3-Base is the base language model used as the starting point for training **[[entities/DeepSeek_R1_Zero.md]]** and **[[entities/DeepSeek_R1.md]]**. It is a pre-trained model from DeepSeek-AI.

## Role in DeepSeek-R1
- **Foundation:** All post-training (RL and SFT) is applied to this base model.
- **Initial Performance:** Without post-training, it achieves 15.6% Pass@1 on AIME 2024.
- **Architecture:** Details not provided in the extracted text, but assumed to be a dense transformer.

## Usage
- Direct RL (for DeepSeek-R1-Zero) or cold-start SFT followed by RL (for DeepSeek-R1).
- Also used as a base for distillation data generation.

## Note
The paper does not detail the pre-training process or architecture of DeepSeek-V3-Base; it focuses on post-training methods.