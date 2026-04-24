# TurboQuant MSE (TurboQuant_mse)

**Summary**: TurboQuant_mse is the MSE-optimal variant of TurboQuant. It minimizes the expected squared L2 distortion between original and reconstructed vector.
**Source Context**: TurboQuant PDF, Algorithm 1 and Theorem 1.

---

The quantizer `Quant_mse(x)` computes y =  x, then for each coordinate j finds the index of the nearest centroid from a precomputed codebook (size 2^b) (TurboQuant PDF, Algorithm 1). The dequantizer `DeQuant_mse(idx)` retrieves centroids and rotates back.

**Codebook Construction**: Centroids are computed by solving the continuous k-means problem on the distribution f_X(x) = Γ(d/2)/(√π Γ((d-1)/2)) (1 - x^2)^{(d-3)/2} on [-1,1]. The optimal boundaries are midpoints between consecutive centroids (Voronoi tessellation) (TurboQuant PDF, Eq. (4) and Lemma 1).

**Performance Guarantee (Theorem 1)**:
- For any bit-width b ≥ 1, MSE (expected squared L2 distortion) is bounded by:
  D_mse ≤ (√3 π / 2) * (1/4^b)   (TurboQuant PDF)
- For small b, more precise values:
  - b=1: D_mse ≈ 0.36
  - b=2: D_mse ≈ 0.117
  - b=3: D_mse ≈ 0.03
  - b=4: D_mse ≈ 0.009
  (TurboQuant PDF, Theorem 1)

The proof shows D_mse = d * C(f_X, b), where C(f_X, b) is the optimal scalar quantizer cost. For b>4, the Panter-Dite high-resolution formula gives the bound (TurboQuant PDF, using [[concepts/panter-dite-formula.md]]).

**Entropy Encoding**: Optional entropy coding can reduce average bit-width by about 5% for b=4, but not implemented to maintain simplicity (TurboQuant PDF).

## Related pages
- [[concepts/turboquant-overview.md]]
- [[concepts/scalar-quantization-optimal.md]]
- [[concepts/panter-dite-formula.md]]
- [[sources/turboquant-pdf.md]]