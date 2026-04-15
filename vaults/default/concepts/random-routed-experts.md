# Random Routed Experts (RRE)

**Summary**: A variant of the Mixture-of-Experts (MoE) architecture where tokens are randomly assigned to experts within a domain, rather than using a learnable gating network, aimed at improving stability and reducing catastrophic forgetting.
**Source Context**: Comprehensive Overview of LLMs.pdf.

---

## Definition and Mechanism
[[concepts/random-routed-experts.md]] (RRE) is a sparsely activated model architecture introduced with the PanGu-Σ model. Similar to standard [[concepts/mixture-of-experts.md]], it features multiple expert networks. The key distinction lies in the routing mechanism: at the second level of the architecture, tokens are **randomly routed** to experts within a specific domain, as opposed to using a trainable, input-dependent gating network. The model features densely activated and shared bottom layers, with sparsely activated top layers according to the domain (Source: Comprehensive Overview of LLMs.pdf).

## Purpose and Advantages
The primary motivations for RRE are:
1.  **Reducing Catastrophic Forgetting**: The random, non-learning-based routing is posited to reduce [[concepts/catastrophic-forgetting.md]] effects, which is beneficial for continual learning scenarios where the model learns new tasks sequentially.
2.  **Extracting Task-Specific Models**: The architecture allows for the extraction of smaller, domain-specific sub-models for deployment. This is cost-efficient while aiming to maintain performance similar to the full model.
3.  **Training Stability**: Avoiding a complex, learned router may simplify training dynamics (Source: Comprehensive Overview of LLMs.pdf).

## Model Implementation
The PanGu-Σ model uses RRE to scale to a trillion parameters. It copies parameters from a base model (PanGu-α) and extends them with this random routing mechanism at the top layers, enabling the benefits of a massive model at a lower computational cost per forward pass (Source: Comprehensive Overview of LLMs.pdf).

## Related pages
- [[concepts/mixture-of-experts.md]]
- [[concepts/catastrophic-forgetting.md]]
- [[entities/pangu-σ.md]]