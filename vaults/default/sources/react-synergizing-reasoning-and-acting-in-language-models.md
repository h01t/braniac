# ReAct: Synergizing Reasoning and Acting in Language Models

**Summary**: The ReAct paradigm interleaves reasoning (generating verbal chains of thought) and acting (taking actions like using a search API) in language models, leading to more transparent, reliable, and effective task performance.
**Source Context**: arXiv preprint (2023), https://arxiv.org/abs/2210.03629. Cited in "Fundamentals of Building Autonomous LLM Agents.pdf".

---

## Overview
ReAct (Reasoning + Acting) is a foundational framework for building autonomous agents with LLMs. It prompts the model to generate a *thought* (reasoning trace) explaining its rationale, then an *action* (e.g., `Search(...)`), and then observes the result, in a loop. This synergy improves both the decision quality and interpretability.

## Key Insights
The reasoning trace helps maintain task focus and allows for recovery from errors, while acting grounds the reasoning in real-world information. It addresses the limitations of models that only reason (lacking current data) or only act (opaque and prone to error cascades). It is a cornerstone for [[concepts/llm-agents.md]].

## Technical Approach
The agent operates in a step-by-step loop: Thought -> Act -> Observation. The thought often takes the form of "I need to find X because..." and the action is a structured call to an allowed tool. This pattern is widely used as a baseline for agentic systems.

## Related pages
- [[concepts/llm-agents.md]]
- [[concepts/reasoning.md]]
- [[concepts/tool-use.md]]
- [[concepts/chain-of-thought.md]]