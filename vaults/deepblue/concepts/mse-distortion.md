# MSE Distortion

**Summary**: Mean-squared error (MSE) distortion measures the expected squared Euclidean distance between an original vector and its quantized reconstruction.
**Source Context**: turboqaunt.pdf

---

Formally, for a quantization map \(Q\) and dequantization map \(Q^{-1}\), the MSE distortion is defined as:
\[
D_{\text{mse}} := \mathbb{E}_Q\left[ \| x - Q^{-1}(Q(x)) \|_2^2 \right]
\]
TurboQuant's MSE-optimized quantizer achieves a distortion bound:
\[
D_{\text{mse}} \le \sqrt{\frac{3}{\pi}} \cdot \frac{1}{4^b} \quad \text{for } b \ge 0
\]
for unit-norm vectors, where \(b\) is the bit-width per coordinate. The algorithm uses random rotation and optimal scalar quantization via the Lloyd-Max algorithm on Beta-distributed coordinates.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/random-rotation.md]]
- [[concepts/beta-distribution.md]]
- [[concepts/lloyd-max-quantizer.md]]
- [[concepts/inner-product-distortion.md]]
- [[sources/turboquant-paper.md]]