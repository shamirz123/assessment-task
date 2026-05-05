"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { TimesheetEntry, TimesheetStatus } from "@/lib/timesheets-store";

const PER_PAGE_OPTIONS = [5, 10, 20];

export default function TimesheetsTable() {
  const router = useRouter();
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchTimesheets = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      perPage: String(perPage),
      status: statusFilter,
    });
    const res = await fetch(`/api/timesheets?${params}`);
    const data = await res.json();
    setTimesheets(data.timesheets);
    setTotal(data.total);
    setLoading(false);
  }, [page, perPage, statusFilter]);

  useEffect(() => {
    fetchTimesheets();
  }, [fetchTimesheets]);

  const totalPages = Math.ceil(total / perPage);

  function getActionButton(ts: TimesheetEntry) {
    if (ts.status === "missing") {
      return (
        <button
          onClick={() => router.push(`/dashboard/timesheets/${ts.id}`)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Create
        </button>
      );
    }
    if (ts.status === "incomplete") {
      return (
        <button
          onClick={() => router.push(`/dashboard/timesheets/${ts.id}`)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Update
        </button>
      );
    }
    return (
      <button
        onClick={() => router.push(`/dashboard/timesheets/${ts.id}`)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        View
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Your Timesheets</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <i className="fa-solid fa-plus text-xs" />
          New Timesheet
        </button>
      </div>

      <div className="flex gap-3 mb-5">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
          <option value="missing">Missing</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide w-20">
                Week #
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide w-36">
                Status
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wide w-28">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : timesheets.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No timesheets found.
                </td>
              </tr>
            ) : (
              timesheets.map((ts) => (
                <tr
                  key={ts.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {ts.weekNumber}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{ts.dateRange}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={ts.status as TimesheetStatus} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    {getActionButton(ts)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        © 2026 tentwenty. All rights reserved.
      </p>

      {showCreateModal && (
        <CreateTimesheetModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newId: string) => {
            setShowCreateModal(false);
            router.push(`/dashboard/timesheets/${newId}`);
          }}
        />
      )}
    </div>
  );
}

// ── Create Timesheet Modal ───────────────────────────────────────────────────

function CreateTimesheetModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (newId: string) => void;
}) {
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!startDate) return setError("Please select a start date.");

    setLoading(true);
    const res = await fetch("/api/timesheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate }),
    });

    if (res.status === 409) {
      setError("A timesheet for this week already exists.");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const newTs = await res.json();
    setLoading(false);
    onSuccess(newTs.id);
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <div className="flex flex-wrap items-center justify-between mb-5 gap-2">
          <h2 className="text-base font-semibold text-gray-900">New Timesheet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Week Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setError("");
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Select the Monday of the week you want to log
          </p>
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Timesheet"}
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

// ── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (page > 4) pages.push("...");
    if (page > 3 && page < totalPages - 2) pages.push(page);
    if (page < totalPages - 3) pages.push("...");
    pages.push(totalPages - 1, totalPages);
  }

  const unique: (number | "...")[] = pages.filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {unique.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-1 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded text-sm ${
              p === page
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}