# Fallback Credit

**Summary**: Fallback credit refunds the prompt‑cache cost when you retry a refused request on another model, preventing you from paying that cost twice.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5

---

When [[entities/claude-fable-5.md]] refuses a request and you retry using a fallback mechanism (server‑side, client‑side, or manual), the prompt‑cache cost incurred for the initial attempt is reimbursed. This applies only when you move to a different Claude model.

Fallback credit is documented in the [Fallback credit guide](https://platform.claude.com/docs/en/build-with-claude/fallback-credit). It is part of the refusal handling workflow described in [[concepts/refusals-and-fallback.md]].

## Related pages
- [[concepts/refusals-and-fallback.md]]
- [[entities/claude-fable-5.md]]