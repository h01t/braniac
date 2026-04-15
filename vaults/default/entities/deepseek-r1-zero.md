# DeepSeek-R1-Zero

**Summary**: A reasoning model trained by applying reinforcement learning directly to the base model DeepSeek-V3-Base without any supervised fine-tuning data, demonstrating emergent reasoning behaviors but suffering from readability issues.
**Source Context**: DeepSeek_R1.pdf

---

## Overview
DeepSeek-R1-Zero is the first-generation reasoning model from DeepSeek-AI, developed to explore whether LLMs can develop reasoning capabilities purely through [[concepts/reinforcement-learning.md]] without supervised fine-tuning (SFT). It uses [[entities/deepseek-v3-base.md]] as the base model and is trained with the [[entities/grpo.md]] algorithm.

## Training Methodology
The model was trained using a straightforward template (see Table 1 in the paper) that instructs the model to generate a reasoning process within `<think>` tags and an answer within `<answer>` tags. The reward system is rule-based, consisting of:
- **Accuracy rewards**: For deterministic tasks (e.g., math, coding), correctness is verified via rules or compilers.
- **Format rewards**: Enforce adherence to the specified output structure.

No neural reward models were used to avoid reward hacking and simplify the pipeline.

## Performance
According to the paper, DeepSeek-R1-Zero showed steady improvement during RL training. On the AIME 2024 benchmark, its pass@1 score increased from 15.6% to 71.0%. With majority voting (consensus over 64 samples), performance reached 86.7%, matching OpenAI-o1-0912. It also achieved high scores on other reasoning benchmarks like MATH-500 (95.9% pass@1) and LiveCodeBench (73.3% pass@1).

## Emergent Behaviors and Limitations
During RL, the model naturally developed powerful reasoning behaviors such as self-verification, reflection, and generating long chain-of-thoughts ([[concepts/chain-of-thought.md]]). However, it also exhibited challenges including poor readability, language mixing, and sometimes generating overly verbose or unstructured outputs.

## Significance
DeepSeek-R1-Zero is presented as a milestone that validates the feasibility of incentivizing reasoning capabilities purely through RL without SFT. It serves as a foundation for the improved DeepSeek-R1 model and provides insights into model [[concepts/self-evolution.md]].

## Related pages
- [[entities/deepseek-r1.md]]
- [[concepts/reinforcement-learning.md]]
- [[sources/deepseek-r1-paper.md]]