# Panter-Dite Formula

**Summary**: The Panter-Dite formula gives an upper bound on the distortion of a high-resolution scalar quantizer for a given probability density. It is used by TurboQuant to bound the MSE for bit-widths greater than 4.
**Source Context**: TurboQuant PDF, referencing [44].

---

For a fixed-rate scalar quantizer with bit-width b (i.e., 2^b levels), the mean squared error (MSE) for a distribution f_X is bounded by:
C(f_X, b) ≤ (1/12) * (∫ f_X(x)^{1/3} dx)^3 * (1/4^b)   (TurboQuant PDF)

TurboQuant applies this to f_X(x) = (Γ(d/2)/(√π Γ((d-1)/2))) (1-x^2)^{(d-3)/2} and obtains:
C(f_X, b) ≤ (√3 π / 2d) * (1/4^b)   (TurboQuant PDF)

This bound is used in Theorem 1 to extend the MSE guarantee to all b≥1 after solving numerically for small b.

## Related pages
- [[concepts/scalar-quantization-optimal.md]]
- [[concepts/turboquant-mse.md]]
- [[sources/turboquant-pdf.md]]