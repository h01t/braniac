# Lower Bound on Compression Distortion

**Summary**: Lower bounds establish the best achievable distortion for any quantization algorithm. TurboQuant proves optimality up to a constant factor using Yao's minimax principle and Shannon's lower bound.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

Theorem 3 in turboqaunt.pdf provides lower bounds on both MSE and inner product distortion:

- MSE: D_mse ≥ 1/4^b
- Inner product: D_prod ≥ 1/(d·4^b)

The proof leverages [[concepts/yao-minimax-principle.md]]: the expected MSE of the optimal randomized compression algorithm for worst-case inputs equals the expected MSE of the optimal deterministic algorithm under a maximally difficult random distribution. Then, by [[concepts/shannon-lower-bound.md]] (Lemma 3), the MSE for uniformly distributed inputs on the unit sphere is lower bounded by 1/4^b.

The inner product lower bound follows from the MSE lower bound via the pigeonhole principle: since D_mse = Σ E[(e_j·x - e_j·Q⁻¹(Q(x)))²] ≥ 1/4^b, at least one coordinate j achieves E[(·)²] ≥ 1/(d·4^b).

These lower bounds match the upper bounds from Theorem 1 and Theorem 2 up to constant factors, showing TurboQuant achieves an optimal distortion rate.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/yao-minimax-principle.md]]
- [[concepts/shannon-lower-bound.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-estimation.md]]