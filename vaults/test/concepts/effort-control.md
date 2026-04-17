# Effort Control

**Summary**: A parameter in Claude models that allows users to adjust the level of reasoning effort, balancing between performance, reliability, and response time.
**Source Context**: https://www.anthropic.com/news/claude-opus-4-7

---

## Description
Effort control in Claude models includes levels from low to max. With Opus 4.7, a new 'xhigh' effort level is introduced between 'high' and 'max', providing finer control for hard problems (Source: https://www.anthropic.com/news/claude-opus-4-7).

## Usage and Recommendations
For coding and agentic use cases with Opus 4.7, it is recommended to start with 'high' or 'xhigh' effort levels to improve reliability (Source: same). Higher effort levels increase token usage, as noted in [[concepts/token-usage.md]], but internal evaluations show favorable net effects on performance (Source: same).

## Context in Migration
When migrating from Opus 4.6 to Opus 4.7, users should tune effort levels to manage token consumption, as Opus 4.7 thinks more at higher efforts (Source: same).

## Related pages
- [[entities/claude-opus-4-7.md]]
- [[concepts/token-usage.md]]