# Unsuccessful Attempts in Reasoning Model Development
Documented failures and setbacks encountered during the development of [[entities/DeepSeek-R1.md]], providing insights into challenging approaches.

## Process Reward Model (PRM)
PRM aims to guide a model toward better reasoning by providing fine-grained feedback on intermediate steps.
**Limitations Encountered:**
1.  **Defining Steps:** Challenging to explicitly define a fine-grained "step" in general reasoning tasks.
2.  **Step Correctness:** Determining if an intermediate step is correct is difficult. Automated annotation was unsatisfactory; manual annotation doesn't scale.
3.  **Reward Hacking & Complexity:** Model-based PRMs lead to reward hacking. Retraining the reward model adds resource overhead and pipeline complexity.
**Conclusion:** While useful for reranking or guided search, PRM's advantages were limited compared to the computational overhead in large-scale RL.

## Monte Carlo Tree Search (MCTS)
Inspired by AlphaGo, this approach uses tree search to explore the solution space during inference/training.
**Challenges Encountered:**
1.  **Search Space:** Token generation presents an exponentially larger search space than games like chess. Limiting node expansion can lead to local optima.
2.  **Value Model Difficulty:** Training a fine-grained value model to guide the search is inherently difficult, hindering iterative improvement.
**Conclusion:** MCTS can improve inference with a pre-trained value model, but iteratively boosting model performance via self-search remained a significant challenge.

**Sources:** [[sources/DeepSeek_R1_References.md]]