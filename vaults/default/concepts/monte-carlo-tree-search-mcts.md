# Monte Carlo Tree Search (MCTS)

**Summary**: A heuristic search algorithm that combines tree search with random sampling, famously used in AlphaGo, explored for enhancing LLM reasoning.
**Source Context**: DeepSeek_R1.pdf

---

## Application to Language Model Reasoning
Inspired by **AlphaGo (Silver et al., 2017b)** and **AlphaZero (Silver et al., 2017a)**, the DeepSeek-R1 team explored using **Monte Carlo Tree Search (MCTS)** to enhance "test-time compute scalability" for language models. The idea was to break down answer generation into smaller parts, allowing the model to systematically explore the solution space with the guidance of a pre-trained value model that evaluates intermediate states (Source: DeepSeek_R1.pdf).

## Challenges and Unsuccessful Attempt
Despite its success in games, applying MCTS to token-based language generation presented significant, scaling challenges:

1.  **Exponentially Larger Search Space**: Unlike the well-defined board states in chess, the space of possible token sequences is astronomically large. Imposing limits on node expansion to manage this can cause the search to get stuck in local optima.
2.  **Difficulty of Training a Value Model**: The value model's quality directly guides the search. Training a reliable, fine-grained value model for language reasoning is inherently difficult, making it hard to iteratively improve the overall system through self-play, a key to AlphaGo's success.
3.  **Iterative Improvement Challenge**: The core principle of iterative self-improvement used by AlphaGo proved "difficult to replicate in our setup due to the complexities of token generation" (Source: DeepSeek_R1.pdf).

## Conclusion from the Paper
The team concluded that while MCTS could potentially improve performance **during inference** when paired with a good pre-trained value model, **iteratively boosting model performance through self-search remained a significant challenge** and was not successfully scaled in their work (Source: DeepSeek_R1.pdf).

## Related pages
- [[concepts/process-reward-model-prm.md]]
- [[concepts/reinforcement-learning-rl-for-reasoning.md]]