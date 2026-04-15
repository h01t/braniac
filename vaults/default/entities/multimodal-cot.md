# Multimodal-CoT

**Summary**: A prompting method for multimodal Chain of Thought that uses a two-stage pipeline of rationale generation and answer inference.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Multimodal-CoT is a [[concepts/prompting-for-mllms.md]] method designed to solve multimodal [[concepts/chain-of-thought.md]] problems. It involves two sequential stages:
1.  **Rationale Generation**: The model generates a reasoning process given multimodal inputs.
2.  **Answer Inference**: The model produces the final answer, using a combination of the original input and the generated rationale as input [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/prompting-for-mllms.md]]
- [[concepts/chain-of-thought.md]]