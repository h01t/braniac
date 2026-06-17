import type { ComponentProps } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  preprocessWikilinks,
  wikilinkPathFromHref,
  WIKILINK_HREF_PREFIX,
} from "../lib/wikilinks";

interface WikilinkMarkdownProps {
  content: string;
  onNavigate?: (path: string) => void;
}

function WikilinkAnchor({
  href,
  children,
  onNavigate,
}: ComponentProps<"a"> & { onNavigate?: (path: string) => void }) {
  const wikilinkPath = wikilinkPathFromHref(href);

  if (wikilinkPath && onNavigate) {
    return (
      <button
        type="button"
        className="wikilink"
        onClick={() => onNavigate(wikilinkPath)}
      >
        {children}
      </button>
    );
  }

  if (wikilinkPath) {
    return <span className="wikilink wikilink-inert">{children}</span>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function WikilinkMarkdown({ content, onNavigate }: WikilinkMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      urlTransform={(url) => {
        if (url.startsWith(WIKILINK_HREF_PREFIX)) {
          return url;
        }
        return defaultUrlTransform(url);
      }}
      components={{
        a: ({ href, children }) => (
          <WikilinkAnchor href={href} onNavigate={onNavigate}>
            {children}
          </WikilinkAnchor>
        ),
      }}
    >
      {preprocessWikilinks(content)}
    </ReactMarkdown>
  );
}
