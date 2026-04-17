# ReAct: Synergizing Reasoning and Acting in Language Models (Yao et al., 2023)

**Summary**: A paradigm that interleaves reasoning (generating verbal chains of thought) and acting (executing actions like tool calls) to improve the transparency and effectiveness of language models in task-solving.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 66: Yao et al., 2023. React: Synergizing reasoning and acting in language models. arXiv:2210.03629).

---

## The ReAct Loop
The ReAct framework operates in a cycle: for a given task, the model **Reasons** about what to do next (generating a thought), then **Acts** based on that reasoning (e.g., using a search API, a calculator, or a code interpreter). The result of the action is observed, and the cycle repeats. This trace of thought-action-observation makes the agent's process interpretable and allows it to recover from errors dynamically.

## Impact on Agent Design
ReAct is a cornerstone for building [[concepts/tool-augmented-llms.md]] and practical [[concepts/autonomous-llm-agents.md]]. By intertwining reasoning and action, it addresses the limitations of models that only reason without acting (lacking grounding) or only act without reasoning (prone to errors in sequence). It demonstrates how [[concepts/llm-planning.md]] can be tightly coupled with execution, a pattern adopted by many subsequent agent frameworks.

## Extensions and Comparisons
ReAct is often compared and combined with other techniques. It is less computationally intensive than search-based methods like **Tree of Thoughts** but provides more structured deliberation than simple tool-calling. Variations like **Reflexion** add a self-reflection step to this loop. The ReAct pattern is evident in many interactive agents that use tools like web browsers or code interpreters.

## Related pages
- [[concepts/tool-augmented-llms.md]]
- [[concepts/llm-planning.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/tree-of-thoughts-yao-et-al-2023.md]]
- [[sources/reflexion-shinn-et-al-2023.md]]