import type { LintFix } from "../types";
import { lineDiff, linesAsDiff, type DiffLine } from "../lib/lineDiff";

export type FixWithBefore = LintFix & { before: string };

export function actionLabel(action: string): string {
  return action.charAt(0).toUpperCase() + action.slice(1);
}

export function diffForFix(fix: FixWithBefore): DiffLine[] {
  const action = fix.action.toLowerCase();
  if (action === "create") {
    const content = fix.content ?? "";
    return content ? linesAsDiff(content.split("\n"), "add") : [];
  }
  if (action === "delete") {
    return fix.before ? linesAsDiff(fix.before.split("\n"), "remove") : [];
  }
  if (action === "update") {
    return lineDiff(fix.before, fix.content ?? "");
  }
  return [];
}

export function LintDiffView({ lines }: { lines: DiffLine[] }) {
  if (lines.length === 0) {
    return <p className="lint-diff-empty">No line-level preview available.</p>;
  }
  return (
    <pre className="lint-diff">
      {lines.map((line, i) => (
        <div key={`${line.type}-${i}`} className={`diff-line diff-line--${line.type}`}>
          <span className="diff-line-prefix">
            {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
          </span>
          <span className="diff-line-text">{line.text || " "}</span>
        </div>
      ))}
    </pre>
  );
}
