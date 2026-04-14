# Scaling Laws
Scaling laws describe the predictable relationship between model size (parameters), dataset size (tokens), compute budget, and final model performance. The development of **[[entities/deepseek_llm.md]]** involved calibrating existing scaling laws and proposing a new optimal model/data scaling-up allocation strategy.

A key conclusion is that scaling behavior is related to **data quality**, which may be the root cause of varying results observed in different research works. The project also presented a method to predict near-optimal hyperparameters like batch size and learning rate for a given compute budget.

**Related Concepts:** [[concepts/compute_optimal_training.md]]