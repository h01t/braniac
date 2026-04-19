# MoonViT-3D

**Summary**: MoonViT-3D is a vision encoder used in Kimi K2.5 for video understanding, providing context-compression and dense temporal understanding capabilities.
**Source Context**: 2602.02276v1.pdf (Kimi K2.5 Technical Report).

---

## Function and Role
MoonViT-3D is the specialized vision encoder component within the [[entities/kimi-k2-5.md]] architecture. It is designed to process and understand video data, which is inherently more complex than static images due to the temporal dimension.

## Key Capabilities
*   **Context-Compression**: Efficiently condenses long video sequences into a manageable representation, enabling the model to handle videos with over 2,000 frames.
*   **Dense Temporal Understanding**: Excels at capturing fine-grained motion and changes across frames, which is critical for action recognition and dynamic scene comprehension.

## Impact on Performance
The integration of MoonViT-3D is a key factor in [[entities/kimi-k2-5.md]]'s state-of-the-art performance on long and complex video understanding benchmarks such as LongVideoBench (79.8%) and LVBench (75.9%), as noted in the [[concepts/evaluation-benchmarks.md]].

## Related pages
- [[entities/kimi-k2-5.md]]
- [[concepts/evaluation-benchmarks.md]]