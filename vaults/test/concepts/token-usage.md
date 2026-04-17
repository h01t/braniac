# Token Usage

**Summary**: The consumption of tokens by AI models during processing, influenced by factors like effort levels, tokenizer changes, and task complexity.
**Source Context**: https://www.anthropic.com/news/claude-opus-4-7

---

## Factors Affecting Token Usage in Opus 4.7
In Opus 4.7, token usage is impacted by the updated tokenizer (increasing token counts by 1.0–1.35×) and increased reasoning at higher effort levels, particularly in agentic settings (Source: https://www.anthropic.com/news/claude-opus-4-7).

## Control and Management
Users can control token usage through the effort parameter, task budgets, or by prompting the model to be more concise (Source: same). Internal evaluations show that net token usage across all effort levels is improved on coding tasks, but real traffic measurements are recommended (Source: same).

## Related Concepts
This is closely tied to [[concepts/effort-control.md]], [[concepts/task-budgets.md]], and [[concepts/tokenizer-updates.md]].

## Related pages
- [[concepts/effort-control.md]]
- [[concepts/task-budgets.md]]
- [[concepts/tokenizer-updates.md]]