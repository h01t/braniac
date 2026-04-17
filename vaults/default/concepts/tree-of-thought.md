# Tree-of-Thought (ToT)

**Summary**: A reasoning approach using tree-like structures to generate and evaluate multiple plans or thoughts, often integrated with search algorithms like BFS or DFS for optimal selection.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf

---

## Definition
Tree-of-Thought is a technique for multi-plan generation and selection within [[concepts/reasoning-system.md]], where LLMs explore branching reasoning paths in a tree structure (Source: Section 4.2, Table 2).

## Mechanism
- **Expansion and Selection**: Uses search algorithms like Breadth-First Search (BFS) and Depth-First Search (DFS) to expand thoughts and evaluate multiple actions for optimal choice (Source: Section 4.2).
- **Graph Extension**: Graph-of-Thoughts (GoT) extends ToT with graph structures for flexible thought aggregation (Source: Table 2).

## Relation to Other Methods
- Similar to LLM-MCTS and RAP, which use tree structures with [[concepts/monte-carlo-tree-search.md]] for multi-plan searches (Source: Section 4.2).
- Part of broader multi-plan selection strategies that include self-consistency (majority vote) (Source: Section 4.2).

## Advantages and Challenges
**Advantages**:
- Explores diverse solutions for robust planning (Source: Table 2).
- Scalable for complex tasks with large search spaces (Source: Table 2).

**Challenges**:
- High computational demands (Source: Table 2).
- Stochastic LLM nature may affect plan consistency (Source: Section 4.2).

## Related pages
- [[concepts/reasoning-system.md]]
- [[concepts/monte-carlo-tree-search.md]]
- [[concepts/multi-plan-generation.md]]