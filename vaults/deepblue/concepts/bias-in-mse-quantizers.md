# Bias in MSE‑Optimal Quantizers for Inner Product Estimation

**Summary**: MSE‑minimizing quantizers generally produce biased inner product estimates, meaning the expected reconstructed inner product does not equal the true inner product. This bias is significant at low bit‑widths and motivates the two‑stage design of TurboQuant for unbiased inner product estimation.

**Source Context**: turboqaunt.pdf

---

## Background

Quantizers optimized solely for [[concepts/mse-distortion.md|MSE]] do not preserve inner products in expectation. The source states: "MSE optimized quantizers are biased for inner product estimation and thus a different VQ scheme is needed to get an unbiased inner product quantizer."

## Solution

The inner‑product‑optimal TurboQuant avoids bias by:
1. First applying an MSE‑optimal quantizer with one less bit than the target budget.
2. Then applying the unbiased 1‑bit [[concepts/quantized-johnson-lindenstrauss.md|QJL]] quantizer to the residual.

This two‑stage approach is proven to yield unbiased inner product estimates with near‑optimal distortion.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]