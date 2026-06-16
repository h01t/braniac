use std::path::PathBuf;
use std::sync::Arc;

use braniac_types::{IndexStatus, SearchQuery, SearchResult};
use chrono::Utc;
use parking_lot::Mutex;
use rusqlite::{params, Connection};
use sha2::{Digest, Sha256};

use crate::error::Result;
use crate::qmd;
use crate::vault::VaultResolver;

struct RebuildPrepared {
    vault_root: PathBuf,
    rows: Vec<(String, String, String, String)>,
    document_count: u64,
}

pub struct IndexManager {
    db: Arc<Mutex<Connection>>,
}

impl IndexManager {
    pub fn new(data_dir: PathBuf) -> Result<Self> {
        std::fs::create_dir_all(&data_dir)?;
        let db_path = data_dir.join("metadata.db");
        let conn = Connection::open(&db_path)?;
        conn.execute_batch(
            "CREATE TABLE IF NOT EXISTS documents (
                vault_id TEXT NOT NULL,
                path TEXT NOT NULL,
                title TEXT,
                content_hash TEXT NOT NULL,
                indexed_at TEXT,
                PRIMARY KEY (vault_id, path)
            );
            CREATE TABLE IF NOT EXISTS index_status (
                vault_id TEXT PRIMARY KEY,
                last_rebuild_at TEXT,
                embedding_model TEXT
            );",
        )?;
        Ok(Self {
            db: Arc::new(Mutex::new(conn)),
        })
    }

    pub fn status(&self, vault_id: &str, document_count: u64) -> Result<IndexStatus> {
        let db = self.db.lock();
        let indexed_count: u64 = db
            .query_row(
                "SELECT COUNT(*) FROM documents WHERE vault_id = ?1",
                params![vault_id],
                |row| row.get(0),
            )
            .unwrap_or(0);
        let last_rebuild_at: Option<String> = db
            .query_row(
                "SELECT last_rebuild_at FROM index_status WHERE vault_id = ?1",
                params![vault_id],
                |row| row.get(0),
            )
            .ok();
        let embedding_model: Option<String> = db
            .query_row(
                "SELECT embedding_model FROM index_status WHERE vault_id = ?1",
                params![vault_id],
                |row| row.get(0),
            )
            .ok();
        let stale = indexed_count < document_count;
        Ok(IndexStatus {
            vault_id: vault_id.to_string(),
            document_count,
            indexed_count,
            stale,
            last_rebuild_at: last_rebuild_at.and_then(|s| s.parse().ok()),
            embedding_model,
        })
    }

    pub fn rebuild(&self, vault: &VaultResolver, vault_id: &str) -> Result<IndexStatus> {
        let prepared = self.prepare_rebuild(vault, vault_id)?;
        self.run_qmd_rebuild(vault_id, &prepared)?;
        self.finalize_rebuild(vault_id, &prepared)
    }

    pub fn rebuild_with_vaults(
        &self,
        vaults: &Mutex<VaultResolver>,
        vault_id: &str,
    ) -> Result<IndexStatus> {
        let prepared = {
            let vault = vaults.lock();
            self.prepare_rebuild(&vault, vault_id)?
        };
        self.run_qmd_rebuild(vault_id, &prepared)?;
        self.finalize_rebuild(vault_id, &prepared)
    }

    fn prepare_rebuild(&self, vault: &VaultResolver, vault_id: &str) -> Result<RebuildPrepared> {
        let vault_root = vault.resolve_vault_path(vault_id)?;
        let files = vault.list_files(vault_id)?;
        let mut rows = Vec::with_capacity(files.len());
        for file in &files {
            let doc = vault.read_document(vault_id, &file.path)?;
            let hash = content_hash(&doc.content);
            let title = doc.title.clone().unwrap_or_else(|| file.name.clone());
            rows.push((file.path.clone(), file.name.clone(), title, hash));
        }
        Ok(RebuildPrepared {
            vault_root,
            document_count: files.len() as u64,
            rows,
        })
    }

    fn run_qmd_rebuild(&self, vault_id: &str, prepared: &RebuildPrepared) -> Result<()> {
        let collection = qmd::resolve_collection_name(&prepared.vault_root, vault_id)?;
        qmd::update_collection_named(&collection)?;
        qmd::embed_collection_named(&collection)?;
        Ok(())
    }

    fn finalize_rebuild(
        &self,
        vault_id: &str,
        prepared: &RebuildPrepared,
    ) -> Result<IndexStatus> {
        {
            let db = self.db.lock();
            db.execute(
                "DELETE FROM documents WHERE vault_id = ?1",
                params![vault_id],
            )?;
            for (path, _name, title, hash) in &prepared.rows {
                db.execute(
                    "INSERT OR REPLACE INTO documents (vault_id, path, title, content_hash, indexed_at)
                     VALUES (?1, ?2, ?3, ?4, ?5)",
                    params![vault_id, path, title, hash, Utc::now().to_rfc3339()],
                )?;
            }
            db.execute(
                "INSERT OR REPLACE INTO index_status (vault_id, last_rebuild_at, embedding_model)
                 VALUES (?1, ?2, ?3)",
                params![vault_id, Utc::now().to_rfc3339(), "qmd"],
            )?;
        }

        self.status(vault_id, prepared.document_count)
    }

    pub fn search(
        &self,
        vault: &VaultResolver,
        vault_id: &str,
        query: &SearchQuery,
    ) -> Result<Vec<SearchResult>> {
        let limit = query.limit.unwrap_or(5);
        let vault_root = vault.resolve_vault_path(vault_id)?;
        let collection = qmd::resolve_collection_name(&vault_root, vault_id)?;
        qmd::query_collection(&collection, &query.text, limit)
    }

    pub fn search_with_vaults(
        &self,
        vaults: &Mutex<VaultResolver>,
        vault_id: &str,
        query: &SearchQuery,
    ) -> Result<Vec<SearchResult>> {
        let vault = vaults.lock();
        self.search(&vault, vault_id, query)
    }
}

pub fn content_hash(content: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(content.as_bytes());
    format!("{:x}", hasher.finalize())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn content_hash_is_deterministic() {
        assert_eq!(content_hash("hello"), content_hash("hello"));
        assert_ne!(content_hash("hello"), content_hash("world"));
    }
}
