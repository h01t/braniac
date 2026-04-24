# Optimal Scalar Quantization

**Summary**: TurboQuant reduces the high-dimensional quantization problem to optimal scalar quantization of a known 1D distribution after random rotation. The scalar quantizer is designed by solving a continuous k-means problem on the interval [-1,1].
**Source Context**: TurboQuant PDF.

---

After multiplying a uniformly random unit vector by a random rotation matrix, each coordinate follows the distribution:
f_X(x) = Γ(d/2) / (√π Γ((d-1)/2)) * (1 - x^2)^{(d-3)/2}, for x ∈ [-1,1] (TurboQuant PDF, Lemma 1).

In high dimensions, this distribution converges to N(0, 1/d), and coordinates become nearly independent (TurboQuant PDF, citing [55]).

The optimal scalar quantizer partitions [-1,1] into 2^b intervals (buckets) with centroids c_i. The boundaries are midpoints between consecutive centroids (Voronoi tessellation) (TurboQuant PDF, citing [42]). The cost function is the MSE:
C(f_X, b) = min_{c_1 ≤ ... ≤ c_{2^b}} (1/2^b) Σ ∫_{boundaries} |x - c_i|^2 f_X(x) dx (TurboQuant PDF, Eq. (4)).

This 1D k-means problem is solved numerically once for given d and b, and centroids are stored. For example, for high dimensions (approx normal), centroids for b=1 are ±√(2/πd); for b=2: {0, ±0.453/√d, ±1.51/√d} (TurboQuant PDF).

The optimal cost C(f_X, b) is used to bound the distortion of TurboQuant_mse and TurboQuant_prod.

For b>4, the Panter-Dite high-resolution formula approximates the cost (see [[concepts/panter-dite-formula.md]]).

## Related pages
- [[concepts/turboquant-mse.md]]
- [[concepts/panter-dite-formula.md]]
- [[concepts/turboquant-overview.md]]
- [[sources/turboquant-pdf.md]]