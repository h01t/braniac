import type { VaultFileEntry } from "../types";

export type FileTreeNode =
  | { kind: "folder"; name: string; path: string; children: FileTreeNode[] }
  | { kind: "file"; name: string; path: string };

export function buildFileTree(files: VaultFileEntry[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  for (const file of files) {
    const segments = file.path.split("/");
    let level = root;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isFile = i === segments.length - 1;
      const pathSoFar = segments.slice(0, i + 1).join("/");

      if (isFile) {
        level.push({ kind: "file", name: segment, path: file.path });
        continue;
      }

      let folder = level.find(
        (n): n is Extract<FileTreeNode, { kind: "folder" }> =>
          n.kind === "folder" && n.name === segment,
      );
      if (!folder) {
        folder = { kind: "folder", name: segment, path: pathSoFar, children: [] };
        level.push(folder);
      }
      level = folder.children;
    }
  }

  const sortNodes = (nodes: FileTreeNode[]): FileTreeNode[] =>
    [...nodes]
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .map((n) => (n.kind === "folder" ? { ...n, children: sortNodes(n.children) } : n));

  return sortNodes(root);
}
