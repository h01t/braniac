# Yao's Minimax Principle

**Summary**: A principle from game theory and computational complexity that relates the performance of randomized algorithms on worst-case inputs to deterministic algorithms on random inputs. Used to prove lower bounds for quantization.

**Source Context**: turboqaunt.pdf, Chunk 4 of 5

---

In turboqaunt.pdf (Section 3.3), Yao's minimax principle is applied to lower bound the distortion of any randomized quantization algorithm. The principle states that the expected MSE of the optimal randomized algorithm for worst-case inputs equals the expected MSE of the optimal deterministic algorithm for inputs drawn from a maximally difficult distribution. This allows the proof to focus on deterministic algorithms under a uniform distribution on the unit sphere, where Shannon's lower bound applies.

## Related pages
- [[concepts/lower-bound-compression.md]]
- [[concepts/shannon-lower-bound.md]]
- [[concepts/turboquant.md]]