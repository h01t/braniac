# TurboQuant Paper

**Summary**: This paper introduces TurboQuant, a vector quantization algorithm that achieves near-optimal distortion rates for both mean-squared error (MSE) and inner product distortion, suitable for online applications such as KV cache quantization and nearest neighbor search.
**Source Context**: turboqaunt.pdf

---

TurboQuant is a lightweight, online vector quantization method that is accelerator-friendly. It uses random rotation to induce a Beta distribution on coordinates, enabling optimal scalar quantization via Lloyd-Max. For inner product distortion, it combines an MSE quantizer with a 1-bit Quantized Johnson-Lindenstrauss (QJL) transform on the residual to achieve unbiased estimates. Theoretical guarantees show near-optimal distortion, within a constant factor of the information-theoretic lower bound. Experimental results on KV cache quantization demonstrate quality neutrality at 3.5 bits per channel and marginal degradation at 2.5 bits per channel. For nearest neighbor search, TurboQuant outperforms product quantization in recall with virtually zero indexing time.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/vector-quantization.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/random-rotation.md]]
- [[concepts/beta-distribution.md]]
- [[concepts/lloyd-max-quantizer.md]]
- [[concepts/quantized-johnson-lindenstrauss-transform.md]]
- [[concepts/kv-cache-quantization.md]]
- [[concepts/product-quantization.md]]