# Reasoning System

**Summary**: The component of an LLM agent that formulates plans, adapts to feedback, and evaluates actions using various reasoning techniques.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Function

The reasoning system receives task instructions and perceptual data, then generates a plan broken down into steps. It also adjusts the plan based on environmental feedback and evaluates actions for correctness and efficiency.

## Techniques

The paper mentions several reasoning techniques:

- [[concepts/chain-of-thought.md]] (CoT): Step-by-step reasoning that mimics human problem-solving.
- [[concepts/tree-of-thought.md]] (ToT): Explores multiple reasoning paths in a tree structure.
- ReAct: Combines reasoning and acting in an interleaved manner.
- Parallel planning: Such as DPPM or MCTS-based approaches.

## Research Question

The paper's RQ3 explores how these reasoning strategies affect task success rate, efficiency, and cost.

## Related pages
- [[concepts/chain-of-thought.md]]
- [[concepts/tree-of-thought.md]]
- [[sources/fundamentals-of-building-autonomous-llm-agents.md]]