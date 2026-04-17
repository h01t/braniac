# Monte Carlo Tree Search (MCTS)

**Summary**: A search algorithm used in LLM agents, particularly in methods like LLM-MCTS and RAP, to generate and evaluate multiple plans by leveraging LLMs as heuristic policy functions.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Definition
Monte Carlo Tree Search is employed in [[concepts/reasoning-system.md]] for multi-plan generation and selection, where LLMs act as heuristic policies to explore potential actions or plans through multiple simulations (Source: Section 4.2).

## Applications
- **LLM-MCTS**: Uses MCTS with LLMs to obtain multiple potential actions during the search process (Source: Section 4.2).
- **RAP (Reasoning via Planning)**: Builds a world model to simulate plan benefits using MCTS for final plan generation (Source: Section 4.2).

## Integration with Tree Structures
MCTS facilitates multi-plan searches in tree structures, similar to [[concepts/tree-of-thought.md]], but focused on stochastic simulations and heuristic evaluations (Source: Section 4.2).

## Advantages and Challenges
**Advantages**:
- Enables broad exploration of solutions in expansive search spaces (Source: Section 4.2).
- Scalable for complex tasks (Source: Table 2).

**Challenges**:
- Increased computational demands (Source: Section 4.2).
- Reliance on LLMs for evaluation introduces ranking challenges and randomness (Source: Section 4.2).

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/tree-of-thought.md]]
- [[concepts/multi-plan-generation.md]]