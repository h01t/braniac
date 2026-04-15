# Wei et al. Chain-of-Thought Prompting (2022)

**Summary**: Introduces chain-of-thought prompting, a simple but powerful method to improve the reasoning abilities of large language models by prompting them to generate intermediate reasoning steps.
**Source Context**: *Advances in Neural Information Processing Systems*, 35, 2022.

---

## Core Idea
The paper demonstrates that by simply adding "Let's think step by step" or providing few-shot examples where the reasoning process is laid out, large language models can be prompted to perform [[concepts/chain-of-thought.md]] reasoning. This approach requires no change to the model weights.

The generated chain of thought serves as an interpretable window into the model's potential reasoning process and drastically improves performance on tasks requiring multi-step arithmetic, commonsense, and symbolic reasoning. The authors show that this capability emerges with model scale, being far more effective in large models (e.g., 100B+ parameters) than in smaller ones [Source: [103]].

## Impact and Legacy
This paper sparked a major research direction in improving LLM reasoning. It led to numerous follow-ups on improving CoT (e.g., Self-Consistency, Tree of Thoughts) and integrating it into training (CoT fine-tuning). It highlighted that the *way* we query models (prompting) is as important as their underlying architecture or scale.