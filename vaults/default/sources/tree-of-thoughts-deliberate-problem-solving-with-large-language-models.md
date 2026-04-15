# Tree of Thoughts: Deliberate Problem Solving with Large Language Models

**Summary**: The Tree of Thoughts (ToT) framework generalizes chain-of-thought prompting by enabling LLMs to explore multiple reasoning paths (a "tree") for complex problem-solving, allowing for lookahead and backtracking.
**Source Context**: arXiv preprint (2023), https://arxiv.org/abs/2305.10601. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
Unlike linear Chain-of-Thought, Tree of Thoughts frames reasoning as a search process over a tree structure, where each "thought" is a coherent language sequence that serves as an intermediate step toward solving a problem. The LLM is used to generate multiple potential next steps and to evaluate their promise, enabling more systematic exploration akin to classical search algorithms.

## Key Insights
This approach is particularly powerful for tasks that require planning, strategic decision-making, or where the initial approach might be wrong. It introduces non-linear [[concepts/reasoning.md]] and [[concepts/planning.md]] capabilities into LLMs, moving them closer to general problem solvers.

## Technical Approach
A ToT process involves iteratively using the LLM for two functions: 1) *Thought generation* to branch the current state into multiple candidate continuations, and 2) *State evaluation* to assess the utility of different states (thoughts) to guide the search (e.g., via breadth-first or depth-first search).

## Related pages
- [[concepts/reasoning.md]]
- [[concepts/chain-of-thought.md]]
- [[concepts/planning.md]]
- [[concepts/problem-solving.md]]