# TurboQuant

**Summary**: TurboQuant is a vector quantization algorithm designed for online applications, achieving near-optimal distortion for both MSE and inner product measures with low computational overhead.
**Source Context**: turboqaunt.pdf

---

TurboQuant operates in two stages: first, an MSE-optimized quantizer that applies random rotation and optimal scalar quantization per coordinate; second, a 1-bit Quantized JL transform on the residual to produce an unbiased inner product quantizer. It is data-oblivious, requiring no training or calibration, and is accelerator-friendly (e.g., suitable for GPUs). The algorithm achieves near-optimal distortion rates, differing from lower bounds by only a small constant factor (≈2.7).

Key properties:
- Online (data-oblivious) application.
- Near-optimal MSE and inner product distortion.
- Unbiased inner product estimation.
- Fast encoding and decoding.

## Related pages
- [[sources/turboquant-paper.md]]
- [[concepts/vector-quantization.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/random-rotation.md]]
- [[concepts/lloyd-max-quantizer.md]]
- [[concepts/quantized-johnson-lindenstrauss-transform.md]]