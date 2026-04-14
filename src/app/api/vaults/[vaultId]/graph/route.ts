import { NextResponse } from 'next/server';
import { listFiles, readMarkdown } from '@/lib/vaultManager';

export async function GET(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const files = await listFiles(vaultId);
  
  const nodes = [];
  const links = [];
  
  for (const file of files) {
    if (file.type === 'file' && file.name.endsWith('.md')) {
      const id = file.path;
      nodes.push({ id, name: file.name.replace('.md', ''), val: 1 });
      
      const content = await readMarkdown(vaultId, id);
      if (content) {
        // Find [[links]]
        const regex = /\[\[(.*?)\]\]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          let target = match[1];
          if (!target.endsWith('.md')) target += '.md';
          links.push({ source: id, target });
        }
      }
    }
  }
  
  // Create missing target nodes
  const nodeIds = new Set(nodes.map(n => n.id));
  for (const link of links) {
    if (!nodeIds.has(link.target)) {
      nodes.push({ id: link.target, name: link.target.replace('.md', '') + ' (missing)', val: 0.5 });
      nodeIds.add(link.target);
    }
  }

  return NextResponse.json({ nodes, links });
}
