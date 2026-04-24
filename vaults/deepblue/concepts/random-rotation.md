# Random Rotation

**Summary**: Multiplying an input vector by a random orthogonal matrix (e.g., obtained via QR decomposition of a Gaussian random matrix) makes its distribution uniform on the unit hypersphere, enabling per‑coordinate independent scalar quantization.

**Source Context**: turboqaunt.pdf

---

## Role in TurboQuant

In both MSE and inner‑product TurboQuant, the input vector ![x](https://latex.codecogs.com/svg.latex?x) is first rotated by a random matrix ![\\Sigma](https://latex.codecogs.com/svg.latex?%5CSigma) drawn uniformly from the orthogonal group. This ensures that the resulting vector ![\\Sigma x](https://latex.codecogs.com/svg.latex?%5CSigma%20x) is uniformly distributed on ![S^{d-1}](https://latex.codecogs.com/svg.latex?S%5E%7Bd-1%7D).

## Why Needed

After rotation, each coordinate follows the known [[concepts/beta-distribution-hypersphere.md|Beta distribution]] (Lemma 1). In high dimensions, coordinates become approximately independent, allowing optimal scalar quantizers to be applied independently per coordinate.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/beta-distribution-hypersphere.md]]