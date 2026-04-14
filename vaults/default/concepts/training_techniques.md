# Training Techniques
Various techniques improve training efficiency and stability for large language models:
- **ZeRO-1**: Partitions optimizer states over data parallel ranks.
- **Flash Attention**: Improves hardware utilization.
- **Sequence Parallel**: Overlaps computation and communication, e.g., GEMM with all-gather/reduce-scatter.
- **Gradient Accumulation**: Training in bf16 precision but accumulating gradients in fp32.
- **In-place Cross-Entropy**: Reduces GPU memory consumption by converting logits on the fly.
- **Model Checkpoints**: Saved asynchronously every 5 minutes to minimize data loss.
- **Resuming Training**: Supports resuming from different 3D parallel configurations.
- **Evaluation Tools**: Uses vLLM for generative tasks and continuous batching for non-generative tasks.

Applied in training models like [[entities/deepseek_llm.md]].