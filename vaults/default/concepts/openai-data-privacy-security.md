# OpenAI Data Privacy and Security

**Summary**: OpenAI implements differentiated data policies for consumer and business users, with encryption, compliance certifications, and options for data residency and retention. It handles customer data for model training based on product type and user consent.
**Source Context**: https://grokipedia.com/page/OpenAI

---

## Data Usage Policies

OpenAI's policy on using customer data to train models differs between consumer and business products [[concepts/data-usage-policy.md]].

For business products like the API, ChatGPT Enterprise, Business, Edu, and Healthcare, data (inputs and outputs) is **not used to train or improve models by default** as of March 1, 2023. Users must opt-in for their data to be used for training.

For consumer services like free or Plus ChatGPT, conversations **may be used for model improvement by default**. Users can opt-out via settings or the privacy portal. Temporary Chat mode exists where conversations are not saved in history or used for training.

## Security Measures

Data is encrypted at rest using AES-256 and in transit with TLS 1.2 or higher. Enterprise features include:
*   **Enterprise Key Management (EKM)**: Allows customer-managed encryption keys via AWS KMS, Google Cloud KMS, or Azure Key Vault.
*   **Access Controls**: Role-based access controls, Single Sign-On (SSO), System for Cross-domain Identity Management (SCIM), and Multi-Factor Authentication (MFA).
*   **Private Link**: For secure, private network connections.

## Compliance and Certifications

OpenAI supports compliance with various regulations including GDPR, CCPA, HIPAA (via Business Associate Agreement for healthcare), and FERPA. Its certifications include SOC 2 Type 2, ISO 27001/27017/27018/27701, and CSA STAR.

## Data Residency and Retention

Data residency is available in regions including the US, EU, UK, Japan, and Canada. Qualifying organizations can configure data retention policies, including **Zero Data Retention (ZDR)** for the API or custom periods (e.g., a minimum of 90 days for some enterprise chats). Abuse monitoring logs retain some content and metadata for safety purposes.

## User Controls and Incidents

Users can delete conversations or accounts, use Temporary Chat mode, or submit Data Subject Access Requests (DSARs) via the privacy portal.

Notable incidents include:
*   A **2025 breach** via the vendor Mixpanel exposed limited API user metadata (names, emails, locations). No chat/API content, keys, or credentials were affected.
*   A **2023 internal messaging access incident** was reported internally.

## Internal Data Infrastructure

Internally, OpenAI manages massive training datasets using **Microsoft Azure Blob Storage** for ingestion, processing, and checkpoints at an exabyte scale. The **Stargate project**, in partnership with Oracle, SoftBank, and others, aims to build multi-gigawatt data centers (targeting 10 GW with a $500B investment) across US sites like Abilene, Texas, to support distributed training and inference.

## Related pages
- [[concepts/data-usage-policy.md]]
- [[entities/microsoft.md]]
- [[concepts/model-training.md]]