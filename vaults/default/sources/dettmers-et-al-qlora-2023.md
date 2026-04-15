# Dettmers et al., QLoRA (2023)

**Summary**: Introduces QLoRA, an efficient fine-tuning method that combines 4-bit quantization with Low-Rank Adapters (LoRA), enabling the fine-tuning of extremely large 65B parameter models on a single 48GB GPU while maintaining full 16-bit fine-tuning task performance.
**Source Context**: Dettmers, T., Pagnoni, A., Holtzman, A., Zettlemoyer, L. *QLoRA: Efficient Finetuning of Quantized LLMs*, arXiv:2305.14314 (2023). From Comprehensive Overview of LLMs.pdf (citation 261)

---

QLoRA is a major advance in [[concepts/model-compression.md]] and [[concepts/training-efficiency-techniques.md]]. It builds upon [[concepts/lora-low-rank-adaptation.md]] (Hu et al., 2021) and 4-bit quantization techniques. The core innovation is a new data type, 4-bit NormalFloat (NF4), and Double Quantization, which reduces the memory footprint of the quantization constants.

This method democratizes access to fine-tuning state-of-the-art large language models by drastically reducing hardware requirements, making it a key enabler for research and application development.

## Related pages
- [[concepts/lora-low-rank-adaptation.md]]
- [[concepts/model-compression.md]]
- [[concepts/training-efficiency-techniques.md]]
- [[entities/dettmers-t.md]]