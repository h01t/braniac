# Hallucinations in LLMs

**Summary**: Hallucinations occur when LLMs generate responses that sound plausible but are incorrect or ungrounded in the provided information or established facts.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Definition and Categories
"Hallucinations" refer to a significant failure mode where LLM outputs diverge from factual reality. They are categorized into three types [483]:
1.  **Input-Conflicting Hallucination**: The generated content contradicts the user's provided input.
2.  **Context-Conflicting Hallucination**: The generated content contradicts information the LLM itself generated earlier in the interaction.
3.  **Fact-Conflicting Hallucination**: The generated content contradicts established world knowledge.

## Implications and Mitigation
Hallucinations undermine the reliability of LLMs, especially in high-stakes domains like medicine, law, and finance. They are a core challenge linked to the models' statistical nature and lack of true reasoning. Mitigation strategies include techniques like [[concepts/retrieval-augmented-generation.md]] to ground responses in external knowledge sources and improved training methodologies.

## Related pages
- [[concepts/llm-challenges.md]]
- [[concepts/reasoning-planning.md]]