# Rewoo: Decoupling Reasoning from Observations for Efficient Augmented Language Models

**Summary**: This paper introduces the Rewoo framework, which improves the efficiency of augmented language models by separating the reasoning process from the step of gathering observations from tools or environments.
**Source Context**: arXiv preprint (2023), https://arxiv.org/abs/2305.18323. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
Rewoo (Reasoning Without Observation) is a paradigm designed for agentic systems where large language models use external tools. It argues that the typical interleaving of reasoning and acting (like in ReAct) can be inefficient. By decoupling them, the model can plan a full reasoning chain first, then execute necessary observations/tool calls in a more batched or parallel manner.

## Key Insights
The decoupling aims to reduce latency and the number of costly LLM calls or API interactions. It treats reasoning as a planning phase and observation as an execution phase, which can be optimized separately. This aligns with broader research into making [[concepts/llm-agents.md]] more practical and scalable.

## Technical Approach
The framework likely involves the LLM first generating a reasoning plan or a set of sub-tasks without immediate feedback, then systematically gathering all required information from tools (e.g., search, calculators, databases), and finally synthesizing the final answer.

## Related pages
- [[concepts/reasoning.md]]
- [[concepts/llm-agents.md]]
- [[concepts/tool-use.md]]
- [[concepts/efficiency.md]]