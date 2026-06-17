# Targeted RL with Textual Feedback

**Summary**: A training technique used for Composer 2.5 that provides localized hint‑based feedback at specific points in a long RL rollout to improve credit assignment, using teacher‑student distillation with KL loss.

**Source Context**: https://cursor.com/blog/composer-2-5

---

In long rollouts (hundreds of thousands of tokens), final reward is a noisy signal for *where* the model made mistakes. Targeted textual feedback constructs a short hint (e.g., “Reminder: Available tools…”) inserted into the context of the problematic turn. The teacher distribution is computed from the model with the hint; the student uses the original context. An on‑policy distillation KL loss adjusts the student’s token probabilities toward the teacher’s for that turn only.

Applied during Composer 2.5 training to coding style, tool calls, communication style, and other localized behaviors.

## Background references

- *Self‑Distillation Enables Continual Learning* (arXiv:2601.19897)
- *Reinforcement Learning via Self‑Distillation* (arXiv:2601.20802)
- *Self‑Distilled Reasoner* (arXiv:2601.18734)

## Related pages

- [[concepts/composer-2-5.md]]
- [[concepts/synthetic-data-rl.md]]
- [[entities/cursor.md]]
- [[sources/blog-post-composer-2-5.md]]