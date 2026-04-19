# Pipeline Parallelism (PP)

**Summary**: A model parallelism technique that partitions a neural network's layers across multiple GPUs or devices, processing micro-batches in a pipelined fashion to improve training throughput for large models.
**Source Context**: 2602.02276v1.pdf

---

## Overview
Pipeline Parallelism (PP) is a distributed training strategy used to scale models that are too large to fit on a single accelerator (GPU). It splits the model's sequential layers (e.g., transformer blocks) across multiple devices. Each device holds a subset of the model's layers, forming a "pipeline."

## How It Works
During training, the global batch is split into smaller micro-batches. These micro-batches are fed into the pipeline sequentially. While one micro-batch is being processed by the later stages of the pipeline, the earlier stages can begin processing the next micro-batch, overlapping computation and increasing hardware utilization.

## Challenges
A key challenge is "pipeline bubbles" — idle time created as the pipeline fills and drains. More critically for multimodal models, PP can suffer from **load imbalance** if one pipeline stage (e.g., the first stage containing a vision encoder) has highly variable computational load per sample, as described in the context of the [[concepts/decoupled-encoder-process.md]].

## Related pages
- [[concepts/decoupled-encoder-process.md]]
- [[concepts/training-infrastructure.md]]