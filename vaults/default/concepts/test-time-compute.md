# Test-Time Compute

**Summary**: The computational resources expended during a model's inference or generation phase, as opposed to during training. Methods like MCTS can increase test-time compute to improve output quality.
**Source Context**: DeepSeek_R1.pdf (Section 4.2).

---

## Exploration for Scalability
The paper explores methods to enhance "test-time compute scalability," meaning using more computation during inference to get better answers. Specifically, they investigated using [[concepts/monte-carlo-tree-search-mcts.md]] to allow the model to systematically search through possible reasoning paths. While this showed potential to improve inference performance, scaling it for iterative model *training* proved challenging.

## Related pages
- [[concepts/monte-carlo-tree-search-mcts.md]]