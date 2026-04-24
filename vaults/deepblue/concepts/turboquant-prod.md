# TurboQuant Inner Product (TurboQuant_prod)

**Summary**: TurboQuant_prod provides an unbiased inner product estimator by combining TurboQuant_mse with a quasi-Johnson-Lindenstrauss (QJL) quantization on the residual vector.
**Source Context**: TurboQuant PDF, Algorithm 2 and Theorem 2.

---

TurboQuant_mse alone has a multiplicative bias for inner product estimation (e.g., factor 2/π for b=1) (TurboQuant PDF). TurboQuant_prod corrects this by using two components:

1. **TurboQuant_mse** with bit-width b-1 to quantize the vector.
2. **QJL quantization** on the residual r = x - DeQuant_mse(Quant_mse(x)). The QJL map uses a random Gaussian projection matrix S, takes sign(S r), and for dequantization scales by √(π/2)/d * S^T * sign(S r) (TurboQuant PDF, Algorithm 2 lines 7,11). The residual norm ‖r‖ is also stored.

The total bit-width is b: (b-1) from TurboQuant_mse indices, 1 bit per coordinate from QJL signs, plus the scalar norm.

**Performance Guarantee (Theorem 2)**:
- Unbiasedness: E[⟨y, ~x⟩] = ⟨y, x⟩ for any vector y (TurboQuant PDF)
- Inner product distortion (variance of estimator) bounded by:
  D_prod ≤ (√3 π / 2) * (‖y‖_2^2 / d) * (1/4^b)
- For small b:
  - b=1: D_prod ≈ 1.57 / d
  - b=2: D_prod ≈ 0.56 / d
  - b=3: D_prod ≈ 0.18 / d
  - b=4: D_prod ≈ 0.047 / d
  (TurboQuant PDF, Theorem 2)

The proof conditions on ~x_mse, uses the variance bound of QJL (Lemma 4 from paper) to bound the second moment of the inner product estimate from the residual component (TurboQuant PDF).

## Related pages
- [[concepts/turboquant-mse.md]]
- [[concepts/quasi-johnson-lindenstrauss-qjl.md]]
- [[concepts/turboquant-overview.md]]
- [[sources/turboquant-pdf.md]]