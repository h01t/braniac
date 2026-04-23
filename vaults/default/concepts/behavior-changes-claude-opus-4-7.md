# Behavior Changes (Claude Opus 4.7)

**Summary**: A set of non-API-altering shifts in how Claude Opus 4.7 responds to prompts compared to previous models.
**Source Context**: https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-7

---

## List of Changes
The documentation notes the following behavioral shifts in Claude Opus 4.7 that may necessitate prompt updates:
* **More Literal Instruction Following**: The model, particularly at lower effort levels, will not silently generalize instructions or infer unstated requests (Source).
* **Calibrated Response Length**: Output length adjusts based on perceived task complexity rather than defaulting to fixed verbosity (Source).
* **Reduced Default Tool Calls**: The model uses reasoning more by default; raising the [[concepts/effort-level.md]] increases tool usage (Source).
* **More Direct Tone**: The model adopts a more opinionated, direct tone with less validation-forward phrasing and fewer emoji than Claude Opus 4.6 (Source).
* **More Progress Updates**: The model provides more regular status updates to the user during long agentic traces (Source).
* **Fewer Default Subagents**: The model spawns fewer subagents by default, though this is steerable through prompting (Source).
* **Real-Time Cybersecurity Safeguards**: Requests involving prohibited or high-risk topics may lead to refusals. Legitimate security work requires application to the Cyber Verification Program (Source).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/model-migration.md]]