import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function iconProps({ size = 16, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true as const,
    ...rest,
  };
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        fill="currentColor"
        d="M11.2 10.4l3.1 3.1-0.8 0.8-3.1-3.1a5 5 0 1 1 0.8-0.8zM6 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
      />
    </svg>
  );
}

export function FolderIcon({ open = false, ...props }: IconProps & { open?: boolean }) {
  return (
    <svg {...iconProps(props)}>
      {open ? (
        <path
          fill="currentColor"
          d="M2 4h5l1 1h6v8H2V4zm0-1v1h5l1 1h7v1H2V3z"
        />
      ) : (
        <path fill="currentColor" d="M2 4h5l1 1h6v8H2V4z" />
      )}
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        fill="currentColor"
        d="M3 1h7l3 3v11H3V1zm6 0v3h3M5 8h6M5 10h6M5 12h4"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        fill="currentColor"
        d="M8 1l1.2 3.6L13 6l-3.8 1.4L8 11 6.8 7.4 3 6l3.8-1.4L8 1zm4.5 7.5l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1zM3.5 2.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 8.5l3 3 6-7"
      />
    </svg>
  );
}

export function ChevronIcon({ direction = "down", ...props }: IconProps & { direction?: "down" | "right" }) {
  return (
    <svg {...iconProps(props)}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === "down" ? "M4 6l4 4 4-4" : "M6 4l4 4-4 4"}
      />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        fill="currentColor"
        d="M4.5 6.5l2 1.5-2 1.5v-3zm2.5 3.5h4.5v1H7z"
      />
    </svg>
  );
}

export function BrandGlyphIcon(props: IconProps) {
  return (
    <svg {...iconProps({ size: 18, ...props })}>
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="16" y2="16">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="8" r="7" fill="url(#brand-grad)" opacity="0.2" />
      <path
        fill="url(#brand-grad)"
        d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 1.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zm-2.8 5.2c.6-1.2 1.8-2 3.2-2s2.6.8 3.2 2c.3.6-.2 1.3-.9 1.3H6.1c-.7 0-1.2-.7-.9-1.3z"
      />
    </svg>
  );
}
