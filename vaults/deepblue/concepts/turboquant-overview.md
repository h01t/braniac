# TurboQuant Overview

**Summary**: TurboQuant is a quantization framework for high-dimensional unit vectors. It uses a random rotation followed by optimal scalar quantization per coordinate, with variants for MSE and unbiased inner product estimation.
**Source Context**: TurboQuant PDF.

---

TurboQuant targets vectors uniformly distributed on the unit sphere S^{d-1}. The approach relies on the fact that after a random rotation, each coordinate follows a known distribution (Beta, converging to normal in high dimensions) and coordinates become nearly independent (TurboQuant PDF). This allows applying optimal scalar quantizers independently to each coordinate.

The quantizer consists of two procedures:
- `Quant(x)`: multiplies x by random rotation matrix , then for each coordinate finds the nearest centroid from a codebook of size 2^b.
- `DeQuant(idx)`: retrieves centroids from indices, then multiplies by ^T to rotate back.

The codebook is precomputed by solving a 1D k-means problem on the coordinate distribution (see [[concepts/scalar-quantization-optimal.md]]). The centroid locations depend on dimension d and bit-width b.

The framework has two variants:
- [[concepts/turboquant-mse.md]] (TurboQuant_mse): optimized for MSE
- [[concepts/turboquant-prod.md]] (TurboQuant_prod): optimized for unbiased inner products

Additionally, entropy coding can be applied to indices to reduce bit-width by about 5% for b=4, but the authors chose not to include it for simplicity (TurboQuant PDF).

## Related pages
- [[concepts/scalar-quantization-optimal.md]]
- [[concepts/turboquant-mse.md]]
- [[concepts/turboquant-prod.md]]
- [[sources/turboquant-pdf.md]]