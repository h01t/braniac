# Beta Distribution of a Hypersphere Coordinate

**Summary**: For a point uniformly distributed on the unit sphere in ![d](https://latex.codecogs.com/svg.latex?d) dimensions, any single coordinate follows a scaled/shifted Beta distribution. In high dimensions it converges to a normal distribution.

**Source Context**: turboqaunt.pdf (Lemma 1)

---

## Lemma 1

If ![x \\in S^{d-1}](https://latex.codecogs.com/svg.latex?x%20%5Cin%20S%5E%7Bd-1%7D) is uniformly distributed, then for any coordinate ![j](https://latex.codecogs.com/svg.latex?j):

![f_X(x_j) = \\frac{\\Gamma(d/2)}{\\sqrt{\\pi}\\ \\Gamma((d-1)/2)} \\left(1 - x_j^2\\right)^{(d-3)/2}](https://latex.codecogs.com/svg.latex?f_X(x_j)%20%3D%20%5Cfrac%7B%5CGamma(d/2)%7D%7B%5Csqrt%7B%5Cpi%7D%5C%20%5CGamma((d-1)/2)%7D%20%5Cleft(1%20-%20x_j%5E2%5Cright)%5E%7B(d-3)/2%7D)

for ![x_j \\in [-1,1]](https://latex.codecogs.com/svg.latex?x_j%20%5Cin%20%5B-1%2C1%5D). As ![d \\to \\infty](https://latex.codecogs.com/svg.latex?d%20%5Cto%20%5Cinfty), ![f_X \\to \\mathcal{N}(0, 1/d)](https://latex.codecogs.com/svg.latex?f_X%20%5Cto%20%5Cmathcal%7BN%7D(0%2C%201/d)).

## Proof Sketch

The density is derived from the ratio of the surface area of a ![d-1](https://latex.codecogs.com/svg.latex?d-1)-dimensional sphere of radius ![\\sqrt{1-x_j^2}](https://latex.codecogs.com/svg.latex?%5Csqrt%7B1-x_j%5E2%7D) to the volume of the unit sphere, using the Pythagorean theorem.

## Application

This distribution is used to design the optimal scalar quantizer in [[concepts/turboquant.md|MSE‑optimal TurboQuant]] after [[concepts/random-rotation.md|random rotation]].

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/random-rotation.md]]