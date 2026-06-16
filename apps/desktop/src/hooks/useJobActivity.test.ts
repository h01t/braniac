import { describe, expect, it } from "vitest";
import { jobActivityReducer, type JobActivityState } from "./useJobActivity";
import type { JobEvent } from "../types";

const idle: JobActivityState = {
  jobId: null,
  phase: "idle",
  steps: [],
  streamChunks: [],
  percent: null,
};

describe("jobActivityReducer", () => {
  it("resets to running on reset action", () => {
    const next = jobActivityReducer(idle, { type: "reset" });
    expect(next.phase).toBe("running");
    expect(next.steps).toEqual([]);
  });

  it("maps started event to first running step", () => {
    const event: JobEvent = { type: "started", jobId: "job-1" };
    const next = jobActivityReducer(idle, { type: "event", event });
    expect(next.jobId).toBe("job-1");
    expect(next.phase).toBe("running");
    expect(next.steps[0]).toMatchObject({ label: "Job started", status: "running" });
  });

  it("upserts progress steps and marks prior as done", () => {
    let state = jobActivityReducer(idle, {
      type: "event",
      event: { type: "started", jobId: "j1" },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "progress", jobId: "j1", message: "Extracting source", percent: 10 },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "progress", jobId: "j1", message: "Calling provider", percent: 40 },
    });
    expect(state.steps).toHaveLength(3);
    expect(state.steps[0].status).toBe("done");
    expect(state.steps[1].status).toBe("done");
    expect(state.steps[2]).toMatchObject({ label: "Calling provider", status: "running", percent: 40 });
    expect(state.percent).toBe(40);
  });

  it("appends chunk lines to streamChunks", () => {
    let state = jobActivityReducer(idle, {
      type: "event",
      event: { type: "started", jobId: "j1" },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "chunk", jobId: "j1", content: "line one\nline two" },
    });
    expect(state.streamChunks).toEqual(["line one", "line two"]);
  });

  it("marks all steps done on completed", () => {
    let state = jobActivityReducer(idle, {
      type: "event",
      event: { type: "started", jobId: "j1" },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "progress", jobId: "j1", message: "Applying patches", percent: 80 },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "completed", jobId: "j1" },
    });
    expect(state.phase).toBe("success");
    expect(state.percent).toBe(100);
    expect(state.steps.every((s) => s.status === "done")).toBe(true);
  });

  it("sets error phase on failed", () => {
    let state = jobActivityReducer(idle, {
      type: "event",
      event: { type: "started", jobId: "j1" },
    });
    state = jobActivityReducer(state, {
      type: "event",
      event: { type: "failed", jobId: "j1", error: "boom" },
    });
    expect(state.phase).toBe("error");
    expect(state.error).toBe("boom");
  });
});
