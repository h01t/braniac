# Visual Reasoning with LLMs

**Summary**: The application of large language models to analyze visual information and integrate it with language, offering benefits in generalization, emergent abilities, and interactivity.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Recent visual reasoning systems leverage LLMs for improved visual-language integration, moving beyond earlier methods that relied on limited VQA datasets [Source: Comprehensive Overview of LLMs.pdf]. LLM-aided methods offer stronger generalization, emergent abilities, and interactivity.

These systems utilize [[concepts/prompting-for-mllms.md]] and [[concepts/fine-tuning-for-mllms.md]] techniques. For example:
*   **PointClip V2**: Uses an LLM to generate 3D-specific prompts, which are encoded and combined with visual features for 3D recognition [Source: Comprehensive Overview of LLMs.pdf].
*   **GPT4Tools**: Employs LoRA to fine-tune an LLM on tool-related instructions [Source: Comprehensive Overview of LLMs.pdf].

In these systems, LLMs can serve as controllers, decision makers, or semantics refiners [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[entities/pointclip-v2.md]]
- [[entities/gpt4tools.md]]