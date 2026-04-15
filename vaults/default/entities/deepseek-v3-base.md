# DeepSeek-V3-Base

**Summary**: The base large language model developed by DeepSeek-AI, used as the foundation for training the reasoning models DeepSeek-R1-Zero and DeepSeek-R1.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1 Research
DeepSeek-V3-Base is the pre-trained model upon which the reasoning capabilities are built via post-training. According to the paper, both [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]] start from this base model. It is described as a powerful base that, when combined with reinforcement learning ([[concepts/reinforcement-learning.md]]), can develop advanced reasoning without supervised fine-tuning.

## Characteristics
The paper does not provide detailed specifications of DeepSeek-V3-Base (e.g., size, architecture) but implies it is a capable model that benefits from further tuning. It serves as the initial policy model for the RL process using [[entities/grpo.md]].

## Usage in Training
- For DeepSeek-R1-Zero, RL is applied directly to DeepSeek-V3-Base without any intermediate SFT.
- For DeepSeek-R1, the base model is first fine-tuned with cold-start data (thousands of CoT examples) before RL.

## Performance Baseline
The paper notes that before RL, the base model achieves 15.6% pass@1 on AIME 2024. After RL (in DeepSeek-R1-Zero), this jumps to 71.0%, indicating the base model's latent potential for reasoning when properly incentivized.

## Related pages
- [[entities/deepseek-r1-zero.md]]
- [[entities/deepseek-r1.md]]
- [[sources/deepseek-r1-paper.md]]