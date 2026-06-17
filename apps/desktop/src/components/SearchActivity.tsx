import { ActivityProgressBar } from "./ActivityProgressBar";

interface SearchActivityProps {
  label?: string;
  stepLabel?: string;
}

export function SearchActivity({
  label = "Searching vault…",
  stepLabel,
}: SearchActivityProps) {
  return (
    <div className="search-activity" aria-live="polite" aria-busy="true">
      <div className="job-activity-header">
        <span className="job-activity-title">{label}</span>
        <ActivityProgressBar indeterminate />
      </div>
      {stepLabel && (
        <p className="activity-working">
          {stepLabel}
          <span className="activity-ellipsis" aria-hidden="true">…</span>
        </p>
      )}
    </div>
  );
}
