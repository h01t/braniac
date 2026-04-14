# Scaling Laws
Scaling laws suggest that model performance can be predictably improved with increases in compute budget \( C \), model scale \( N \), and data scale \( D \). The compute budget is approximated as \( C = 6 N D \), but a more precise representation uses non-embedding FLOPs/token \( M \), where \( C = M D \). Key aspects include optimal allocation between model and data scales, hyperparameter scaling, and the impact of data quality. Findings show that higher data quality favors allocating more compute budget to model scaling.

Related concepts: [[concepts/hyperparameter_scaling.md]], [[concepts/isoflop_profile.md]], [[concepts/data_quality_impact.md]].

Sources: Based on research from Henighan et al., 2020; Hoffmann et al., 2022; Kaplan et al., 2020.