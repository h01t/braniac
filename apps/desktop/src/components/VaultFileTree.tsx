import { useMemo, useState } from "react";
import type { VaultFileEntry } from "../types";
import { buildFileTree, type FileTreeNode } from "../lib/fileTree";
import { ChevronIcon, FileIcon, FolderIcon } from "./icons";

function countFiles(node: FileTreeNode): number {
  if (node.kind === "file") return 1;
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
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
    const pad = 6 + depth * 12;

    if (node.kind === "folder") {
      const isOpen = expanded.has(node.path);
      const fileCount = countFiles(node);
      return (
        <div key={node.path}>
          <button
            type="button"
            className="file-tree-row file-tree-folder"
            style={{ paddingLeft: pad }}
            onClick={() => toggleFolder(node.path)}
            aria-expanded={isOpen}
          >
            <span className="file-tree-chevron">
              <ChevronIcon size={12} direction={isOpen ? "down" : "right"} />
            </span>
            <FolderIcon open={isOpen} size={14} className="file-tree-icon" />
            <span className="file-tree-label">{node.name}</span>
            <span className="file-tree-count">{fileCount}</span>
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
        <FileIcon size={14} className="file-tree-icon" />
        <span className="file-tree-label">{node.name}</span>
      </button>
    );
  };

  return <div className="file-tree">{tree.map((node) => renderNode(node, 0))}</div>;
}
