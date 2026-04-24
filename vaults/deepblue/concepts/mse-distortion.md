# MSE Distortion

**Summary**: Mean squared error (MSE) distortion measures the squared L2 distance between an original vector x and its quantized reconstruction Q⁻¹(Q(x)). TurboQuant provides upper and lower bounds on MSE distortion.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

MSE distortion is defined as D_mse = E[‖x - Q⁻¹(Q(x))‖₂²]. Theorem 1 (referenced from earlier parts of turboqaunt.pdf) provides upper bounds for TurboQuant's MSE distortion. In the lower bound section, Theorem 3 proves that for any quantization algorithm, there exists a worst-case input x on the unit sphere such that D_mse ≥ 1/4^b (source: turboqaunt.pdf, Section 3.3).

The proof of Theorem 3 uses [[concepts/yao-minimax-principle.md]] to relate randomized algorithm lower bounds to deterministic algorithm lower bounds under a maximally difficult distribution, then invokes [[concepts/shannon-lower-bound.md]] (Lemma 3) to bound the achievable MSE for uniformly distributed inputs on the unit sphere.

In experiments (turboqaunt.pdf, Section 4.1), the MSE error of TurboQuant is compared against theoretical bounds, showing alignment across different bit ratios (Figure 3).

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/inner-product-estimation.md]]
- [[concepts/lower-bound-compression.md]]
- [[concepts/shannon-lower-bound.md]]