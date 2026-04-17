# Multi-Plan Generation and Selection

**Summary**: A reasoning approach that generates multiple alternative plans for a task and then selects the optimal one, addressing the uncertainty and suboptimality of single-plan generation.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf, Section 4.2, Table 2.

---

Due to the complexity of tasks and LLM uncertainty, generating a single plan may be suboptimal. Multi-plan generation aims to create a diverse set of candidate plans. Strategies include:

- **Self-consistent CoT (CoT-SC)**: Generates multiple reasoning paths and selects the most frequent answer [58].
- **Tree-of-Thought (ToT)**: Uses a tree-like reasoning structure where each node is a "thought," and steps are selected based on LLM evaluations [65].
- **Graph of Thoughts (GoT)**: Extends ToT to graph structures, allowing thought aggregation and transformation [4].
- **LLM-MCTS and RAP**: Use LLMs as a heuristic policy for Monte Carlo Tree Search (MCTS) to generate multiple potential actions [68]. RAP [24] builds a world model to simulate plan benefits.

Plan selection then uses search algorithms (e.g., majority vote, BFS, DFS, MCTS) to choose the optimal plan. This approach allows broader exploration but comes with trade-offs in computational cost.

Multi-Plan Generation and Selection is a core component of the [[concepts/reasoning-system.md]] and builds upon [[concepts/task-decomposition.md]].

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/task-decomposition.md]]
- [[concepts/tree-of-thought.md]]
- [[concepts/graph-of-thoughts.md]]
- [[concepts/monte-carlo-tree-search.md]]