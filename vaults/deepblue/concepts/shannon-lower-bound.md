# Shannon Lower Bound (SLB)

**Summary**: The Shannon Lower Bound provides a universal lower bound on the achievable MSE distortion for any lossy compression scheme, given a total bit budget. It is derived from Shannon's rate‑distortion theory.

**Source Context**: turboqaunt.pdf (Lemma 2, Lemma 3)

---

## General Form (Lemma 2)

For a random vector ![x \\in \\mathbb{R}^d](https://latex.codecogs.com/svg.latex?x%20%5Cin%20%5Cmathbb%7BR%7D%5Ed) with density ![p_X](https://latex.codecogs.com/svg.latex?p_X) and finite differential entropy ![h(x)](https://latex.codecogs.com/svg.latex?h(x)), for any total bit complexity ![B \\geq 0](https://latex.codecogs.com/svg.latex?B%20%5Cgeq%200):

![D(p_X, B) \\geq \\frac{d}{2\\pi e} 2^{(2/d)(h(x) - B)}](https://latex.codecogs.com/svg.latex?D(p_X%2C%20B)%20%5Cgeq%20%5Cfrac%7Bd%7D%7B2%5Cpi%20e%7D%202%5E%7B(2/d)(h(x)%20-%20B)%7D)

where the infimum is over all joint distributions with mutual information ![I(x;y) \\leq B](https://latex.codecogs.com/svg.latex?I(x%3By)%20%5Cleq%20B) and ![y](https://latex.codecogs.com/svg.latex?y) is the reconstruction.

## Application to Uniform Hypersphere (Lemma 3)

If ![x](https://latex.codecogs.com/svg.latex?x) is uniformly distributed on the unit sphere ![S^{d-1}](https://latex.codecogs.com/svg.latex?S%5E%7Bd-1%7D), then for any ![B \\geq 0](https://latex.codecogs.com/svg.latex?B%20%5Cgeq%200):

![D(B) \\geq 2^{-2B/d}](https://latex.codecogs.com/svg.latex?D(B)%20%5Cgeq%202%5E%7B-2B/d%7D)

This is obtained by substituting the area ![A_d](https://latex.codecogs.com/svg.latex?A_d) of the hypersphere into the SLB and using Stirling's approximation.

## Use in TurboQuant

The SLB is used to prove lower bounds (Theorem 3) for both MSE and inner product distortion. TurboQuant's MSE distortion is shown to be within a constant factor (at most ~2.7) of this bound.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/mse-distortion.md]]