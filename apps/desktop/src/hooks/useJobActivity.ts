import { useCallback, useReducer } from "react";
import type { JobEvent } from "../types";

export type StepStatus = "pending" | "running" | "done" | "error";

export type ActivityStep = {
  id: string;
  label: string;
  status: StepStatus;
  percent?: number;
};

export type JobPhase = "idle" | "running" | "success" | "error";

export type JobActivityState = {
  jobId: string | null;
  phase: JobPhase;
  steps: ActivityStep[];
  streamChunks: string[];
  percent: number | null;
  error?: string;
};

const initialState: JobActivityState = {
  jobId: null,
  phase: "idle",
  steps: [],
  streamChunks: [],
  percent: null,
};

type Action =
  | { type: "reset" }
  | { type: "event"; event: JobEvent };

function stepId(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function markPriorDone(steps: ActivityStep[]): ActivityStep[] {
  return steps.map((s) => (s.status === "running" ? { ...s, status: "done" as const } : s));
}

function upsertProgressStep(steps: ActivityStep[], message: string, percent?: number | null): ActivityStep[] {
  const id = stepId(message);
  const existing = steps.findIndex((s) => s.id === id);
  const priorDone = markPriorDone(steps);
  const next: ActivityStep = {
    id,
    label: message,
    status: "running",
    percent: percent ?? undefined,
  };
  if (existing >= 0) {
    const copy = [...priorDone];
    copy[existing] = next;
    return copy;
  }
  return [...priorDone, next];
}

export function jobActivityReducer(state: JobActivityState, action: Action): JobActivityState {
  switch (action.type) {
    case "reset":
      return { ...initialState, phase: "running" };
    case "event": {
      const event = action.event;
      switch (event.type) {
        case "started":
          return {
            jobId: event.jobId,
            phase: "running",
            steps: [{ id: "started", label: "Job started", status: "running" }],
            streamChunks: [],
            percent: null,
          };
        case "progress":
          return {
            ...state,
            phase: "running",
            steps: upsertProgressStep(state.steps, event.message, event.percent),
            percent: event.percent ?? state.percent,
          };
        case "chunk": {
          const lines = event.content
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
          return {
            ...state,
            streamChunks: [...state.streamChunks, ...lines].slice(-20),
          };
        }
        case "patchReady":
          return {
            ...state,
            steps: [
              ...markPriorDone(state.steps),
              {
                id: "patch-ready",
                label: `Patches ready: ${event.patches.length} files`,
                status: "done",
              },
            ],
          };
        case "completed":
          return {
            ...state,
            phase: "success",
            percent: 100,
            steps: state.steps.map((s) => ({ ...s, status: s.status === "error" ? "error" : "done" })),
          };
        case "failed":
          return {
            ...state,
            phase: "error",
            error: event.error,
            steps: state.steps.map((s, i, arr) =>
              i === arr.length - 1 && s.status === "running" ? { ...s, status: "error" } : s,
            ),
          };
        case "cancelled":
          return {
            ...state,
            phase: "error",
            error: "Cancelled",
            steps: state.steps.map((s, i, arr) =>
              i === arr.length - 1 && s.status === "running" ? { ...s, status: "error" } : s,
            ),
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
}

export function useJobActivity() {
  const [state, dispatch] = useReducer(jobActivityReducer, initialState);

  const reset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const handleEvent = useCallback((event: JobEvent) => {
    dispatch({ type: "event", event });
  }, []);

  return { state, reset, handleEvent };
}
