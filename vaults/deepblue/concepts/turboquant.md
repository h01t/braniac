# TurboQuant

**Summary**: TurboQuant is a family of vector quantization algorithms designed to minimize either mean‑squared error (MSE) or inner product distortion, achieving near‑optimal performance with closed‑form upper bounds.

**Source Context**: turboqaunt.pdf

---

## Overview

TurboQuant consists of two separate schemes:

### MSE‑optimal TurboQuant (`Q_mse`)
1. Apply a random rotation matrix ![\\Sigma](https://latex.codecogs.com/svg.latex?%5CSigma) to the input vector ![x](https://latex.codecogs.com/svg.latex?x) so that the result is uniformly distributed on the unit sphere.
2. Quantize each coordinate independently using an optimal scalar quantizer designed for the Beta distribution of a rotated coordinate (see [[concepts/beta-distribution-hypersphere.md]]).
3. The scalar quantizer solves a continuous k‑means problem on the interval [[-1,1]] with ![2^b](https://latex.codecogs.com/svg.latex?2%5Eb) clusters, using Voronoi tessellation.

### Inner‑product‑optimal TurboQuant (`Q_prod`)
1. Apply **MSE‑optimal TurboQuant** with bit‑width ![b-1](https://latex.codecogs.com/svg.latex?b-1) to minimize the residual L2 norm.
2. Apply a single‑bit unbiased quantizer ([[concepts/quantized-johnson-lindenstrauss.md]]) to the residual error.
This scheme is proven to be **unbiased** for inner product estimation and achieves near‑optimal distortion.

## Theoretical Guarantees
- **MSE distortion**: Within a factor of at most ![\\sqrt{3\\pi/2} \\approx 2.7](https://latex.codecogs.com/svg.latex?%5Csqrt%7B3%5Cpi/2%7D%20%5Capprox%202.7) of the information‑theoretic lower bound ([[concepts/shannon-lower-bound.md]]). For ![b=1](https://latex.codecogs.com/svg.latex?b%3D1) the factor is only ~1.45.
- **Inner product distortion**: For worst‑case vectors ![x,y](https://latex.codecogs.com/svg.latex?x%2Cy) with ![\\|x\\|=1](https://latex.codecogs.com/svg.latex?%5C%7Cx%5C%7C%3D1):  
![\\mathbb{E}[\\langle y, Q^{-1}(Q(x))\\rangle] = \\langle y, x\\rangle](https://latex.codecogs.com/svg.latex?%5Cmathbb%7BE%7D%5B%5Clangle%20y%2C%20Q%5E%7B-1%7D(Q(x))%5Crangle%5D%20%3D%20%5Clangle%20y%2C%20x%5Crangle) (unbiased)  
and variance bounded by ![\\frac{\\pi}{2d} \\|y\\|_2^2](https://latex.codecogs.com/svg.latex?%5Cfrac%7B%5Cpi%7D%7B2d%7D%20%5C%7Cy%5C%7C_2%5E2).

## Related pages
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/bias-in-mse-quantizers.md]]
- [[concepts/random-rotation.md]]
- [[concepts/beta-distribution-hypersphere.md]]
- [[concepts/shannon-lower-bound.md]]