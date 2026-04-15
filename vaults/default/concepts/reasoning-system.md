# Reasoning System

**Summary**: The component of an LLM agent that formulates plans, breaks down tasks into steps, adapts based on feedback, and evaluates its own actions to improve execution.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Core Responsibilities
The reasoning system is the cognitive core of an [[concepts/llm-agent.md]]. It receives task instructions along with processed data from the [[concepts/perception-system.md]]. Its primary responsibilities are:
1.  **Plan Formulation**: Generating a strategy or sequence of steps to achieve a given goal.
2.  **Adaptation**: Adjusting the plan dynamically based on feedback from the environment or the results of previous actions.
3.  **Evaluation and Reflection**: Assessing the success of its own actions, identifying errors, and re-planning to correct mistakes or improve efficiency [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Key Techniques and Architectures
The source highlights several reasoning strategies that empower agents:
- **Chain-of-Thought (CoT)**: Encourages the LLM to generate intermediate reasoning steps before arriving at a final answer, mimicking a sequential thought process.
- **Tree-of-Thought (ToT)**: Extends CoT by exploring multiple reasoning paths simultaneously (like branches of a tree), allowing the agent to consider alternatives and backtrack if needed.
- **ReAct (Reasoning + Acting)**: A paradigm that interleaves reasoning steps with actionable steps, allowing the agent to reason about what action to take next based on observations.
- **Parallel Planning & Search-Based Approaches**: Techniques like Monte Carlo Tree Search (MCTS) or algorithms like DPPM can be used for more systematic exploration of action spaces in complex planning scenarios [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Role in Autonomy
This system is what primarily distinguishes an agent from a [[concepts/agent-vs-workflow.md|workflow]]. While a workflow executes a pre-defined sequence, the reasoning system enables the agent to generate its own plans and adapt them in real-time, which is essential for operating in unpredictable environments [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Research Focus
One of the paper's research questions (**RQ3**) focuses on evaluating how different reasoning strategies affect task success rate, efficiency, and cost [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/llm-agent.md]]
- [[concepts/agent-vs-workflow.md]]