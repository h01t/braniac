use braniac_types::{IngestRequest, PaletteResult, SearchQuery};

use crate::error::Result;

#[derive(Debug, Clone)]
pub struct ParsedPaletteCommand {
    pub kind: PaletteCommandKind,
}

#[derive(Debug, Clone)]
pub enum PaletteCommandKind {
    Help,
    IngestLink { url: String },
    IngestPdf { path: Option<String> },
    IngestText { text: String },
    IndexRebuild,
    IndexStatus,
    Lint,
    LintApply,
    Vault { id: String },
    Open { path: String },
    Search { query: String },
    Tab { name: String },
    JobCancel,
    Unknown { raw: String },
}

pub fn parse_palette_command(line: &str) -> ParsedPaletteCommand {
    let trimmed = line.trim();
    let lower = trimmed.to_lowercase();

    if trimmed.is_empty() || lower == "help" || trimmed == "?" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Help,
        };
    }

    if lower == "index rebuild" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::IndexRebuild,
        };
    }
    if lower == "index status" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::IndexStatus,
        };
    }
    if lower == "lint" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Lint,
        };
    }
    if lower == "lint apply" || lower == "mint" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::LintApply,
        };
    }
    if lower == "job cancel" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::JobCancel,
        };
    }
    if lower == "graph" || lower == "editor" || lower == "settings" || lower == "plugins" {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Tab { name: lower },
        };
    }

    if let Some(rest) = trimmed.strip_prefix("link:").or_else(|| trimmed.strip_prefix("LINK:")) {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::IngestLink {
                url: rest.trim().to_string(),
            },
        };
    }
    if let Some(rest) = trimmed.strip_prefix("pdf:").or_else(|| trimmed.strip_prefix("PDF:")) {
        let path = rest.trim();
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::IngestPdf {
                path: if path.is_empty() { None } else { Some(path.to_string()) },
            },
        };
    }
    if let Some(rest) = trimmed.strip_prefix("ingest:").or_else(|| trimmed.strip_prefix("INGEST:"))
    {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::IngestText {
                text: rest.trim().to_string(),
            },
        };
    }
    if let Some(rest) = trimmed.strip_prefix("vault:").or_else(|| trimmed.strip_prefix("VAULT:"))
    {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Vault {
                id: rest.trim().to_string(),
            },
        };
    }
    if let Some(rest) = trimmed.strip_prefix("open:").or_else(|| trimmed.strip_prefix("OPEN:")) {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Open {
                path: rest.trim().to_string(),
            },
        };
    }
    if let Some(rest) =
        trimmed.strip_prefix("search:").or_else(|| trimmed.strip_prefix("SEARCH:"))
    {
        return ParsedPaletteCommand {
            kind: PaletteCommandKind::Search {
                query: rest.trim().to_string(),
            },
        };
    }

    ParsedPaletteCommand {
        kind: PaletteCommandKind::Unknown {
            raw: trimmed.to_string(),
        },
    }
}

pub fn help_text() -> &'static str {
    "Commands:\n\
     link: <url> | pdf: [path] | ingest: <text>\n\
     index rebuild | index status\n\
     lint | lint apply | mint\n\
     vault: <id> | open: <path> | search: <query>\n\
     graph | editor | settings | job cancel | help"
}

pub fn ingest_request_from_link(vault_id: &str, url: &str) -> Result<IngestRequest> {
    if url.is_empty() {
        return Err(crate::error::BraniacError::InvalidInput(
            "link: requires a URL".into(),
        ));
    }
    Ok(IngestRequest {
        vault_id: vault_id.to_string(),
        source_url: Some(url.to_string()),
        text: None,
        file_path: None,
    })
}

pub fn ingest_request_from_pdf(vault_id: &str, path: &str) -> Result<IngestRequest> {
    if path.is_empty() {
        return Err(crate::error::BraniacError::InvalidInput(
            "pdf: requires a file path (use UI picker when empty)".into(),
        ));
    }
    Ok(IngestRequest {
        vault_id: vault_id.to_string(),
        source_url: None,
        text: None,
        file_path: Some(path.to_string()),
    })
}

pub fn ingest_request_from_text(vault_id: &str, text: &str) -> Result<IngestRequest> {
    if text.is_empty() {
        return Err(crate::error::BraniacError::InvalidInput(
            "ingest: requires text".into(),
        ));
    }
    Ok(IngestRequest {
        vault_id: vault_id.to_string(),
        source_url: None,
        text: Some(text.to_string()),
        file_path: None,
    })
}

pub fn search_query_from(text: &str) -> SearchQuery {
    SearchQuery {
        text: text.to_string(),
        limit: Some(5),
        fuzzy: None,
        field: None,
    }
}

pub fn palette_ok(message: impl Into<String>) -> PaletteResult {
    PaletteResult {
        ok: true,
        message: message.into(),
        job_id: None,
        error: None,
        ui_action: None,
        ui_value: None,
        search_results: None,
        index_status: None,
    }
}

pub fn palette_err(error: impl Into<String>) -> PaletteResult {
    PaletteResult {
        ok: false,
        message: String::new(),
        job_id: None,
        error: Some(error.into()),
        ui_action: None,
        ui_value: None,
        search_results: None,
        index_status: None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_link_command() {
        let cmd = parse_palette_command("link: https://example.com");
        assert!(matches!(
            cmd.kind,
            PaletteCommandKind::IngestLink { .. }
        ));
    }

    #[test]
    fn parses_index_rebuild() {
        let cmd = parse_palette_command("index rebuild");
        assert!(matches!(cmd.kind, PaletteCommandKind::IndexRebuild));
    }
}
