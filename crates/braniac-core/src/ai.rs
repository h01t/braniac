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

pub const LINT_SYSTEM_PROMPT: &str = r#"You are a vault linter. Analyze markdown vault health and output:
<report>
[human-readable summary]
</report>

For each fix use either:
<fix path="concepts/foo.md" action="update" reason="...">new content</fix>
<fix path="concepts/orphan.md" action="delete" reason="..."/>
<fix path="concepts/new.md" action="create" reason="...">content</fix>"#;

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
