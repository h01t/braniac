# Mean‑Squared Error (MSE) Distortion

**Summary**: MSE distortion is the expected squared L2 distance between an input vector and its reconstruction after quantization. It is a standard measure of reconstruction quality.

**Source Context**: turboqaunt.pdf (Equations (1), (2))

---

## Definition

For a quantization scheme ![Q](https://latex.codecogs.com/svg.latex?Q) with dequantizer ![Q^{-1}](https://latex.codecogs.com/svg.latex?Q%5E%7B-1%7D), the MSE distortion for input ![x](https://latex.codecogs.com/svg.latex?x) is:

![D_{\\mathrm{mse}}(Q) = \\mathbb{E}\\left[\\|x - Q^{-1}(Q(x))\\|_2^2\\right]](https://latex.codecogs.com/svg.latex?D_%7B%5Cmathrm%7Bmse%7D%7D(Q)%20%3D%20%5Cmathbb%7BE%7D%5Cleft%5B%5C%7Cx%20-%20Q%5E%7B-1%7D(Q(x))%5C%7C_2%5E2%5Cright%5D)

## Role in TurboQuant

The MSE‑optimal TurboQuant aims to minimize this distortion for worst‑case unit‑norm vectors. It achieves a distortion within a factor of ![\\sqrt{3\\pi/2}](https://latex.codecogs.com/svg.latex?%5Csqrt%7B3%5Cpi/2%7D) of the [[concepts/shannon-lower-bound.md|Shannon Lower Bound]].

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/inner-product-distortion.md]]
- [[concepts/bias-in-mse-quantizers.md]]