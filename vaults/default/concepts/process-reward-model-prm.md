# Process Reward Model (PRM)

**Summary**: A technique that provides fine-grained reinforcement learning rewards based on the correctness of individual reasoning steps, not just the final answer.
**Source Context**: DeepSeek_R1.pdf

---

## Concept and Potential
A **Process Reward Model (PRM)** is designed to guide a model toward better problem-solving approaches by rewarding correct intermediate steps during reasoning. This contrasts with outcome-based reward models that only judge the final answer. The approach is inspired by related work (e.g., Lightman et al., 2023) (Source: DeepSeek_R1.pdf).

Theoretically, PRMs could help models learn more robust and verifiable reasoning chains.

## Limitations and Unsuccessful Attempt in DeepSeek-R1
The DeepSeek-R1 team explored PRMs but categorized the attempt as unsuccessful for their large-scale RL training pipeline. They identified three main limitations:

1.  **Defining Fine-Grained Steps**: It is challenging to explicitly define what constitutes a valid, fine-grained reasoning step in *general* reasoning tasks (beyond specific domains like math).
2.  **Annotation Challenge**: Determining whether an intermediate step is correct is difficult. Automated annotation using models may be unreliable, while manual annotation does not scale well.
3.  **Reward Hacking and Complexity**: Introducing a model-based PRM can lead to **reward hacking** (where the model optimizes for the reward signal rather than genuine correctness). Retraining the reward model adds significant computational overhead and complexity to the training pipeline (Source: DeepSeek_R1.pdf).

## Conclusion from the Paper
While PRMs may be useful for tasks like reranking top-N model responses or assisting in guided search, the DeepSeek-R1 team found their advantages were **limited compared to the additional computational overhead they introduced** in the context of their large-scale reinforcement learning experiments (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]
- [[concepts/monte-carlo-tree-search-mcts.md]]