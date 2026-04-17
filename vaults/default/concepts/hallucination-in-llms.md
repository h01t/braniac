# Hallucination in LLMs

**Summary**: The tendency of large language models to generate plausible-sounding but incorrect, nonsensical, or unfaithful information, posing a major challenge for reliability.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (References).

---

## Definition and Impact
Hallucination refers to outputs that are not grounded in the model's input data or factual knowledge. This is a critical barrier for deploying [[concepts/autonomous-llm-agents.md]] in high-stakes scenarios, as agents might act on false information. Hallucinations can be factual, logical, or involve incoherent text.

## Mitigation Strategies
Research addresses hallucination through multiple avenues. **Retrieval-Augmented Generation (RAG)** is a primary method to ground responses in external, verified sources. Techniques like **self-consistency** (Wang et al., 2023) and **verification frameworks** (e.g., Devil's Advocate by Wang et al., 2024) aim to improve reasoning robustness. For multimodal models, improving visual grounding is a focus. Comprehensive surveys (Huang et al., 2025) categorize causes, types, and current mitigation techniques.

## Relation to Agent Design
For agents, hallucination mitigation is integral to the **planning**, **tool-use**, and **reflection** cycles. An agent must verify its plans and the results of its actions. Approaches like **Self-Refine** (Madaan et al., 2023) use iterative self-feedback to correct errors. Ensuring factual correctness is also a goal of **cognitive automation** research, which aims to build user-like bots that are trustworthy.

## Related pages
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/retrieval-augmented-generation.md]]
- [[concepts/llm-planning.md]]
- [[sources/hallucination-survey-huang-et-al-2025.md]]
- [[sources/self-refine-madaan-et-al-2023.md]]