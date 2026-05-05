"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TimesheetEntry, Task } from "@/lib/timesheets-store";
import AddEntryModal from "@/components/dashboard/AddEntryModal";
import StatusBadge from "@/components/ui/StatusBadge";

interface Props {
  timesheetId: string;
}

export default function TimesheetDetail({ timesheetId }: Props) {
  const router = useRouter();
  const [timesheet, setTimesheet] = useState<TimesheetEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string>("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const fetchTimesheet = useCallback(async () => {
    const res = await fetch(`/api/timesheets/${timesheetId}`);
    if (!res.ok) { router.push("/dashboard"); return; }
    const data = await res.json();
    setTimesheet(data);
    setLoading(false);
  }, [timesheetId, router]);

  useEffect(() => { fetchTimesheet(); }, [fetchTimesheet]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setMenuOpenId(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Group tasks by date
  const grouped: Record<string, Task[]> = {};
  if (timesheet) {
    const start = new Date(timesheet.startDate);
    for (let i = 0; i < 5; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      grouped[d.toISOString().split("T")[0]] = [];
    }
    timesheet.tasks.forEach((t) => {
      if (!grouped[t.date]) grouped[t.date] = [];
      grouped[t.date].push(t);
    });
  }

  async function handleDeleteTask(taskId: string) {
    await fetch(`/api/timesheets/${timesheetId}/tasks/${taskId}`, { method: "DELETE" });
    fetchTimesheet();
    setMenuOpenId(null);
  }

  function formatDayLabel(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  const progressPct = timesheet
    ? Math.min(100, Math.round((timesheet.totalHours / 40) * 100))
    : 0;

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-14 bg-gray-100 rounded-lg"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (!timesheet) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.button
        whileHover={{ x: -3 }}
        onClick={() => router.push("/dashboard")}
        className="text-sm text-gray-500 hover:text-gray-800 mb-4 inline-flex items-center gap-1 transition-colors"
      >
        ← Back to timesheets
      </motion.button>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Week {timesheet.weekNumber} Timesheet</h1>
            <p className="text-sm text-gray-500 mt-0.5">{timesheet.dateRange}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-700">{timesheet.totalHours}/40 hrs</div>
            <div className="text-xs text-gray-400">{progressPct}%</div>
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3 overflow-hidden">
          <motion.div
            className="bg-orange-400 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <StatusBadge status={timesheet.status} />
        </div>

        {/* Tasks by day */}
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, tasks], dayIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + dayIndex * 0.06 }}
            >
              <p className="text-sm font-medium text-gray-700 mb-2">{formatDayLabel(date)}</p>
              <div className="space-y-1">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-md px-4 py-2.5"
                    >
                      <span className="text-sm text-gray-800">{task.description}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{task.hours} hrs</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{task.project}</span>
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)}
                            className="text-gray-400 hover:text-gray-700 px-1"
                          >
                            •••
                          </button>
                          <AnimatePresence>
                            {menuOpenId === task.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-25"
                              >
                                <button
                                  onClick={() => { setEditTask(task); setModalDate(task.date); setModalOpen(true); setMenuOpenId(null); }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => { setEditTask(null); setModalDate(date); setModalOpen(true); }}
                  className="w-full flex items-center justify-center gap-1 py-2 border border-dashed border-gray-200 rounded-md text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add new task
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <AddEntryModal
            timesheetId={timesheetId}
            date={modalDate}
            existingTask={editTask}
            onClose={() => { setModalOpen(false); setEditTask(null); }}
            onSuccess={() => { fetchTimesheet(); setModalOpen(false); setEditTask(null); }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}