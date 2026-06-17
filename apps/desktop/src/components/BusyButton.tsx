import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BusyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  busy?: boolean;
  busyLabel?: string;
  children: ReactNode;
}

export function BusyButton({
  busy = false,
  busyLabel,
  children,
  disabled,
  ...rest
}: BusyButtonProps) {
  return (
    <button type="button" disabled={disabled || busy} aria-busy={busy || undefined} {...rest}>
      {busy && <span className="activity-step-icon activity-step-icon--spin busy-btn-spinner" aria-hidden="true" />}
      {busy ? (busyLabel ?? children) : children}
    </button>
  );
}
