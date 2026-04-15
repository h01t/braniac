# Large Language Models as Commonsense Knowledge for Large-Scale Task Planning

**Summary**: This paper investigates using the implicit commonsense knowledge within LLMs to aid in large-scale, long-horizon task planning for robots or virtual agents, treating the LLM as a source of priors and constraints.
**Source Context**: In: Thirty-seventh Conference on Neural Information Processing Systems (2023), https://openreview.net/forum?id=Wjp1AYB8lH. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
The work focuses on the problem of decomposing high-level goals into sequences of executable actions over long time horizons. It proposes using LLMs not as the planner itself, but as a knowledge base to inform a traditional planning system (e.g., a PDDL-based planner) about plausible actions, object affordances, and preconditions.

## Key Insights
LLMs encode a vast amount of commonsense about how the world works, which is difficult to codify manually. This paper's approach extracts this knowledge to make automated planning more robust and scalable in open-world domains, connecting [[concepts/llm-agents.md]] with classical [[concepts/planning.md]].

## Technical Approach
The methodology likely involves querying the LLM to generate potential action schemas, object properties, or constraints, which are then formalized into a format a symbolic planner can use. This hybrid approach aims to combine the knowledge breadth of LLMs with the rigor and guarantee of classical planners.

## Related pages
- [[concepts/planning.md]]
- [[concepts/commonsense-reasoning.md]]
- [[concepts/llm-agents.md]]
- [[concepts/knowledge-representation.md]]