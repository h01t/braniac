# Gopher

**Summary**: A family of language models (from 44M to 280B parameters) used to study scaling effects, with the 280B model achieving strong performance across many benchmarks.
**Source Context**: Comprehensive Overview of LLMs.pdf

---

**Purpose & Scale**: The Gopher project involved training a series of models of increasing size to systematically study the relationship between model scale and performance. The largest model had 280 billion parameters.

**Performance**: The 280B Gopher model was evaluated extensively and was reported to outperform models like [[entities/gpt-3.md]], [[entities/jurassic-1.md]], and MT-NLG on 81% of the tasks assessed. This provided empirical evidence for the benefits of extreme scaling.

**Legacy**: Gopher's scaling data was later re-analyzed by the [[entities/chinchilla.md]] research, which argued that Gopher was under-trained relative to its size and that a more data-optimal approach (as taken by Chinchilla) could yield better performance with a smaller model.

## Related pages
- [[concepts/scaling-laws.md]]
- [[entities/chinchilla.md]]
- [[entities/gpt-3.md]]