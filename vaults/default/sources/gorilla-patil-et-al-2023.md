# Gorilla: Large Language Model Connected with Massive APIs (Patil et al., 2023)

**Summary**: An LLM fine-tuned to accurately generate API calls from natural language requests, significantly reducing hallucination of incorrect API specifications compared to general-purpose models.
**Source Context**: Fundamentals of Building Autonomous LLM Agents.pdf (Ref 44: Patil et al., 2023. Gorilla: Large language model connected with massive apis. arXiv:2305.15334).

---

## Focus on Accurate API Invocation
Gorilla is specifically designed for the tool-use component of an agent. It is trained on a massive corpus of API documentation (from TorchHub, TensorFlow Hub, and Hugging Face) to understand the precise syntax, parameters, and constraints of thousands of APIs. When given a user request, it outputs the correct executable API call, which is a critical step for reliable [[concepts/tool-augmented-llms.md]].

## Role in the Agent Ecosystem
Gorilla acts as a specialized "APIOracle" within an [[concepts/autonomous-llm-agents.md]] architecture. While a general planner (using [[concepts/llm-planning.md]]) might decide *that* an API should be called, Gorilla ensures *how* it is called correctly. This decomposition improves reliability. It is often compared to and used alongside frameworks like **Toolformer** (which learns tool use more generally) and **HuggingGPT** (which uses an LLM to orchestrate models).

## Impact and Evaluation
Gorilla demonstrated state-of-the-art performance on API call generation benchmarks, showing a dramatic reduction in hallucinated API attributes. Its development highlights the importance of domain-specific fine-tuning and retrieval-augmentation (using a retriever to fetch the latest API docs) for building practical, dependable agents that interact with real-world software ecosystems.

## Related pages
- [[concepts/tool-augmented-llms.md]]
- [[concepts/autonomous-llm-agents.md]]
- [[sources/toolformer-schick-et-al-2023.md]]
- [[sources/hugginggpt-shen-et-al-2023.md]]