# Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2023)

**Summary**: An inference-time technique that samples multiple, diverse reasoning paths via chain-of-thought prompting and then selects the most consistent final answer by marginalizing out the reasoning steps.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 58: Wang et al., 2023. Self-consistency improves chain of thought reasoning in language models. arXiv:2203.11171).

---

## Method
Self-Consistency builds upon **Chain-of-Thought (CoT)** prompting. Instead of using a single greedy decoding of the reasoning chain, it samples a set of diverse reasoning paths from the model (e.g., via temperature sampling). Each path leads to a potential final answer. The final answer is determined by a majority vote (or "marginalization") over all the sampled answers, effectively leveraging the "wisdom of the crowd" within the same model.

## Benefits for Reasoning Robustness
This technique significantly boosts the accuracy of CoT reasoning on arithmetic, commonsense, and symbolic reasoning benchmarks. It mitigates the brittleness of any single reasoning path, as errors in intermediate steps of one path can be outvoted by correct steps in others. It is a simple, powerful, and model-agnostic way to make [[concepts/llm-planning.md]] more reliable without additional training.

## Usage in Agent Systems
For [[concepts/autonomous-llm-agents.md]], Self-Consistency can be applied during the planning phase to generate multiple candidate plans or reasoning traces, then select the most coherent one. It is a form of "verification through diversity" that improves decision-making robustness. It is less computationally intensive than search-based methods like **Tree of Thoughts** but provides a solid baseline improvement over standard CoT.

## Related pages
- [[concepts/llm-planning.md]]
- [[sources/chain-of-thought-wei-et-al-2023.md]]
- [[sources/tree-of-thoughts-yao-et-al-2023.md]]