use braniac_types::DocumentPatch;

use crate::error::Result;
use crate::vault::{VaultResolver, VaultWriteOp};

pub fn apply_document_patches(
    vault: &VaultResolver,
    vault_id: &str,
    patches: &[DocumentPatch],
) -> Result<()> {
    if patches.is_empty() {
        return Ok(());
    }
    let ops: Vec<VaultWriteOp> = patches
        .iter()
        .map(|patch| VaultWriteOp::Write {
            path: patch.path.clone(),
            content: patch.new_content.clone(),
        })
        .collect();
    let message = patches
        .first()
        .map(|p| p.message.as_str())
        .unwrap_or("ingest apply");
    vault.apply_batch(vault_id, &ops, message)?;
    Ok(())
}

pub fn rollback_document_patches(
    vault: &VaultResolver,
    vault_id: &str,
    patches: &[DocumentPatch],
) -> Result<()> {
    let mut ops = Vec::with_capacity(patches.len());
    for patch in patches {
        if let Some(old) = &patch.old_content {
            ops.push(VaultWriteOp::Write {
                path: patch.path.clone(),
                content: old.clone(),
            });
        } else if vault.read_document(vault_id, &patch.path).is_ok() {
            ops.push(VaultWriteOp::Delete {
                path: patch.path.clone(),
            });
        }
    }
    if ops.is_empty() {
        return Ok(());
    }
    vault.apply_batch(vault_id, &ops, "rollback patch")?;
    Ok(())
}
