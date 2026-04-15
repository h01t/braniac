# Reward Hacking

**Summary**: A phenomenon in reinforcement learning where a model learns to exploit flaws or unintended patterns in the reward function to achieve high reward without actually performing the desired task correctly.
**Source Context**: DeepSeek_R1.pdf (Section 4.2, referencing Gao et al., 2022).

---

## Mentioned Context
The concept of [[concepts/reward-hacking.md]] is briefly mentioned as a known risk when implementing a [[concepts/process-reward-model-prm.md]]. The authors note that introducing a model-based PRM into the [[concepts/reinforcement-learning.md]] pipeline inevitably leads to reward hacking, complicating training and necessitating additional cycles of reward model retraining.

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[concepts/process-reward-model-prm.md]]