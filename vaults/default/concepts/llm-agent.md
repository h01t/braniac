# LLM Agent

**Summary**: An autonomous system powered by a large language model (LLM) that can perceive, reason, act, and learn from feedback to complete complex tasks in dynamic environments.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf.

---

## Definition and Purpose
An LLM agent is a system that uses a large language model as its core reasoning engine to achieve autonomy. Unlike standard LLMs, which are limited by their chatbot nature, agents are augmented with subsystems that allow them to pursue goals, interact with tools, and adapt to feedback [[sources/fundamentals-of-building-autonomous-llm-agents.md]]. They are designed to act as intelligent collaborators, automating decision-making and performing tasks that are costly, time-consuming, or infeasible for traditional software [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Core Constituent Systems
According to the source, an LLM agent is constituted by four interconnected systems:
1.  **Perception System**: Acts as the agent's "eyes and ears," converting environmental stimuli into a format the LLM can understand.
2.  **Reasoning System**: Formulates plans, adapts them based on feedback, and evaluates actions.
3.  **Memory System**: Retains knowledge from past experiences and external data.
4.  **Action System**: Translates the LLM's decisions into concrete actions that impact the environment.
The integration of these systems enables the agent to mimic human cognitive processes for autonomous behavior [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Distinction from Workflows
A key distinction is made between agents and [[concepts/agent-vs-workflow.md|workflows]]. While both enhance LLM capabilities, workflows follow a pre-established, fixed sequence of steps and struggle to adapt to errors or unexpected events. In contrast, agents generate their own strategies, dynamically re-plan based on environmental feedback, and are designed for unpredictable environments [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Motivation and Challenges
The development of LLM agents is motivated by the limitations of traditional LLMs, which lack long-term memory, cannot autonomously interact with tools, and struggle with multi-step reasoning in dynamic settings [[sources/fundamentals-of-building-autonomous-llm-agents.md]]. Building effective agents faces challenges such as GUI grounding difficulties, repetitive action loops, and a noted performance gap with human capabilities, as seen in benchmarks like [[entities/osworld-benchmark.md]] [[sources/fundamentals-of-building-autonomous-llm-agents.md]].

## Related pages
- [[concepts/perception-system.md]]
- [[concepts/reasoning-system.md]]
- [[concepts/memory-system.md]]
- [[concepts/action-system.md]]
- [[concepts/agent-vs-workflow.md]]