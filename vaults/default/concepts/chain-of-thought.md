# Chain-of-Thought

**Summary**: A prompting technique that encourages a language model to generate a step-by-step reasoning process before producing a final answer, significantly improving its performance on complex reasoning tasks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Chain-of-Thought (CoT) prompting is a foundational method for eliciting reasoning from LLMs. By providing examples that break down a problem into intermediate steps, or simply instructing the model to "think step by step," CoT unlocks the model's ability to solve arithmetic, commonsense, and symbolic reasoning problems that standard prompting often fails at.

## Role in LLM-Powered Agents
CoT reasoning is central to the planning and decision-making modules of [[concepts/llm-powered-agents.md]]. Agents use CoT and its extensions (like Tree-of-Thoughts and Self-Consistency) to logically outline action plans, evaluate different paths, and reason about task completion (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/llm-powered-agents.md]]