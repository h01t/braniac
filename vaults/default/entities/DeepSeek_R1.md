# DeepSeek-R1
**Source:** [[sources/DeepSeek_R1.md]]

DeepSeek-R1 is a reasoning-optimized Large Language Model developed by DeepSeek-AI. It builds upon the purely RL-based **[[entities/DeepSeek_R1_Zero.md]]** by incorporating a **[[concepts/Cold_Start.md|cold-start]]** phase and multi-stage training.

## Development Pipeline
1. **Cold-Start SFT:** Fine-tune **[[entities/DeepSeek_V3_Base.md]]** with thousands of long CoT examples.
2. **Reasoning-Oriented RL:** Apply **[[concepts/Group_Relative_Policy_Optimization.md|GRPO]]** similar to DeepSeek-R1-Zero.
3. **Rejection Sampling & SFT:** Generate new SFT data via rejection sampling from an RL checkpoint, combine with other supervised data (writing, QA, etc.), and retrain the base model.
4. **RL for All Scenarios:** Apply a final RL stage considering prompts from all scenarios (reasoning and general).

## Performance
- **Reasoning:** Matches **[[entities/OpenAI_o1_1217.md]]** on benchmarks (e.g., 79.8% on AIME 2024, 97.3% on MATH-500).
- **Knowledge:** Excels on MMLU, MMLU-Pro, GPQA Diamond.
- **General Tasks:** Strong performance on writing, QA, summarization, and long-context understanding (e.g., 87.6% win-rate on AlpacaEval 2.0).

## Distillation
DeepSeek-R1's reasoning patterns are distilled into smaller dense models (Qwen and Llama series), producing state-of-the-art open-source reasoning models.