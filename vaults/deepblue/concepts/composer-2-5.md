# Composer 2.5

**Summary**: Composer 2.5 is the latest AI coding model from Cursor, built on Moonshot Kimi K2.5 and trained with improved RL techniques including targeted textual feedback, synthetic data scaling, and Sharded Muon optimization.

**Source Context**: https://cursor.com/blog/composer-2-5

---

Composer 2.5 excels at sustained long‑running tasks, complex instruction following, and collaborative interaction. It was trained using 25× more synthetic tasks than its predecessor ([[concepts/synthetic-data-rl.md]]), and introduces [[concepts/targeted-rl-textual-feedback.md]] to localize credit assignment during RL rollouts.

The model uses [[concepts/sharded-muon-optimizer.md]] with distributed orthogonalization and [[concepts/dual-mesh-hsdp.md]] for efficient MoE training.

## Pricing

- Standard: $0.50/M input, $2.50/M output tokens.
- Fast variant (same intelligence, default): $3.00/M input, $15.00/M output.
- Double usage for first week.

## Future training

Cursor and SpaceXAI are training a larger model from scratch with 10× more compute on Colossus 2’s million H100‑equivalents.

## Related pages

- [[entities/cursor.md]]
- [[entities/moonshot.md]]
- [[entities/spacexai.md]]
- [[concepts/targeted-rl-textual-feedback.md]]
- [[concepts/synthetic-data-rl.md]]
- [[concepts/sharded-muon-optimizer.md]]
- [[concepts/dual-mesh-hsdp.md]]
- [[sources/blog-post-composer-2-5.md]]