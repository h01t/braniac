# AdaptiveReplanner

**Summary**: Determines corrective actions — retry sub-questions, introduce new queries, or merge results — when verification identifies gaps.
**Source Context**: gfNe1g-2603.11445v1.pdf (Section 3.3, Verification, Replanning, and Synthesis).

---

The `AdaptiveReplanner` takes the output of the [[entities/result-verifier.md]] and decides:

- If `completeness > 0.8`: Proceed to synthesis (done).
- If incomplete results exist: Add ALL to retry sub-questions (mandatory rule from prompt).
- If `completeness 0.5–0.8`: Add new sub-questions to fill gaps.
- If contradictions found: Add queries targeting different sources.
- If `iterations >= max` (default 3): Return empty lists (done).

A key feature is **result preservation**: previous results are stored and merged with retry attempts, enabling progressive refinement without losing earlier findings.

The replanner works together with the [[entities/query-planner.md]] to generate new sub-questions if needed. It is part of the [[concepts/vmao.md]] loop.

## Related pages
- [[concepts/vmao.md]]
- [[concepts/verification-driven-replanning.md]]
- [[entities/result-verifier.md]]
- [[entities/query-planner.md]]
- [[concepts/stop-conditions.md]]
- [[sources/gfNe1g-2603.11445v1.md]]