# Reinforcement Learning

**Summary**: A machine learning paradigm where an agent learns to make decisions by optimizing cumulative rewards, used in DeepSeek-R1 to incentivize reasoning capabilities without supervised fine-tuning.
**Source Context**: DeepSeek_R1.pdf

---

## Role in DeepSeek-R1
The DeepSeek-R1 paper emphasizes using large-scale reinforcement learning (RL) as a core method to enhance reasoning in LLMs. Specifically, the models [[entities/deepseek-r1-zero.md]] and [[entities/deepseek-r1.md]] are trained via RL algorithms, demonstrating that reasoning can emerge through reward-driven optimization.

## Algorithm: GRPO
The paper adopts Group Relative Policy Optimization ([[entities/grpo.md]]) as the RL algorithm. GRPO foregoes a critic model and instead estimates a baseline from group scores, reducing training costs. The objective function (Equation 1 in the paper) maximizes expected advantage while controlling policy deviation via a KL penalty.

## Reward Design
For RL training, the paper uses a rule-based reward system comprising:
- **Accuracy rewards**: For tasks with deterministic answers (e.g., math, coding), correctness is verified via rules or compilers.
- **Format rewards**: Enforce structural constraints, such as requiring the model to output reasoning within `<think>` tags.
The paper avoids neural reward models to prevent reward hacking and simplify the pipeline.

## Impact on Reasoning
RL enables the model to explore and solidify effective [[concepts/chain-of-thought.md]] patterns. The paper notes that through RL, models naturally develop behaviors like self-verification and reflection, leading to significant benchmark improvements (e.g., AIME score increase from 15.6% to 71.0% for DeepSeek-R1-Zero).

## Comparison to Other Methods
The paper contrasts RL with other approaches like process-based reward models and search algorithms, positioning RL as a key enabler for achieving performance comparable to OpenAI's o1 series.

## Related pages
- [[entities/grpo.md]]
- [[concepts/chain-of-thought.md]]
- [[concepts/reward-modeling.md]]
- [[sources/deepseek-r1-paper.md]]