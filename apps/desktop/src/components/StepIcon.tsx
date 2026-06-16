export type StepStatus = "pending" | "running" | "done" | "error";

export function StepIcon({ status }: { status: StepStatus }) {
  if (status === "running") {
    return <span className="activity-step-icon activity-step-icon--spin" aria-hidden="true" />;
  }
  if (status === "done") {
    return (
      <span className="activity-step-icon activity-step-icon--done" aria-hidden="true">
        ✓
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="activity-step-icon activity-step-icon--error" aria-hidden="true">
        ✕
      </span>
    );
  }
  return <span className="activity-step-icon activity-step-icon--pending" aria-hidden="true" />;
}
