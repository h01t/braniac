# Inner Product Estimation

**Summary**: Inner product estimation is a fundamental task in vector quantization, where the goal is to approximate ⟨y, x⟩ from quantized representations. TurboQuant provides an unbiased estimator for inner products via its prod variant.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

Inner product estimation distortion is defined as D_prod = E[|⟨y, x⟩ - ⟨y, Q⁻¹(Q(x))|²]. The TurboQuant algorithm bounds this distortion using the law of total expectation and the variance bound of the QJL estimator. Specifically, the distortion is bounded by (γ²/d) · ‖y‖₂² · D_mse, where D_mse is the MSE distortion (see [[concepts/mse-distortion.md]]).

TurboQuant_prod is shown to be unbiased for inner product estimation: E[⟨y, Q⁻¹(Q(x))⟩] = ⟨y, x⟩ (source: turboqaunt.pdf, Lemma 4 and Algorithm 2). Experimental results (Figure 1 in turboqaunt.pdf) confirm that TurboQuant_prod remains unbiased across all bit widths, while TurboQuant_mse introduces bias that depends on the average inner product.

A lower bound for inner product estimation distortion is given in Theorem 3: there exists a y such that D_prod ≥ 1/(d·4^b). This is proven using the pigeonhole principle on the MSE lower bound.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/lower-bound-compression.md]]