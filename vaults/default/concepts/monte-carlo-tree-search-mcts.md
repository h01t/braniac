# Monte Carlo Tree Search (MCTS)

**Summary**: A search algorithm inspired by AlphaGo, explored to enhance test-time compute for language models by systematically exploring the solution space, but faced significant challenges in scaling for token generation.
**Source Context**: DeepSeek_R1.pdf (Section 4.2).

---

## Application to Language Models
Inspired by [[entities/alphago.md]] and [[entities/alphazero.md]], the researchers explored using [[concepts/monte-carlo-tree-search-mcts.md]] to break down answers into smaller parts, allowing the model to explore the solution space more thoroughly during inference. This involved prompting the model to generate tags for specific reasoning steps to guide the search.

## Encountered Challenges
The approach encountered several fundamental difficulties when attempting to scale up training:
1.  **Vast Search Space**: Unlike chess, the search space for token generation is exponentially larger. Imposing a maximum expansion limit per node to manage this led to the model getting stuck in local optima.
2.  **Value Model Difficulty**: The quality of the MCTS search is directly influenced by a pre-trained value model that guides each step. Training an accurate, fine-grained value model for language generation proved to be inherently very difficult, making iterative self-improvement hard to achieve.

## Conclusion on Viability
The paper concludes that while MCTS can improve performance during **inference** when paired with a good pre-trained value model, using it to **iteratively boost model performance through self-search**—a core success factor for AlphaGo—remained a significant, unresolved challenge in the context of language model training.

## Related pages
- [[concepts/reasoning-ability.md]]
- [[concepts/test-time-compute.md]]