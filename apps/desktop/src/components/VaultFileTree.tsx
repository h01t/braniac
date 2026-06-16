import { useMemo, useState } from "react";
import type { VaultFileEntry } from "../types";
import { buildFileTree, type FileTreeNode } from "../lib/fileTree";

function MdIcon() {
  return (
    <svg className="file-tree-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 1h7l3 3v11H3V1zm6 0v3h3M5 8h6M5 10h6M5 12h4"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg className="file-tree-icon" viewBox="0 0 16 16" aria-hidden="true">
      {open ? (
        <path fill="currentColor" d="M2 4h5l1 1h6v8H2V4zm0-1v1h5l1 1h7v1H2V3z" />
      ) : (
        <path fill="currentColor" d="M2 4h5l1 1h6v8H2V4z" />
      )}
    </svg>
  );
}

interface VaultFileTreeProps {
  files: VaultFileEntry[];
  activePath: string;
  onOpen: (path: string) => void;
}

export function VaultFileTree({ files, activePath, onOpen }: VaultFileTreeProps) {
  const tree = useMemo(() => buildFileTree(files), [files]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const toggleFolder = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const renderNode = (node: FileTreeNode, depth: number) => {
    const pad = 8 + depth * 14;

    if (node.kind === "folder") {
      const isOpen = expanded.has(node.path);
      return (
        <div key={node.path}>
          <button
            type="button"
            className="file-tree-row file-tree-folder"
            style={{ paddingLeft: pad }}
            onClick={() => toggleFolder(node.path)}
            aria-expanded={isOpen}
          >
            <span className="file-tree-chevron">{isOpen ? "▾" : "▸"}</span>
            <FolderIcon open={isOpen} />
            <span className="file-tree-label">{node.name}</span>
          </button>
          {isOpen &&
            node.children.map((child) => (
              <div key={child.kind === "folder" ? child.path : child.path}>
                {renderNode(child, depth + 1)}
              </div>
            ))}
        </div>
      );
    }

    return (
      <button
        key={node.path}
        type="button"
        className={`file-tree-row file-tree-file ${node.path === activePath ? "active" : ""}`}
        style={{ paddingLeft: pad }}
        title={node.path}
        onClick={() => onOpen(node.path)}
      >
        <span className="file-tree-chevron file-tree-chevron-spacer" />
        <MdIcon />
        <span className="file-tree-label">{node.name}</span>
      </button>
    );
  };

  return <div className="file-tree">{tree.map((node) => renderNode(node, 0))}</div>;
}
