interface ActivityProgressBarProps {
  percent?: number | null;
  indeterminate?: boolean;
}

export function ActivityProgressBar({ percent, indeterminate }: ActivityProgressBarProps) {
  if (indeterminate) {
    return <div className="job-activity-progress job-activity-progress--indeterminate" />;
  }
  if (percent != null) {
    return (
      <div className="job-activity-progress">
        <div className="job-activity-progress-fill" style={{ width: `${percent}%` }} />
      </div>
    );
  }
  return null;
}
