# Pangu-Σ (Pangu-Sigma)

**Summary**: A proposed trillion-parameter language model that employs a sparse Mixture-of-Experts (MoE) architecture and is designed for heterogeneous computing systems.
**Source Context**: Ren et al., arXiv:2303.10845 (2023).

---

## Design and Objectives
Pangu-Σ aims to scale language models to the trillion-parameter level. Its design centers on a sparse [[concepts/mixture-of-experts.md]] architecture to manage the computational cost. A key focus of the paper is tackling the systems challenges of training such a massive model on **heterogeneous computing** hardware, which may involve a mix of GPUs, NPUs, and other accelerators [Source: [92]].

The authors discuss strategies for efficient parallel training, memory optimization, and workload balancing across different types of processors. This systems perspective is a major contribution, addressing the practical hurdles of extreme-scale model training.

## Relation to Other Models
It represents a continuation of scaling efforts seen in models like [[entities/glam-model.md]] and [[sources/fedus-et-al-switch-transformers-2022.md]], with a specific emphasis on the engineering required for real-world, heterogeneous data centers.