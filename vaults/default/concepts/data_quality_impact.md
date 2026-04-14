# Data Quality Impact on Scaling Laws
Data quality significantly influences optimal model/data scaling-up allocation. Higher quality data increases the model scaling exponent \( a \), meaning more compute budget should be allocated to model scaling. Observations from datasets ([[entities/datasets.md]]):
- Early in-house data: \( a = 0.450 \)
- Current in-house data: \( a = 0.524 \)
- OpenWebText2: \( a = 0.578 \)
This suggests high-quality data drives training of larger models. Related to [[concepts/scaling_laws.md]].