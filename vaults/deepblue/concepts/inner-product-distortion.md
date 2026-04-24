# Inner Product Distortion

**Summary**: Inner product distortion measures the expected squared error between the true inner product ![\\langle y, x \\rangle](https://latex.codecogs.com/svg.latex?%5Clangle%20y%2C%20x%20%5Crangle) and the inner product estimated from the quantized representation of ![x](https://latex.codecogs.com/svg.latex?x). It is critical for tasks like similarity search and linear inference.

**Source Context**: turboqaunt.pdf

---

## Definition

For a quantization scheme ![Q](https://latex.codecogs.com/svg.latex?Q) and arbitrary vectors ![x,y](https://latex.codecogs.com/svg.latex?x%2Cy) with ![\\|x\\|=1](https://latex.codecogs.com/svg.latex?%5C%7Cx%5C%7C%3D1):

![D_{\\mathrm{prod}}(Q) = \\mathbb{E}\\left[\\left(\\langle y, x \\rangle - \\langle y, Q^{-1}(Q(x)) \\rangle \\right)^2\\right]](https://latex.codecogs.com/svg.latex?D_%7B%5Cmathrm%7Bprod%7D%7D(Q)%20%3D%20%5Cmathbb%7BE%7D%5Cleft%5B%5Cleft(%5Clangle%20y%2C%20x%20%5Crangle%20-%20%5Clangle%20y%2C%20Q%5E%7B-1%7D(Q(x))%20%5Crangle%20%5Cright)%5E2%5Cright%5D)

## Importance

Standard MSE‑optimal quantizers are biased for inner product estimation, especially at low bit‑widths (see [[concepts/bias-in-mse-quantizers.md]]). TurboQuant's inner‑product scheme is designed to be unbiased and achieves near‑optimal distortion.

## Theoretical Guarantee (Theorem 2)

For the inner‑product‑optimal TurboQuant with bit‑width ![b](https://latex.codecogs.com/svg.latex?b):

![D_{\\mathrm{prod}}(Q_{\\mathrm{prod}}) \\leq \\frac{\\pi}{2} \\frac{\\|y\\|_2^2}{d} 4^{-b}](https://latex.codecogs.com/svg.latex?D_%7B%5Cmathrm%7Bprod%7D%7D(Q_%7B%5Cmathrm%7Bprod%7D%7D)%20%5Cleq%20%5Cfrac%7B%5Cpi%7D%7B2%7D%20%5Cfrac%7B%5C%7Cy%5C%7C_2%5E2%7D%7Bd%7D%204%5E%7B-b%7D)

For small ![b](https://latex.codecogs.com/svg.latex?b) (1,2,3,4) explicit constants are provided (e.g., for ![b=1](https://latex.codecogs.com/svg.latex?b%3D1): ![1.57/d](https://latex.codecogs.com/svg.latex?1.57/d) times ![\\|y\\|_2^2](https://latex.codecogs.com/svg.latex?%5C%7Cy%5C%7C_2%5E2)).

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/quantized-johnson-lindenstrauss.md]]
- [[concepts/bias-in-mse-quantizers.md]]