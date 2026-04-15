# Fine-tuning for MLLMs

**Summary**: A method to adapt pre-trained LLMs for multimodal tasks using instruction-following data, often employing parameter-efficient tuning via learnable interfaces.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

Derived from instruction tuning for NLP, this stream of [[concepts/multimodal-llms.md]] involves fine-tuning pre-trained LLMs on multimodal instructions to create chatbots or task solvers [Source: Comprehensive Overview of LLMs.pdf]. A central challenge is collecting high-quality multimodal instruction-following data, addressed through benchmark adaptation, self-instruction, and hybrid composition [Source: Comprehensive Overview of LLMs.pdf].

To bridge different modalities from frozen models, learnable interfaces are introduced. These are designed for parameter-efficient tuning:
*   **LLaMA-Adapter**: Uses an efficient transformer-based adapter module [Source: Comprehensive Overview of LLMs.pdf].
*   **LaVIN**: Dynamically learns multimodal feature weights using a mixture-of-modality adapter [Source: Comprehensive Overview of LLMs.pdf].

Alternatively, expert models can convert modalities into language directly. For example, **VideoChat-Text** incorporates the speech recognition expert model [[entities/whisper.md]] to generate video captions for an LLM [Source: Comprehensive Overview of LLMs.pdf].

## Related pages
- [[concepts/multimodal-llms.md]]
- [[concepts/instruction-tuning.md]]
- [[entities/llama-adapter.md]]
- [[entities/lavin.md]]
- [[entities/videochat-text.md]]