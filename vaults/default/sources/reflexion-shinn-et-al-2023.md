# Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)

**Summary**: An agent framework that adds a dynamic memory of past failures and successes, coupled with a "self-reflection" step, to enable learning from trial and error in language-based environments.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 49: Shinn et al., 2023. Reflexion: Language agents with verbal reinforcement learning. arXiv:2303.11366).

---

## Architecture with Episodic Memory
Reflexion enhances a standard **ReAct**-style agent with two key components: an **episodic memory** that stores trajectories (action sequences) and their outcomes (success/failure), and a **self-reflection** step. After a failure, the agent generates a verbose, natural language explanation of what went wrong and stores this reflection in memory. On subsequent attempts, it retrieves relevant reflections to avoid repeating past mistakes.

## Learning from Experience
This approach implements a form of **verbal reinforcement learning**. Instead of updating numeric weights, the agent updates its knowledge in the form of textual reflections. This allows it to improve its performance over multiple episodes in environments like AlfWorld (text-based games) or HotPotQA (question answering), where it can retry tasks. It directly addresses the challenge of making [[concepts/autonomous-llm-agents.md]] adaptive and capable of lifelong learning.

## Comparison to Self-Refine
While **Self-Refine** (Madaan et al., 2023) focuses on iterative refinement within a single task instance, Reflexion is designed for learning across multiple *trials* or *episodes*. It explicitly maintains a memory of past experiences to guide future behavior, making it suitable for environments where an agent can attempt a task repeatedly with variations.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[sources/react-yao-et-al-2023.md]]
- [[sources/self-refine-madaan-et-al-2023.md]]