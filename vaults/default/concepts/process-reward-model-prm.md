# Process Reward Model (PRM)

**Summary**: A method to guide language models by providing fine-grained, step-by-step feedback during reasoning, which was explored but faced significant practical limitations in scaling for general reasoning tasks.
**Source Context**: DeepSeek_R1.pdf (Section 4.2).

---

## Concept Overview
A [[concepts/process-reward-model-prm.md]] is a technique inspired by prior work (Lightman et al., 2023; Uesato et al., 2022) aimed at improving a model's [[concepts/reasoning-ability.md]] by rewarding or verifying individual steps in a reasoning chain, rather than just the final answer.

## Identified Limitations
During the development of [[entities/deepseek-r1.md]], the team attempted to use PRM but identified three core challenges that hindered its success:
1.  **Defining Steps**: It is challenging to explicitly define a fine-grained "step" in general, open-ended reasoning tasks.
2.  **Annotation Difficulty**: Determining the correctness of an intermediate reasoning step is itself a hard task. Automated annotation using models was unsatisfactory, while manual annotation does not scale.
3.  **Reward Hacking & Complexity**: Introducing a model-based PRM leads to issues of [[concepts/reward-hacking.md]] (Gao et al., 2022). Retraining the reward model adds computational cost and complexity to the training pipeline.

## Practical Utility
The authors conclude that while PRM can be useful for reranking top-N model responses or assisting in guided search (Snell et al., 2024), its advantages were limited compared to the additional computational overhead it introduced during large-scale [[concepts/reinforcement-learning.md]].

## Related pages
- [[concepts/reinforcement-learning.md]]
- [[concepts/reasoning-ability.md]]
- [[concepts/reward-hacking.md]]