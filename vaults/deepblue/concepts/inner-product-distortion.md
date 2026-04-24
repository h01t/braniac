# Inner Product Distortion

**Summary**: Inner product distortion measures the expected squared error between the true inner product \(\langle y, x\rangle\) and the estimated inner product from the quantized representation.
**Source Context**: turboqaunt.pdf

---

Formally:
\[
D_{\text{prod}} := \mathbb{E}_Q\left[ \left( \langle y, x\rangle - \langle y, Q^{-1}(Q(x))\rangle \right)^2 \right]
\]
TurboQuant's inner product quantizer is unbiased:
\[
\mathbb{E}_Q\left[ \langle y, Q^{-1}(Q(x))\rangle \right] = \langle y, x\rangle
\]
And achieves distortion:
\[
D_{\text{prod}} \le \sqrt{\frac{3}{\pi}} \cdot \frac{\|y\|_2^2}{d} \cdot \frac{1}{4^b}
\]
for unit-norm \(x\). This is achieved by applying an MSE quantizer (with bit-width \(b-1\)) followed by a 1-bit QJL transform on the residual.

## Related pages
- [[concepts/turboquant.md]]
- [[concepts/mse-distortion.md]]
- [[concepts/quantized-johnson-lindenstrauss-transform.md]]
- [[sources/turboquant-paper.md]]