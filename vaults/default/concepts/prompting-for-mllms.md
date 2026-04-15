# Prompting for MLLMs

**Summary**: A technique to guide multimodal LLMs for specialized tasks by providing context, examples, or instructions without updating the model's parameters.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

This technique constructs [[concepts/multimodal-llms.md]] by providing prompts, which reduces the need for large-scale multimodal data compared to [[concepts/fine-tuning-for-mllms.md]] [Source: Comprehensive Overview of LLMs.pdf]. A prominent application is in solving multimodal Chain of Thought (CoT) problems. Methods include:
*   **Multimodal-CoT**: Uses a two-stage process of rationale generation and answer inference [Source: Comprehensive Overview of LLMs.pdf].
*   **CoT-PT**: Applies prompt tuning and specific visual bias to generate reasoning implicitly [Source: Comprehensive Overview of LLMs.pdf].

LLMs can also be prompted with multimodal descriptions and tools to decompose complex tasks [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/chain-of-thought.md]]
- [[entities/multimodal-cot.md]]
- [[entities/cot-pt.md]]