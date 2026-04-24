# Vector Quantization

**Summary**: Vector quantization (VQ) is the process of compressing high-dimensional vectors into low-bitwidth representations while minimizing geometric distortion, with roots in Shannon's source coding theory.
**Source Context**: turboqaunt.pdf

---

Vector quantization maps a high-dimensional vector \(x \in \mathbb{R}^d\) to a binary string of \(B\) bits, with an inverse map for approximate reconstruction. The primary goals are to minimize mean-squared error (MSE) or inner product error. VQ is critical for AI model deployment, KV cache compression, and nearest neighbor search in vector databases. Existing VQ algorithms either lack accelerator compatibility or have suboptimal distortion bounds. TurboQuant addresses these limitations.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/product-quantization.md]]
- [[concepts/kv-cache-quantization.md]]
- [[sources/turboquant-paper.md]]