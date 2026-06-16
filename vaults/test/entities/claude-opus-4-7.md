# Claude Opus 4.7

**Summary**: Claude Opus 4.7 is an upgraded AI model from Anthropic that improves upon Opus 4.6 with enhanced safety features, new effort control levels, higher-resolution image processing, and updates to the Claude Platform and Claude Code.
**Source Context**: https://www.anthropic.com/news/claude-opus-4-7

---

## Safety and Alignment
According to the source, Opus 4.7 has a safety profile similar to Opus 4.6, with low rates of concerning behavior such as deception, sycophancy, and cooperation with misuse. It shows improvements in honesty and resistance to malicious prompt injection attacks, but is modestly weaker in areas like providing overly detailed harm-reduction advice on controlled substances. The alignment assessment concluded it is "largely well-aligned and trustworthy, though not fully ideal in its behavior". [[concepts/safety-alignment.md]] is key here, and [[entities/claude-mythos-preview.md]] is noted as the best-aligned model in Anthropic's evaluations.

## New Features and Updates
Opus 4.7 introduces a new 'xhigh' effort level for finer control over reasoning and latency on hard problems. See [[concepts/effort-control.md]]. On the Claude Platform, task budgets are in public beta to guide token spend for longer runs. See [[concepts/task-budgets.md]]. In Claude Code, the /ultrareview slash command produces dedicated code review sessions, and auto mode is extended to Max users. See [[concepts/slash-commands.md]] and [[concepts/auto-mode.md]].

## Migration from Opus 4.6
Migrating to Opus 4.7 requires planning for token usage changes. The model uses an updated tokenizer that can increase token counts by 1.0–1.35×. See [[concepts/tokenizer-updates.md]] and [[concepts/token-usage.md]]. Users can control this via effort parameters, task budgets, or prompting for conciseness.

## Evaluations
Internal evaluations show that Opus 4.7 has improved token usage efficiency on coding tasks compared to [[entities/claude-opus-4-6.md]].

## Related pages
- [[entities/claude-opus-4-6.md]]
- [[entities/claude-mythos-preview.md]]
- [[concepts/safety-alignment.md]]
- [[concepts/effort-control.md]]