# Hu et al., LoRA (2021)

**Summary**: The seminal paper introducing Low-Rank Adaptation (LoRA), a parameter-efficient fine-tuning method that achieves strong performance by adapting large language models with a very small number of trainable parameters.
**Source Context**: Hu, E.J., Shen, Y., Wallis, P., et al. *LoRA: Low-Rank Adaptation of Large Language Models*, arXiv:2106.09685 (2021). From Comprehensive Overview of LLMs.pdf (citation 250)

---

This paper proposes [[concepts/lora-low-rank-adaptation.md]], a technique that freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture. This allows efficient adaptation of large models like GPT-3 with significantly reduced GPU memory requirements and storage overhead, as only a tiny fraction of parameters are updated.

LoRA has become a cornerstone of [[concepts/training-efficiency-techniques.md]], enabling fine-tuning of very large models on consumer hardware and facilitating rapid experimentation and customization.

## Related pages
- [[concepts/lora-low-rank-adaptation.md]]
- [[concepts/training-efficiency-techniques.md]]
- [[entities/hu-ej.md]]