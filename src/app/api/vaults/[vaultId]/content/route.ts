import { NextResponse } from 'next/server';
import { readMarkdown, writeMarkdownAndCommit } from '@/lib/vaultManager';

export async function GET(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  
  if (!filename) {
    return NextResponse.json({ error: 'filename is required' }, { status: 400 });
  }
  
  const content = await readMarkdown(vaultId, filename);
  if (content === null) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
  return NextResponse.json({ content });
}

export async function POST(request: Request, { params }: { params: Promise<{ vaultId: string }> }) {
  const { vaultId } = await params;
  const body = await request.json();
  const { filename, content, commitMessage } = body;
  
  if (!filename || !content) {
    return NextResponse.json({ error: 'filename and content are required' }, { status: 400 });
  }
  
  const result = await writeMarkdownAndCommit(
    vaultId, 
    filename, 
    content, 
    commitMessage || `Updated ${filename}`
  );
  
  return NextResponse.json(result);
}
