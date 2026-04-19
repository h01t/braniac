# NVIDIA H800 GPU

**Summary**: A GPU cluster used for training the Kimi K2.5 model, featuring high-speed interconnects and supporting advanced parallelism strategies.
**Source Context**: Kimi K2.5 Technical Report (2602.02276v1.pdf)

---

The Kimi K2.5 model is trained on NVIDIA H800 GPU clusters with 8×400 Gbps RoCE (RDMA over Converged Ethernet) interconnects across nodes. The training employs a flexible parallelism strategy combining 16-way Pipeline Parallelism (PP) with virtual stages, 16-way Expert Parallelism (EP), and ZeRO-1 Data Parallelism. This configuration allows training on any number of nodes that is a multiple of 32.

To manage memory constraints, selective recomputation is applied for certain layers, activations are compressed to FP8-E4M3, and remaining activations are offloaded to CPU with overlapped streaming. This infrastructure supports the large-scale training required for [[entities/kimi-k2-5-model.md]].

## Related pages
- [[entities/kimi-k2-5-model.md]]