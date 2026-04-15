# Alignment

**Summary**: The process of steering the behavior of a large language model to be helpful, honest, harmless, and aligned with human values and intent.
**Source Context**: Encompasses a broad research area referenced by papers on reinforcement learning from human feedback (RLHF), constitutional AI, and direct preference optimization.

---

## Key Methods
1.  **Reinforcement Learning from Human Feedback (RLHF)**: A multi-stage process. A pre-trained model is fine-tuned on human demonstrations (supervised fine-tuning). A reward model is then trained on human rankings of model outputs. Finally, the model is optimized against this reward model using reinforcement learning (e.g., PPO). This was foundational for models like InstructGPT and ChatGPT [Source: [100]].
2.  **Constitutional AI (CAI)**: An approach where harmlessness is instilled via AI feedback instead of human feedback. The model critiques and revises its own responses according to a set of principles (a "constitution") [Source: [173]].
3.  **Direct Preference Optimization (DPO)**: A simpler, more stable alternative to RLHF that directly optimizes a language model on preference data without training a separate reward model or using reinforcement learning [Source: [168]].

## Related Techniques
Alignment often builds upon [[concepts/instruction-tuning.md]] as a first step. Other related concepts include learning from demonstrations [Source: [144]], using external tools for verification (WebGPT) [Source: [166]], and targeted human judgment collection [Source: [167]].