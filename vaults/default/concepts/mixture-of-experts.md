# Mixture of Experts (MoE)

**Summary**: A neural network architecture where the model consists of many "expert" sub-networks, and a gating network dynamically routes each input token to a small subset of these experts, enabling sparsity and efficient scaling.
**Source Context**: Referenced in multiple papers including Shazeer et al. (2017), Fedus et al. (2022), and Du et al. (2022).

---

## Architecture and Function
In a MoE layer, the standard dense feed-forward network is replaced by a set of expert feed-forward networks. A trainable router (or gating network) examines each input token and selects a few experts (e.g., 2 out of 8) to process it. This creates a **sparsely activated** model: while the total number of parameters can be enormous (e.g., trillions), only a fraction are used for any given input, keeping computational cost manageable [Source: [121]].

This sparsity is the key to scaling model parameter counts far beyond what is feasible with dense transformers, as explored in models like Switch Transformers and GLAM [[sources/fedus-et-al-switch-transformers-2022.md]].

## Advantages and Applications
The primary advantage is **efficient scaling**. It allows for the creation of models with massive parameter counts without a proportional increase in compute per token. This architecture is central to several large-scale models, including [[entities/glam-model.md]], [[entities/pangu-sigma-model.md]], and modern models like Mixtral and DeepSeek-V2 [Source: [91], [92], [131], [139]].