# ResultVerifier

**Summary**: An LLM-based component that evaluates the completeness of each sub-question result, producing a score, status, and recommendation.
**Source Context**: gfNe1g-2603.11445v1.pdf (Section 3.3, Verification, Replanning, and Synthesis).

---

The `ResultVerifier` uses a separate, more capable model (Claude Opus 4.5) than the execution model to reduce self-evaluation bias. For each sub-question result, it outputs:
- `status`: `complete`, `partial`, or `incomplete`
- `completeness_score`: 0–1
- `missing_aspects`: list of aspects not covered
- `contradictions`: conflicts between sources
- `recommendation`: `accept`, `retry`, or `escalate`

Verification criteria include completeness, evidence quality, metadata (source attribution), specificity, and contradictions. Results already marked `complete` are reused to avoid redundant LLM calls.

The verifier's output is passed to the [[entities/adaptive-replanner.md]] for deciding next actions. This component is central to the [[concepts/verification-driven-replanning.md]] loop.

## Related pages
- [[concepts/vmao.md]]
- [[concepts/verification-driven-replanning.md]]
- [[entities/adaptive-replanner.md]]
- [[entities/dag-executor.md]]
- [[sources/gfNe1g-2603.11445v1.md]]