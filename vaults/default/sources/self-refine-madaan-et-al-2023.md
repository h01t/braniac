# Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)

**Summary**: A framework where an LLM generates an output, provides self-feedback on its own output, and then refines the output based on that feedback, iteratively improving quality without human intervention.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 38: Madaan et al., 2023. Self-refine: Iterative refinement with self-feedback. arXiv:2303.17651).

---

## The Iterative Refinement Loop
Self-Refine operates through a simple but powerful loop: for a given task (e.g., code generation, math reasoning, creative writing), the model first produces an **initial output**. It then steps back and acts as a critic, generating **feedback** on its own output (e.g., pointing out bugs, stylistic issues, or logical errors). Finally, it acts as a refiner, generating a **revised output** conditioned on the initial attempt and the feedback. This can repeat for multiple cycles.

## Application in Autonomous Agents
Self-Refine embodies the "reflection" or "self-improvement" capability that is crucial for robust [[concepts/autonomous-llm-agents.md]]. It allows an agent to critique and correct its own plans, code, or reasoning traces, reducing errors and [[concepts/hallucination-in-llms.md]]. This technique is complementary to [[concepts/llm-planning.md]] frameworks like **ReAct** and **Tree of Thoughts**, adding a quality assurance layer. It is a key method for enabling iterative task completion without constant human oversight.

## Relation to Other Techniques
Similar ideas are explored in **Reflexion** (Shinn et al., 2023), which uses verbal reinforcement learning, and in **Devil's Advocate** (Wang et al., 2024), which proactively generates counter-arguments. Self-Refine is notable for its generality and application across diverse task types, from programming to dialogue response.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/hallucination-in-llms.md]]
- [[sources/reflexion-shinn-et-al-2023.md]]