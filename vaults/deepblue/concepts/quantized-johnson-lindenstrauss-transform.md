# Quantized Johnson-Lindenstrauss Transform (QJL)

**Summary**: The Quantized Johnson-Lindenstrauss (QJL) transform is a 1-bit quantization method that provides unbiased estimates of inner products, used as the second stage of TurboQuant's inner product quantizer.
**Source Context**: turboqaunt.pdf

---

QJL is a sketching based technique that quantizes each coordinate of a vector to a single bit. It is data-oblivious and computationally efficient. In TurboQuant, after applying the MSE quantizer (using \(b-1\) bits), the residual vector is quantized with a 1-bit QJL transform. This composition yields an unbiased inner product estimator with low distortion.

## Related pages
- [[concepts/inner-product-distortion.md]]
- [[concepts/turboquant.md]]
- [[concepts/mse-distortion.md]]
- [[sources/turboquant-paper.md]]