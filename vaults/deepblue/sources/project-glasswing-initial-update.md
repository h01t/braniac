# Project Glasswing: An initial update

**Summary**: An Anthropic blog post (May 22, 2026) announcing early results of Project Glasswing, a collaborative effort using Claude Mythos Preview to find thousands of vulnerabilities in critical software.

**Source Context**: https://www.anthropic.com/research/glasswing-initial-update

---

Anthropic launched Project Glasswing to secure the world's most critical software before increasingly capable AI models can be misused. Within one month, over 50 partners used [[entities/claude-mythos-preview.md]] to find more than ten thousand high- or critical-severity vulnerabilities across systemically important software.

Key results include: Cloudflare found 2,000 bugs (400 high/critical) with a false positive rate better than human testers. Mozilla found 271 vulnerabilities in Firefox 150. The UK AI Security Institute reported that Mythos Preview is the first model to solve both of their cyber ranges end to end. XBOW noted "absolutely unprecedented precision." Benchmarks [[concepts/ai-security-benchmarks.md]] show Mythos Preview as strongest. Partners like Palo Alto Networks saw a fivefold increase in patches; Microsoft and Oracle also reported faster patching.

The bottleneck has shifted from finding vulnerabilities to triaging, disclosing, and patching them. Mythos Preview scanned over 1,000 open-source projects, finding over 6,200 estimated high/critical vulnerabilities. Of 1,752 assessed by independent firms, 90.6% were valid true positives, and 62.4% confirmed as high/critical severity. Example: [[concepts/cve-2026-5194.md]] in wolfSSL allowed certificate forgery.

Anthropic released [[concepts/claude-security.md]] and a Cyber Verification Program to aid defenders. They also made tools available to qualifying customers. A partnership with [[entities/openssf-alpha-omega.md]] supports maintainers.

The post warns that Mythos-class models will soon be developed by others, and safeguards are not yet sufficient for public release. Project Glasswing aims to give defenders an asymmetric advantage during this interim period.

## Related pages
- [[entities/anthropic.md]]
- [[entities/project-glasswing.md]]
- [[concepts/vulnerability-discovery-ai.md]]
- [[concepts/coordinated-vulnerability-disclosure.md]]
- [[concepts/cyber-defense-tools.md]]
- [[entities/cloudflare.md]]