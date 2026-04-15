# Safety and Red Teaming

**Summary**: Methods and studies focused on identifying and mitigating safety failures in large language models, including jailbreaking, adversarial testing, and self-correction mechanisms.
**Source Context**: Comprehensive Overview of LLMs.pdf (citations 177-180)

---

Safety and red teaming in [[concepts/large-language-models.md]] involve proactive testing to uncover harmful behaviors. Techniques range from automated adversarial attacks to structured human-in-the-loop evaluations.

**Jailbreaking and Safety Training Failures**: Research shows that safety training can fail under sophisticated adversarial prompts. Wei et al. (2023) analyze how safety training fails, leading to "jailbroken" models that produce harmful content [[sources/wei-et-al-jailbroken-2023.md]]. This connects to broader concerns about [[concepts/alignment.md]].

**Red Teaming Methodologies**: Red teaming involves systematically probing models for harmful outputs. Ganguli et al. (2022) outline methods for red teaming language models to reduce harms, studying scaling behaviors and lessons learned [[sources/ganguli-et-al-red-teaming-2022.md]]. Casper et al. (2023) propose a "explore, establish, exploit" framework for red teaming models from scratch [[sources/casper-et-al-explore-establish-exploit-2023.md]].

**Self-Correction and Moral Capacity**: Some research investigates whether LLMs can self-correct morally problematic outputs. A 2023 study examines the capacity for moral self-correction in LLMs [[sources/et-al-moral-self-correction-2023.md]].

**Automated Red Teaming with LLMs**: Language models can be used to red team other language models. Perez et al. (2022) demonstrate red teaming language models with language models, using one LLM to generate test cases for another [[sources/perez-et-al-red-teaming-with-lms-2022.md]].

## Related pages
- [[concepts/alignment.md]]
- [[concepts/adversarial-robustness.md]]
- [[sources/wei-et-al-jailbroken-2023.md]]
- [[sources/ganguli-et-al-red-teaming-2022.md]]