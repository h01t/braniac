# DeepSeek-V3-Base

**Summary**: The base language model architecture used as the foundation for training both DeepSeek-R1-Zero and DeepSeek-R1.
**Source Context**: DeepSeek_R1.pdf

---

## Role in Training
DeepSeek-V3-Base serves as the starting point for the [[concepts/self-evolution-rl.md]] of [[entities/deepseek-r1-zero.md]]. For [[entities/deepseek-r1.md]], it is first fine-tuned on [[concepts/cold-start-rl-reasoning.md]] data before undergoing reinforcement learning (Source: DeepSeek_R1.pdf).

In the distillation phase, the SFT dataset curated from DeepSeek-R1 is used to fine-tune other base models, not necessarily DeepSeek-V3-Base itself (Source: DeepSeek_R1.pdf).

## Architecture
The paper notes that DeepSeek-V3 (and by extension, DeepSeek-R1) is a Mixture of Experts (MoE) model. The evaluated DeepSeek-R1 has 671B total parameters with 37B activated parameters per token (Source: DeepSeek_R1.pdf).

## Performance Baseline
As a baseline in evaluations, DeepSeek-V3 is outperformed by DeepSeek-R1 on most reasoning and knowledge benchmarks, highlighting the gains achieved through the specialized RL training pipeline (Source: DeepSeek_R1.pdf).

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]