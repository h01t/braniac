# LoRA (Low-Rank Adaptation)

**Summary**: A parameter-efficient fine-tuning method that adapts large language models by injecting trainable low-rank matrices into the model's layers, drastically reducing the number of trainable parameters.
**Source Context**: Comprehensive Overview of LLMs.pdf (citation 250)

---

**Summary**: [[concepts/lora-low-rank-adaptation.md]] is a dominant technique for [[concepts/training-efficiency-techniques.md]]. It freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of parameters that need to be updated.
**Source Context**: Hu et al., *LoRA: Low-Rank Adaptation of Large Language Models*, arXiv:2106.09685 (2021) [[sources/hu-et-al-lora-2021.md]].

---

The core idea of LoRA is that the weight update during adaptation has a low "intrinsic rank." Instead of fine-tuning all parameters (ΔW), it is approximated by the product of two smaller matrices (BA). This makes fine-tuning faster and requires less memory.

LoRA has become a foundational method for efficiently adapting large models like GPT-3. It is often combined with [[concepts/model-compression.md]] techniques like quantization in methods such as QLoRA (Dettmers et al., 2023) [[sources/dettmers-et-al-qlora-2023.md]].

## Related pages
- [[concepts/training-efficiency-techniques.md]]
- [[concepts/model-compression.md]]
- [[sources/hu-et-al-lora-2021.md]]
- [[sources/dettmers-et-al-qlora-2023.md]]