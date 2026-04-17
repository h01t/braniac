# Tree of Thoughts: Deliberate Problem Solving with Large Language Models (Yao et al., 2023)

**Summary**: A framework that generalizes chain-of-thought prompting by exploring multiple reasoning paths (a "tree") for complex problem-solving, allowing for lookahead and backtracking.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 65: Yao et al., 2023. Tree of thoughts: Deliberate problem solving with large language models. arXiv:2305.10601).

---

## Methodology
Tree of Thoughts (ToT) frames problem-solving as a search over a tree where each node represents a partial solution or a "thought." The LLM is used to generate multiple candidate thoughts (expansion) and to evaluate the progress of each thought (evaluation). This allows the system to deliberately explore different reasoning pathways, prune unsuccessful ones, and backtrack—mimicking more human-like planning.

## Significance for Autonomous Agents
ToT is a major advance in [[concepts/llm-planning.md]] for [[concepts/autonomous-llm-agents.md]]. It moves beyond linear reasoning (like Chain-of-Thought) to enable better handling of tasks requiring exploration, strategic lookahead, or where initial decisions have long-term consequences. It provides a structured way for an agent to "think" before acting, improving reliability and success rates on complex puzzles, games, and creative tasks.

## Relation to Other Techniques
ToT is more computationally expensive than simpler prompting methods but offers greater problem-solving power. It is part of a family of advanced reasoning techniques that includes **ReAct** (which combines reasoning with action) and **Self-Consistency**. ToT's search-based approach is foundational for agents that need to plan in uncertain or complex state spaces.

## Related pages
- [[concepts/llm-planning.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/react-yao-et-al-2023.md]]
- [[sources/chain-of-thought-wei-et-al-2023.md]]