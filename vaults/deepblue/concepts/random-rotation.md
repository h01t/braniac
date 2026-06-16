# Random Rotation

**Summary**: Multiplying a vector by a random orthogonal matrix transforms its coordinates into a known distribution, enabling independent per‑coordinate scalar quantization.

**Source Context**: turboquant.pdf

---

In TurboQuant, a vector uniformly distributed on the unit sphere is multiplied by a random rotation matrix. After rotation, each coordinate follows a Beta distribution (converging to Gaussian in high dimensions), and coordinates become nearly independent. This allows the use of optimal scalar quantizers per coordinate, with codebooks pre‑computed via the Lloyd–Max algorithm.

## Related pages
- [[concepts/scalar-quantization-optimal.md]]
- [[concepts/beta-distribution.md]]
- [[concepts/turboquant-overview.md]]
- [[sources/turboquant-pdf.md]]