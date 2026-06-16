export const WIKILINK_PATTERN = /\[\[([^\]]+)\]\]/g;

export const WIKILINK_HREF_PREFIX = "braniac-wikilink:";

/** Mirrors `normalize_link` in crates/braniac-core/src/graph.rs */
export function normalizeWikilinkTarget(link: string): string {
  const trimmed = link.trim();
  if (trimmed.endsWith(".md")) {
    return trimmed;
  }
  return `${trimmed}.md`;
}

export function wikilinkLabel(target: string): string {
  const base = target.split("/").pop() ?? target;
  return base.endsWith(".md") ? base.slice(0, -3) : base;
}

export function preprocessWikilinks(markdown: string): string {
  return markdown.replace(WIKILINK_PATTERN, (_match, raw: string) => {
    const target = normalizeWikilinkTarget(raw);
    const label = wikilinkLabel(target);
    return `[${label}](${WIKILINK_HREF_PREFIX}${target})`;
  });
}

export function wikilinkPathFromHref(href: string | undefined): string | null {
  if (!href?.startsWith(WIKILINK_HREF_PREFIX)) {
    return null;
  }
  return href.slice(WIKILINK_HREF_PREFIX.length);
}
