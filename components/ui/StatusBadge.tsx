import { TimesheetStatus } from "@/lib/timesheets-store";

const styles: Record<TimesheetStatus, string> = {
  completed: "bg-green-100 text-green-700 border border-green-200",
  incomplete: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  missing: "bg-red-100 text-red-600 border border-red-200",
};

export default function StatusBadge({ status }: { status: TimesheetStatus }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}
