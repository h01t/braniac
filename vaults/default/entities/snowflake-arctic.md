# Snowflake Arctic

**Summary**: A hybrid dense and mixture-of-experts (MoE) LLM with 128 experts, designed for high model capacity and diverse configurations while keeping active parameters low (17B of 480B total).
**Source Context**: Comprehensive Overview of LLMs.pdf

---

## Architecture
Snowflake Arctic employs a unique hybrid architecture:
1.  **Dense Transformer**: A standard 10-billion parameter transformer backbone.
2.  **Parallel MoE Component**: A massive mixture-of-experts (MoE) component runs in parallel to the dense transformer. This MoE consists of **128 experts**, each a 3.66B parameter MLP.
3.  **Sparse Activation**: For each token, only **2 experts** from the MoE are activated alongside the dense transformer's computation.

## Scale and Efficiency
The model has a total of **480 billion parameters**, but due to the sparse activation of the MoE, only **17 billion parameters** are active during any single forward pass. This represents a significant reduction in computation compared to a fully dense 480B parameter model, while still offering immense model capacity and the opportunity for diverse configurations by choosing among many experts.

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[concepts/hybrid-architecture.md]]
- [[concepts/sparse-activation.md]]