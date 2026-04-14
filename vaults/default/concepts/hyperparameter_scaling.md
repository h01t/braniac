# Hyperparameter Scaling
Hyperparameter scaling involves determining optimal batch size \( B \) and learning rate \( \eta \) based on compute budget \( C \). Empirical findings show that optimal batch size increases and optimal learning rate decreases with increasing compute budget. Fitted formulae from experiments:
- \( \eta_{opt} = 0.3118 \cdot C^{-0.1250} \)
- \( B_{opt} = 0.2920 \cdot C^{0.3271} \)
These parameters ensure near-optimal performance within a wide band range. Part of broader [[concepts/scaling_laws.md]].