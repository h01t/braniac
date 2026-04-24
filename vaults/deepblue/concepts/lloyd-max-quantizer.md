# Lloyd-Max Quantizer

**Summary**: The Lloyd-Max algorithm is used to find optimal scalar quantizers for a given distribution by solving a continuous 1-dimensional k-means problem.
**Source Context**: turboqaunt.pdf

---

TurboQuant applies the Lloyd-Max algorithm to precompute optimal codebooks for Beta-distributed coordinates. These codebooks are stored and reused during online quantization. The algorithm minimizes MSE for scalar quantization, which, given the near-independence of coordinates after random rotation, leads to near-optimal overall MSE distortion for the vector quantizer.

## Related pages
- [[concepts/beta-distribution.md]]
- [[concepts/random-rotation.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/turboquant.md]]
- [[sources/turboquant-paper.md]]