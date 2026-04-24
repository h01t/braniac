# Quasi Johnson-Lindenstrauss (QJL) Quantization

**Summary**: QJL is a quantization method that uses random projection followed by sign extraction to estimate inner products. TurboQuant_prod uses QJL on the residual vector to provide an unbiased inner product estimator.
**Source Context**: TurboQuant PDF, referencing [62] and Lemma 4.

---

QJL quantization maps a vector r ∈ ℝ^d to a sign vector q ∈ {-1,+1}^d via q = sign(S r), where S is a d×d matrix with i.i.d. N(0,1) entries (TurboQuant PDF, Algorithm 2). Dequantization is ~x_qjl = √(π/2)/d * ‖r‖ * S^T q (TurboQuant PDF, line 11).

**Properties** (Lemma 4, TurboQuant PDF):
- Unbiased inner product estimate: E[⟨y, ~x_qjl⟩] = ⟨y, r⟩
- Variance bound: Var(⟨y, ~x_qjl⟩) ≤ (π/2) * (‖r‖_2^2 ‖y‖_2^2)/d

These properties are used to prove unbiasedness and distortion bound for TurboQuant_prod.

In TurboQuant_prod, QJL is applied to the residual r = x - ~x_mse, where ‖r‖ is known, allowing unbiased combination.

## Related pages
- [[concepts/turboquant-prod.md]]
- [[concepts/turboquant-mse.md]]
- [[sources/turboquant-pdf.md]]