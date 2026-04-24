# Random Rotation

**Summary**: Random rotation is a preprocessing step used in TurboQuant to induce a Beta distribution on each coordinate of the input vector, enabling optimal scalar quantization.
**Source Context**: turboqaunt.pdf

---

After applying a random rotation to a high-dimensional vector, each coordinate follows a Beta distribution. In high dimensions, this distribution approaches a Gaussian \(N(1, 1/d)\), and distinct coordinates become nearly independent. This near-independence allows TurboQuant to quantize each coordinate separately using scalar quantizers without considering inter-coordinate dependencies, yet still achieve near-optimal distortion.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/beta-distribution.md]]
- [[concepts/lloyd-max-quantizer.md]]
- [[sources/turboquant-paper.md]]