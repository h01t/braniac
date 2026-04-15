# GLAM (Generalist Language Model)

**Summary**: A family of large language models that uses a Mixture-of-Experts (MoE) architecture to scale efficiently to hundreds of billions of parameters.
**Source Context**: Du et al., "Glam: Efficient scaling of language models with mixture-of-experts" (2022).

---

## Architecture and Scale
GLAM is built on the [[concepts/mixture-of-experts.md]] architecture. It features a dense transformer core with MoE layers interspersed, allowing the total parameter count to be very large while keeping the computational cost per token relatively low because only a subset of experts are activated.

The paper presents model variants up to 1.2 trillion parameters (GLAM 1.2T). Despite this massive size, it requires less computational power per token than a dense model of equivalent quality, demonstrating the efficiency of MoE scaling [Source: [91]].

## Performance
GLAM models showed strong performance on a range of language understanding and generation benchmarks. The work provided empirical evidence that large-scale MoE models could achieve state-of-the-art results efficiently, influencing later model development [[sources/fedus-et-al-switch-transformers-2022.md]].