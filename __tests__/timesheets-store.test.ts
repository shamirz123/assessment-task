/**
 * Basic unit tests for the timesheets store logic.
 * These test the business logic (status calculation, task management).
 */

import {
  getTimesheets,
  getTimesheetById,
  addTaskToTimesheet,
  deleteTask,
} from "@/lib/timesheets-store";

describe("Timesheets Store", () => {
  it("getTimesheets returns an array", () => {
    const result = getTimesheets();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("getTimesheetById returns correct timesheet", () => {
    const all = getTimesheets();
    const first = all[0];
    const found = getTimesheetById(first.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(first.id);
  });

  it("getTimesheetById returns null for unknown id", () => {
    const result = getTimesheetById("nonexistent-id");
    expect(result).toBeNull();
  });

  it("addTaskToTimesheet adds a task and recalculates hours", () => {
    const all = getTimesheets();
    const missing = all.find((ts) => ts.status === "missing");
    expect(missing).toBeDefined();

    const before = missing!.totalHours;
    const updated = addTaskToTimesheet(missing!.id, {
      date: missing!.startDate,
      project: "Test Project",
      typeOfWork: "Development",
      description: "Test task",
      hours: 8,
    });

    expect(updated).not.toBeNull();
    expect(updated!.totalHours).toBe(before + 8);
  });

  it("status becomes completed when totalHours >= 40", () => {
    const all = getTimesheets();
    const missing = all.find((ts) => ts.status === "missing");
    if (!missing) return;

    // Add enough hours to fill it up
    for (let i = 0; i < 5; i++) {
      addTaskToTimesheet(missing.id, {
        date: missing.startDate,
        project: "Proj",
        typeOfWork: "Development",
        description: `Task ${i}`,
        hours: 8,
      });
    }

    const updated = getTimesheetById(missing.id);
    expect(updated?.status).toBe("completed");
  });

  it("deleteTask removes the task", () => {
    const all = getTimesheets();
    const ts = all.find((t) => t.tasks.length > 0);
    expect(ts).toBeDefined();

    const taskId = ts!.tasks[0].id;
    const before = ts!.tasks.length;

    const updated = deleteTask(ts!.id, taskId);
    expect(updated!.tasks.length).toBe(before - 1);
    expect(updated!.tasks.find((t) => t.id === taskId)).toBeUndefined();
  });
});
