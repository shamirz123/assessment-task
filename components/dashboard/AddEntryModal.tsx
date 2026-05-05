"use client";

import { useState, useEffect } from "react";
import { Task } from "@/lib/timesheets-store";

const PROJECTS = ["Project Alpha", "Project Beta", "Project Gamma", "Internal"];
const WORK_TYPES = ["Development", "Bug fixes", "Testing", "Design", "Meeting", "Documentation"];

interface Props {
  timesheetId: string;
  date: string;
  existingTask: Task | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormErrors {
  project?: string;
  typeOfWork?: string;
  description?: string;
  hours?: string;
}

export default function AddEntryModal({
  timesheetId,
  date,
  existingTask,
  onClose,
  onSuccess,
}: Props) {
  const [project, setProject] = useState(existingTask?.project ?? "");
  const [typeOfWork, setTypeOfWork] = useState(existingTask?.typeOfWork ?? WORK_TYPES[0]);
  const [description, setDescription] = useState(existingTask?.description ?? "");
  const [hours, setHours] = useState(existingTask?.hours ?? 8);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const e: FormErrors = {};
    if (!project) e.project = "Please select a project.";
    if (!typeOfWork) e.typeOfWork = "Please select type of work.";
    if (!description.trim()) e.description = "Task description is required.";
    if (hours < 1 || hours > 24) e.hours = "Hours must be between 1 and 24.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);

    if (existingTask) {
      await fetch(`/api/timesheets/${timesheetId}/tasks/${existingTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project, typeOfWork, description, hours }),
      });
    } else {
      await fetch(`/api/timesheets/${timesheetId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project, typeOfWork, description, hours, date }),
      });
    }

    setLoading(false);
    onSuccess();
  }

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            {existingTask ? "Edit Entry" : "Add New Entry"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Project <span className="text-red-500">*</span>
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Project Name</option>
              {PROJECTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.project && <p className="text-xs text-red-600 mt-1">{errors.project}</p>}
          </div>

          {/* Type of Work */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <select
              value={typeOfWork}
              onChange={(e) => setTypeOfWork(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {WORK_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.typeOfWork && <p className="text-xs text-red-600 mt-1">{errors.typeOfWork}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here ..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-0.5">A note for extra info</p>
            {errors.description && <p className="text-xs text-red-600">{errors.description}</p>}
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHours(Math.max(1, hours - 1))}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                min={1}
                max={24}
                className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setHours(Math.min(24, hours + 1))}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            {errors.hours && <p className="text-xs text-red-600 mt-1">{errors.hours}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Saving..." : existingTask ? "Save changes" : "Add entry"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
