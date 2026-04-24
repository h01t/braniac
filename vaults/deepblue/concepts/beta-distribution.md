# Beta Distribution

**Summary**: The Beta distribution is the distribution of each coordinate after applying a random rotation to a vector, as used in TurboQuant.
**Source Context**: turboqaunt.pdf

---

For a vector \(x \in \mathbb{R}^d\) with \(\|x\|_2 = 1\), after multiplying by a random orthogonal matrix, the coordinates follow a Beta distribution. In high dimensions, this distribution converges to a Gaussian distribution due to the central limit theorem. The optimal scalar quantizer for the Beta distribution is found by solving a continuous 1-dimensional k-means problem using the Lloyd-Max algorithm. TurboQuant precomputes and stores these optimal codebooks for various bit-widths.

## Related pages
- [[concepts/random-rotation.md]]
- [[concepts/lloyd-max-quantizer.md]]
- [[concepts/mse-distortion.md]]
- [[sources/turboquant-paper.md]]