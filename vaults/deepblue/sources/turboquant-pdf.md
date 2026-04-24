# TurboQuant PDF

**Summary**: A research paper presenting TurboQuant, a family of vector quantization algorithms optimized for minimizing mean-squared error (MSE) and inner product distortion, with theoretical lower bounds and practical applications in KV cache compression and near neighbor search.

**Source Context**: turboqaunt.pdf

---

## Content Overview

The document introduces two vector quantization (VQ) schemes:
- **MSE-optimal TurboQuant** – minimizes reconstruction MSE via random rotation and optimal scalar quantization per coordinate.
- **Inner-product‑optimal TurboQuant** – a two‑stage algorithm combining MSE quantization with a 1‑bit unbiased quantizer (QJL) on the residual, achieving unbiased inner product estimation.

Key results include:
- Distortion upper bounds for both schemes (Theorem 2 for inner product, Theorem 3 for lower bounds).
- Use of Shannon Lower Bound (SLB) to derive information‑theoretic lower bounds for any quantizer.
- Experimental validation on needle‑in‑a‑haystack tasks and near neighbor search.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/shannon-lower-bound.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/bias-in-mse-quantizers.md]]
- [[concepts/random-rotation.md]]
- [[concepts/beta-distribution-hypersphere.md]]