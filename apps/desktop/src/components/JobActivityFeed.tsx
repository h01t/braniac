import { useEffect, useRef } from "react";
import type { JobActivityState } from "../hooks/useJobActivity";
import { ActivityProgressBar } from "./ActivityProgressBar";
import { StepIcon } from "./StepIcon";

interface JobActivityFeedProps {
  activity: JobActivityState;
  busy: boolean;
  compact?: boolean;
}

function phaseTitle(phase: JobActivityState["phase"]): string {
  if (phase === "success") return "Complete";
  if (phase === "error") return "Failed";
  if (phase === "running") return "In progress";
  return "";
}

export function JobActivityFeed({ activity, busy, compact = false }: JobActivityFeedProps) {
  const streamRef = useRef<HTMLDivElement>(null);
  const visibleChunks = activity.streamChunks.slice(-4);
  const showProgress = activity.phase === "running" && activity.percent != null;
  const showIndeterminate = activity.phase === "running" && activity.percent == null && busy;
  const title = phaseTitle(activity.phase);

  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleChunks.length]);

  const hasContent =
    activity.phase !== "idle" ||
    activity.steps.length > 0 ||
    visibleChunks.length > 0 ||
    busy;

  if (!hasContent) return null;

  return (
    <div
      className={`job-activity-feed${compact ? " job-activity-feed--compact" : ""}`}
      aria-live="polite"
      aria-busy={busy || activity.phase === "running"}
    >
      {(title || showProgress || showIndeterminate) && (
        <div className="job-activity-header">
          {title && <span className="job-activity-title">{title}</span>}
          {showProgress && <ActivityProgressBar percent={activity.percent} />}
          {showIndeterminate && <ActivityProgressBar indeterminate />}
        </div>
      )}

      {activity.steps.length > 0 && (
        <ul className="activity-steps">
          {activity.steps.map((step) => (
            <li key={step.id} className={`activity-step activity-step--${step.status}`}>
              <StepIcon status={step.status} />
              <span className="activity-step-label">{step.label}</span>
            </li>
          ))}
        </ul>
      )}

      {busy && activity.steps.length === 0 && (
        <p className="activity-working">
          Working<span className="activity-ellipsis" aria-hidden="true">…</span>
        </p>
      )}

      {activity.error && <p className="activity-error">{activity.error}</p>}

      {!compact && visibleChunks.length > 0 && (
        <div ref={streamRef} className="activity-stream">
          {visibleChunks.map((line, i) => (
            <div key={`${line}-${i}`} className="activity-stream-line">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
