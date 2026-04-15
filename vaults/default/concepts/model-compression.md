# Model Compression for LLMs

**Summary**: A suite of techniques aimed at reducing the computational and memory footprint of large language models for efficient deployment.
**Source Context**: Comprehensive Overview of LLams.pdf (References)

---

## Need for Compression
Large language models often have hundreds of billions of parameters, making them expensive to run in production. Model compression techniques are essential for practical deployment on consumer hardware or in latency-sensitive applications.

## Key Techniques
The reference list points to several active research areas in LLM compression:
*   **Pruning**: Removing less important weights or structures from a model (e.g., LLM-Pruner by Ma et al., 2023; contrastive pruning by Xu et al., 2022).
*   **Quantization**: Reducing the numerical precision of model weights (e.g., from 32-bit to 8-bit or 4-bit). Key works include SmoothQuant (Xiao et al., 2023) and quantization for generative models (Tao et al., 2022).
*   **Efficient Fine-Tuning**: While not compression per se, techniques like **adapters** (He et al., 2021; Hu et al., 2023), **prompt tuning** (Lester et al., 2021), and **prefix-tuning** (Li & Liang, 2021) allow adaptation of huge models by training only a small number of extra parameters, greatly reducing the cost of specialization.

These techniques are critical for overcoming the barriers posed by massive model size [[concepts/scaling-laws.md]] and enabling wider use.

## Related pages
- [[concepts/scaling-laws.md]]
- [[concepts/fine-tuning.md]]