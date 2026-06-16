use thiserror::Error;

#[derive(Debug, Error)]
pub enum BraniacError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("JSON error: {0}")]
    Json(#[from] serde_json::Error),

    #[error("SQLite error: {0}")]
    Sqlite(#[from] rusqlite::Error),

    #[error("Git error: {0}")]
    Git(#[from] git2::Error),

    #[error("Search index error: {0}")]
    Search(String),

    #[error("Vault error: {0}")]
    Vault(String),

    #[error("Path traversal denied: {0}")]
    PathTraversal(String),

    #[error("Job error: {0}")]
    Job(String),

    #[error("Plugin error: {0}")]
    Plugin(String),

    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Invalid input: {0}")]
    InvalidInput(String),
}

pub type Result<T> = std::result::Result<T, BraniacError>;
