# Patil et al., Gorilla (2023)

**Summary**: Introduces Gorilla, a large language model fine-tuned to accurately invoke APIs by generating syntactically correct and contextually appropriate API calls, enabling it to interact with massive tool libraries.
**Source Context**: Patil, S.G., Zhang, T., Wang, X., Gonzalez, J.E. *Gorilla: Large language model connected with massive APIs*, arXiv:2305.15334 (2023). From Comprehensive Overview of LLMs.pdf (citation 221)

---

Gorilla represents a significant step in [[concepts/tool-use-agents.md]]. It is specifically trained to reduce "hallucination" of incorrect API calls—a major problem when LLMs are used for tool manipulation. By fine-tuning on a large corpus of API documentation and examples, Gorilla learns to generate precise function calls, bridging the gap between natural language user requests and executable code.

This capability is foundational for building LLM-powered agents that can perform tasks across different software environments and services.

## Related pages
- [[concepts/tool-use-agents.md]]
- [[concepts/hallucination.md]]
- [[entities/patil-sg.md]]