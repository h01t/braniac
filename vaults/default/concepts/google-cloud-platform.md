# Google Cloud Platform

**Summary**: Google Cloud Platform is a comprehensive suite of cloud computing services offering IaaS, PaaS, and SaaS, known for its data analytics, AI infrastructure, and global network of data centers.
**Source Context**: https://grokipedia.com/page/Google

---

## History and Services
Google Cloud Platform (GCP) launched with an App Engine preview on April 7, 2008. It has expanded to offer infrastructure-as-a-service (IaaS), platform-as-a-service (PaaS), and software-as-a-service (SaaS) (Source ref: 76). Key services include BigQuery for serverless data analytics (introduced 2010) and Compute Engine for virtual machines (general availability 2014). As of early 2026, GCP encompasses over 100 services for scalable computing, data processing, and AI deployment (Source refs: 77, 78).

## Container and Hybrid Cloud
A core component is Google Kubernetes Engine (GKE), a managed service derived from Google's internal Kubernetes project for container orchestration (Source ref: 79). [[concepts/anthos.md]], introduced in 2019, extends GKE to hybrid and multi-cloud environments (across GCP, AWS, Azure, and on-premises), enabling modernization of legacy workloads (Source ref: 80).

## Global Infrastructure
GCP's reliability is underpinned by Google's global data center network. As of early 2026, it spans 40 regions in 26 countries, including a new Bangkok region launched in January 2026. Key North American sites are in Council Bluffs, Iowa; The Dalles, Oregon; and Central Ohio (Source refs: 81, 82). These facilities use custom [[concepts/tensor-processing-unit.md]] for AI acceleration and feature sustainable cooling solutions (Source refs: 83, 84).

## Market Position and Performance
In Q3 2025, Google Cloud generated $15.2 billion in revenue, a 34% year-over-year increase, with an operating income of $3.6 billion (Source ref: 49). GCP holds about 13% of the cloud market, behind AWS (~30%) and Azure (~20%), but its growth is fueled by strengths in data analytics and AI infrastructure (Source ref: 85). Enterprises often favor GCP for cost-efficient big data processing via BigQuery, which handles petabyte-scale queries without indexing (Source ref: 86).

## Related pages
- [[concepts/anthos.md]]
- [[concepts/bigquery.md]]
- [[concepts/google-kubernetes-engine.md]]
- [[concepts/hybrid-cloud.md]]