# A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions (Huang et al., 2025)

**Summary**: A comprehensive academic survey that systematically categorizes the causes, types, and mitigation strategies for hallucination in LLMs, outlining the ongoing research challenges.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 25: Huang et al., 2025. A survey on hallucination in large language models: Principles, taxonomy, challenges, and open questions. ACM Transactions on Information Systems, 43(2)).

---

## Taxonomy and Analysis
The survey likely provides a detailed taxonomy of hallucinations, such as **factual hallucination** (incorrect facts), **faithfulness hallucination** (contradicting source input), and **coherence hallucination** (internally inconsistent text). It analyzes root causes, including training data biases, parametric knowledge limitations, decoding algorithms, and prompt design. This structured analysis is crucial for diagnosing and addressing the problem.

## Mitigation Strategies Reviewed
A major section would review existing mitigation techniques, which include: **Retrieval-Augmented Generation (RAG)** for grounding, **improved decoding** (like self-consistency), **verification and self-reflection** (e.g., Self-Refine, Reflexion), **constrained decoding**, and **specialized training**. The survey evaluates the strengths and limitations of each approach.

## Critical Relevance to Autonomous Agents
For [[concepts/autonomous-llm-agents.md]], hallucination is not just an output quality issue but a potential source of catastrophic action failure. This survey is therefore a key reference for agent architects, providing a scientific foundation for selecting and combining techniques (planning, tool use, verification, RAG) to build more trustworthy and reliable autonomous systems. It directly addresses a top concern in the field.

## Related pages
- [[concepts/hallucination-in-llms.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[concepts/retrieval-augmented-generation.md]]
- [[sources/self-refine-madaan-et-al-2023.md]]