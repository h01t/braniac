# Agent Workflow Memory (Wang et al., 2024)

**Summary**: A framework or architecture for providing autonomous agents with a persistent, structured memory of past workflows, actions, and outcomes to improve efficiency and consistency in complex, multi-session tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 59: Wang et al., 2024. Agent workflow memory. arXiv:2409.07429).

---

## Problem Addressed
Autonomous agents often operate in a stateless manner, forgetting what they did in previous sessions or on similar tasks. This leads to inefficiency (re-solving the same sub-problems) and inconsistency. Agent Workflow Memory aims to give agents a form of **long-term, episodic memory** specifically tailored to the workflows they execute.

## Proposed Mechanism
The paper likely describes a system where an agent's actions, the resulting states, and successful task decompositions are logged and indexed in a queryable memory store. When faced with a new task, the agent can retrieve relevant past workflows (or sub-workflows) to reuse or adapt, rather than planning from scratch. This is a specialized form of [[concepts/retrieval-augmented-generation.md]] applied to procedural knowledge.

## Benefit for Autonomous Agents
This capability is crucial for making [[concepts/autonomous-llm-agents.md]] more practical and scalable. It enables learning from experience, reduces computational costs, and ensures more reliable performance over time. It relates to other memory-focused works like **MemoryBank** (Zhong et al., 2023) and the reflection mechanisms in **Reflexion**, but with a focus on capturing and reusing procedural workflows.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/retrieval-augmented-generation.md]]
- [[sources/reflexion-shinn-et-al-2023.md]]