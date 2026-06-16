use async_trait::async_trait;
use braniac_types::AiProvider;
use serde::{Deserialize, Serialize};

use crate::error::{BraniacError, Result};

#[async_trait]
pub trait AiProviderAdapter: Send + Sync {
    async fn complete(&self, system: &str, user: &str) -> Result<String>;
}

pub struct MockAiAdapter;

pub const INGEST_SYSTEM_PROMPT: &str = r#"You are a strict AI Knowledge Compiler. Your goal is to ingest the raw text and extract concepts, entities, and sources to build an interconnected Markdown wiki.

Categorize files into folders by prefixing the filename. Use folders like 'concepts/', 'entities/', 'sources/'.

Every wiki page you output MUST follow this exact Markdown structure:
# [Page Title]

**Summary**: One to two sentences describing this page.
**Source Context**: URL or Document Name.

---

[Main content goes here with clear headings and short paragraphs. Every factual claim should explicitly reference its source. If facts disagree, note the contradiction explicitly.]

[Link to related concepts aggressively using [[concepts/name.md]] syntax throughout the text.]

## Related pages
- [[concepts/related-concept-1.md]]

You must output your response ONLY using the following XML-like file formatting. You can generate multiple files.
<file path="category/filename.md">
[content]
</file>

Do not write any introductory or trailing conversational text outside the file blocks. Keep filenames lowercase with hyphens."#;

pub const LINT_SYSTEM_PROMPT: &str = r#"You are the Knowledge Vault Linter for an LLM-Wiki. Analyze the structural health of the provided markdown vault files.

Evaluate and identify:
1. Contradictions between pages.
2. Orphan pages (no inbound [[links]] from any other page).
3. Concepts mentioned in text but lacking their own dedicated page.
4. Claims missing citations or that may be outdated.
5. Pages missing the standard format: '# Title', '**Summary**', '**Source Context**', '---', '## Related pages'.
6. Near-empty stubs with little to no substantive content (candidates for deletion).

YOUR OUTPUT MUST FOLLOW THIS EXACT FORMAT — two parts, nothing else:

PART 1 — Wrap a comprehensive markdown analysis report in <report>...</report> tags.
Use clear headings (## Section), bullet points, and flag severity with ⚠️ or ✅.

PART 2 — For each file you propose to fix, output a <fix> block immediately after the closing </report> tag.

For updates or new file creation:
<fix path="concepts/foo.md" action="update" reason="One-line justification">
[complete new file content here — must be a valid, fully-formed markdown file]
</fix>

For deletions (self-closing):
<fix path="concepts/stub.md" action="delete" reason="One-line justification" />

Rules:
- Output NO conversational text outside the <report> and <fix> blocks.
- Every <fix> must target a real path that exists in the vault data provided.
- Only propose fixes with high confidence. Do not hallucinate paths."#;

#[async_trait]
impl AiProviderAdapter for MockAiAdapter {
    async fn complete(&self, _system: &str, user: &str) -> Result<String> {
        if user.contains("<vault") || user.contains("Analyze this vault") {
            return Ok(r#"<report>Vault looks healthy in mock mode.</report>
<fix path="concepts/lint-fix.md" action="create" reason="mock lint"># Lint Fix

Mock lint proposal.
</fix>"#
            .into());
        }
        Ok(format!(
            r#"<file path="concepts/generated.md">
# Generated

**Summary**
Generated from ingest.

**Source Context**
{user}

## Related pages
- [[concepts/index.md]]
</file>"#
        ))
    }
}

pub fn use_mock_adapter() -> bool {
    std::env::var("BRANIAC_MOCK_AI")
        .map(|v| v == "1" || v.eq_ignore_ascii_case("true"))
        .unwrap_or(false)
}

pub fn build_ingest_adapter(
    provider: &AiProvider,
    model: &str,
) -> Result<Box<dyn AiProviderAdapter>> {
    if use_mock_adapter() {
        return Ok(Box::new(MockAiAdapter));
    }
    match provider {
        AiProvider::Deepseek => {
            let key = std::env::var("DEEPSEEK_API_KEY").map_err(|_| {
                BraniacError::Job(
                    "DEEPSEEK_API_KEY not set. Set the env var or BRANIAC_MOCK_AI=1.".into(),
                )
            })?;
            Ok(Box::new(HttpChatAdapter {
                api_key: key,
                base_url: "https://api.deepseek.com/chat/completions".into(),
                model: model.to_string(),
            }))
        }
        AiProvider::Openai => {
            let key = std::env::var("OPENAI_API_KEY").map_err(|_| {
                BraniacError::Job(
                    "OPENAI_API_KEY not set. Set the env var or BRANIAC_MOCK_AI=1.".into(),
                )
            })?;
            Ok(Box::new(HttpChatAdapter {
                api_key: key,
                base_url: "https://api.openai.com/v1/chat/completions".into(),
                model: model.to_string(),
            }))
        }
    }
}

pub struct HttpChatAdapter {
    api_key: String,
    base_url: String,
    model: String,
}

#[derive(Serialize)]
struct ChatRequest<'a> {
    model: &'a str,
    messages: Vec<ChatMessage<'a>>,
    stream: bool,
}

#[derive(Serialize)]
struct ChatMessage<'a> {
    role: &'a str,
    content: &'a str,
}

#[derive(Deserialize)]
struct ChatResponse {
    choices: Vec<ChatChoice>,
}

#[derive(Deserialize)]
struct ChatChoice {
    message: ChatResponseMessage,
}

#[derive(Deserialize)]
struct ChatResponseMessage {
    content: String,
}

#[async_trait]
impl AiProviderAdapter for HttpChatAdapter {
    async fn complete(&self, system: &str, user: &str) -> Result<String> {
        let client = reqwest::Client::new();
        let body = ChatRequest {
            model: &self.model,
            messages: vec![
                ChatMessage {
                    role: "system",
                    content: system,
                },
                ChatMessage {
                    role: "user",
                    content: user,
                },
            ],
            stream: false,
        };
        let response = client
            .post(&self.base_url)
            .bearer_auth(&self.api_key)
            .json(&body)
            .send()
            .await
            .map_err(|e| BraniacError::Job(format!("AI request failed: {e}")))?;
        if !response.status().is_success() {
            let status = response.status();
            let text = response.text().await.unwrap_or_default();
            return Err(BraniacError::Job(format!(
                "AI provider error {status}: {text}"
            )));
        }
        let parsed: ChatResponse = response
            .json()
            .await
            .map_err(|e| BraniacError::Job(format!("AI response parse error: {e}")))?;
        parsed
            .choices
            .into_iter()
            .next()
            .map(|c| c.message.content)
            .ok_or_else(|| BraniacError::Job("AI returned no choices".into()))
    }
}
