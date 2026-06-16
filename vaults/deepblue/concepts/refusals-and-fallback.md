# Refusals and Fallback

**Summary**: Claude Fable 5 includes safety classifiers that can decline requests; this page explains how to handle refusals programmatically and how to implement fallback to another model.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5

---

When [[entities/claude-fable-5.md]] declines a request, the Messages API responds with an HTTP 200 (not an error) and `stop_reason: "refusal"`. The response also indicates which classifier declined the request. See the [Refusals and fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback) guide for response shapes and handling.

**Fallback mechanisms**:

- **Server‑side**: Pass the `fallbacks` parameter to have the API automatically retry on another model (beta on Claude API and Claude Platform on AWS).
- **Client‑side**: Use SDK middleware (TypeScript, Python, Go, Java, C#) to retry from the client.
- **Manual**: Build retry logic yourself on any platform.

**Billing implications**:

- You are not billed for a request that is refused before any output.
- When retrying on another model, [[concepts/fallback-credit.md]] refunds the prompt‑cache cost so you do not pay it twice.

**Applicability**: Refusals and fallback apply only to Claude Fable 5. [[entities/claude-mythos-5.md]] does not have safety classifiers and will never refuse.

## Related pages
- [[entities/claude-fable-5.md]]
- [[entities/claude-mythos-5.md]]
- [[concepts/fallback-credit.md]]
- [[concepts/adaptive-thinking.md]]