# LLM Planning

**Summary**: Techniques that enable large language models to decompose complex goals into sequences of actionable steps or reasoning paths, which is critical for robust autonomous agent behavior.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (References).

---

## The Planning Problem
For an [[concepts/autonomous-llm-agents.md]] to complete a non-trivial task, it must formulate a plan. LLM planning involves breaking down a high-level instruction, considering constraints, and sequencing sub-tasks, which may involve using [[concepts/tool-augmented-llms.md]]. Inherent challenges include coherence over long horizons, recovering from errors, and handling uncertainty.

## Prominent Methodologies
A foundational technique is **Chain-of-Thought (CoT) prompting** (Wei et al., 2023), which elicits step-by-step reasoning. **Tree of Thoughts (ToT)** (Yao et al., 2023) extends this by exploring multiple reasoning paths. The **ReAct** framework (Yao et al., 2023) interleaves planning (reasoning) with action (tool use). Other approaches include **Plan-and-Solve prompting** (Wang et al., 2023), **corrective re-prompting** (Liu et al., 2023), and decomposition-based planning for multiple constraints (Lu et al., 2025). Surveys (Huang et al., 2024) categorize these various paradigms.

## Connection to World Models and Reflection
Advanced planning connects to the concept of a **world model**, where the agent maintains an internal representation of the environment to simulate outcomes (Hao et al., 2023). **Reflection** or **self-refinement** techniques (e.g., Reflexion by Shinn et al., 2023; Self-Refine by Madaan et al., 2023) allow agents to critique and revise their plans based on outcomes, closing the loop between planning and execution.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/tool-augmented-llms.md]]
- [[sources/tree-of-thoughts-yao-et-al-2023.md]]
- [[sources/react-yao-et-al-2023.md]]
- [[sources/chain-of-thought-wei-et-al-2023.md]]