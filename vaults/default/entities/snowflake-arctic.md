# Snowflake Arctic

**Summary**: A hybrid large language model combining a dense transformer with a large, parallel mixture-of-experts (MoE) component, featuring 480B total parameters but only 17B active during inference for computational efficiency.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Hybrid Architecture
Snowflake Arctic employs a unique **hybrid dense and MoE** design:
*   **Dense Transformer**: A standard 10-billion parameter transformer block.
*   **MoE Component**: A massive parallel mixture-of-experts layer containing **128 experts**, each a 3.66B parameter MLP.
During a forward pass, only **two experts are activated** per token from the MoE component, and their outputs are combined with the dense transformer's processing (Source: Comprehensive Overview of LLMs.pdf).

## Scale and Efficiency
The model has a massive **480 billion total parameters**, primarily residing in the MoE experts. However, due to the sparse activation (only 2 experts), **only about 17 billion parameters are active** during any given forward pass. This represents a significant reduction in computation compared to using a full dense 480B model, while still offering very high model capacity (Source: Comprehensive Overview of LLMs.pdf).

## Design Rationale
The large number of experts (128) is intended to increase model capacity and provide a diverse configuration of specialized sub-networks for the router to choose from, potentially leading to better performance.

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[concepts/hybrid-model-architecture.md]]