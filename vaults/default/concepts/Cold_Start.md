# Cold Start in Model Training
**Source:** [[sources/DeepSeek_R1.md]]

Cold start refers to initializing a model's training with a small amount of supervised fine-tuning (SFT) data before applying reinforcement learning (RL). This technique is used in the development of **[[entities/DeepSeek_R1.md]]** to address issues found in the purely RL-trained **[[entities/DeepSeek_R1_Zero.md]]**.

## Purpose
- **Improve Readability:** DeepSeek-R1-Zero exhibited poor readability and language mixing. Cold-start SFT helps align the model with desired output formats and language style.
- **Enhance Reasoning:** Provides a seed of high-quality **[[concepts/Chain_of_Thought.md|Chain-of-Thought (CoT)]]** examples to guide the model's reasoning patterns.
- **Stabilize RL:** Gives the model a better starting point, potentially leading to faster convergence and better final performance.

## Implementation in DeepSeek-R1
1. Collect thousands of long CoT examples (cold-start data).
2. Fine-tune the base model (**[[entities/DeepSeek_V3_Base.md]]**) on this data.
3. Proceed with reasoning-oriented RL (similar to DeepSeek-R1-Zero).
4. Later stages include additional SFT and RL for all scenarios.

## Comparison
- **DeepSeek-R1-Zero:** No cold start; pure RL from the base model.
- **DeepSeek-R1:** With cold start; achieves better readability and matches **[[entities/OpenAI_o1_1217.md]]** on benchmarks.