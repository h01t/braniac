# Quantized Johnson-Lindenstrauss (QJL)

**Summary**: QJL is a 1‑bit unbiased inner product quantizer that maps a vector to a binary vector via random Gaussian projections, providing an unbiased estimate of inner products with low variance.

**Source Context**: turboqaunt.pdf (Definition 1, Lemma 4)

---

## Definition

For any ![x \\in \\mathbb{R}^d](https://latex.codecogs.com/svg.latex?x%20%5Cin%20%5Cmathbb%7BR%7D%5Ed):

- **Encoding**: ![Q_{qjl}(x) = \\mathrm{sign}(S x)](https://latex.codecogs.com/svg.latex?Q_%7Bqjl%7D(x)%20%3D%20%5Cmathrm%7Bsign%7D(S%20x)) where ![S \\in \\mathbb{R}^{d \\times d}](https://latex.codecogs.com/svg.latex?S%20%5Cin%20%5Cmathbb%7BR%7D%5E%7Bd%20%5Ctimes%20d%7D) has i.i.d. ![\\mathcal{N}(0,1)](https://latex.codecogs.com/svg.latex?%5Cmathcal%7BN%7D(0%2C1)) entries. The output is in ![\\{-1,+1\\}^d](https://latex.codecogs.com/svg.latex?%5C%7B-1%2C%2B1%5C%7D%5Ed).
- **Decoding**: ![Q_{qjl}^{-1}(z) = \\frac{\\sqrt{\\pi/2}}{d} S^\\top z](https://latex.codecogs.com/svg.latex?Q_%7Bqjl%7D%5E%7B-1%7D(z)%20%3D%20%5Cfrac%7B%5Csqrt%7B%5Cpi/2%7D%7D%7Bd%7D%20S%5E%5Ctop%20z).

## Properties (Lemma 4)

For any ![x \\in S^{d-1}](https://latex.codecogs.com/svg.latex?x%20%5Cin%20S%5E%7Bd-1%7D) and ![y \\in \\mathbb{R}^d](https://latex.codecogs.com/svg.latex?y%20%5Cin%20%5Cmathbb%7BR%7D%5Ed):

- **Unbiased**: ![\\mathbb{E}[\\langle y, Q_{qjl}^{-1}(Q_{qjl}(x))\\rangle] = \\langle y, x\\rangle](https://latex.codecogs.com/svg.latex?%5Cmathbb%7BE%7D%5B%5Clangle%20y%2C%20Q_%7Bqjl%7D%5E%7B-1%7D(Q_%7Bqjl%7D(x))%5Crangle%5D%20%3D%20%5Clangle%20y%2C%20x%5Crangle).
- **Variance bound**: ![\\mathrm{Var}\\left(\\langle y, Q_{qjl}^{-1}(Q_{qjl}(x))\\rangle\\right) \\leq \\frac{\\pi}{2d} \\|y\\|_2^2](https://latex.codecogs.com/svg.latex?%5Cmathrm%7BVar%7D%5Cleft(%5Clangle%20y%2C%20Q_%7Bqjl%7D%5E%7B-1%7D(Q_%7Bqjl%7D(x))%5Crangle%5Cright)%20%5Cleq%20%5Cfrac%7B%5Cpi%7D%7B2d%7D%20%5C%7Cy%5C%7C_2%5E2).

The proof uses the i.i.d. Gaussian rows of ![S](https://latex.codecogs.com/svg.latex?S) and the fact that ![\\mathbb{E}[ (s_i^\\top y)^2 ] = \\|y\\|_2^2](https://latex.codecogs.com/svg.latex?%5Cmathbb%7BE%7D%5B%20(s_i%5E%5Ctop%20y)%5E2%20%5D%20%3D%20%5C%7Cy%5C%7C_2%5E2).

## Role in TurboQuant

QJL is used as the second stage of [[concepts/turboquant.md|inner-product-optimal TurboQuant]] to achieve unbiased inner product estimation on the residual after MSE quantization. It is optimal for 1‑bit inner product quantization.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/bias-in-mse-quantizers.md]]