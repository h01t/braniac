# Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (Wei et al., 2023)

**Summary**: A prompting technique that encourages large language models to generate a step-by-step reasoning process before delivering a final answer, significantly improving performance on complex reasoning tasks.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 60: Wei et al., 2023. Chain-of-thought prompting elicits reasoning in large language models. arXiv:2201.11903).

---

## Core Technique
Chain-of-Thought (CoT) prompting involves providing the LLM with a few examples where the reasoning process is explicitly laid out in the prompt (few-shot CoT) or simply instructing the model to "think step by step" (zero-shot CoT). This scaffolding helps the model decompose problems, manage intermediate calculations, and produce more accurate final outputs, especially in arithmetic, commonsense, and symbolic reasoning tasks.

## Foundational Role in Agent Reasoning
CoT is arguably the foundational breakthrough for [[concepts/llm-planning.md]] within [[concepts/autonomous-llm-agents.md]]. It demonstrated that LLMs possess latent reasoning capabilities that can be unlocked via prompting. Nearly all subsequent advanced reasoning frameworks (like **Tree of Thoughts**, **ReAct**, and **Plan-and-Solve**) build upon or extend the core idea of generating an explicit reasoning trace.

## Enhancements and Variants
**Self-Consistency** (Wang et al., 2023) improves CoT by sampling multiple reasoning chains and taking the most consistent answer. **Complexity-based prompting** and **least-to-most prompting** are other variants. CoT reasoning is a critical sub-component within agent architectures, used during the planning phase before an action is taken.

## Related pages
- [[concepts/llm-planning.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/self-consistency-wang-et-al-2023.md]]
- [[sources/tree-of-thoughts-yao-et-al-2023.md]]