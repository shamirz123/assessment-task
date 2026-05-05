export type TimesheetStatus = "completed" | "incomplete" | "missing";

export interface TimesheetEntry {
  id: string;
  weekNumber: number;
  dateRange: string;
  startDate: string;
  endDate: string;
  status: TimesheetStatus;
  tasks: Task[];
  totalHours: number;
}

export interface Task {
  id: string;
  date: string;
  project: string;
  typeOfWork: string;
  description: string;
  hours: number;
}

let timesheets: TimesheetEntry[] = [
  {
    id: "ts-1",
    weekNumber: 1,
    dateRange: "1 - 5 January, 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-1",
        date: "2024-01-01",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Homepage Development",
        hours: 8,
      },
      {
        id: "t-2",
        date: "2024-01-02",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "API Integration",
        hours: 8,
      },
      {
        id: "t-3",
        date: "2024-01-03",
        project: "Project Beta",
        typeOfWork: "Bug fixes",
        description: "Fixed login issue",
        hours: 8,
      },
      {
        id: "t-4",
        date: "2024-01-04",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Dashboard UI",
        hours: 8,
      },
      {
        id: "t-5",
        date: "2024-01-05",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "QA Testing",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-2",
    weekNumber: 2,
    dateRange: "8 - 12 January, 2024",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-6",
        date: "2024-01-08",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "User profile page",
        hours: 8,
      },
      {
        id: "t-7",
        date: "2024-01-09",
        project: "Project Beta",
        typeOfWork: "Development",
        description: "Settings module",
        hours: 8,
      },
      {
        id: "t-8",
        date: "2024-01-10",
        project: "Project Alpha",
        typeOfWork: "Bug fixes",
        description: "Fix navigation bug",
        hours: 8,
      },
      {
        id: "t-9",
        date: "2024-01-11",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Reports page",
        hours: 8,
      },
      {
        id: "t-10",
        date: "2024-01-12",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "Integration tests",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-3",
    weekNumber: 3,
    dateRange: "15 - 19 January, 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    status: "incomplete",
    totalHours: 24,
    tasks: [
      {
        id: "t-11",
        date: "2024-01-15",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Homepage Development",
        hours: 8,
      },
      {
        id: "t-12",
        date: "2024-01-16",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "API refinements",
        hours: 8,
      },
      {
        id: "t-13",
        date: "2024-01-17",
        project: "Project Beta",
        typeOfWork: "Bug fixes",
        description: "Fixed sidebar crash",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-4",
    weekNumber: 4,
    dateRange: "22 - 26 January, 2024",
    startDate: "2024-01-22",
    endDate: "2024-01-26",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-14",
        date: "2024-01-22",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Auth flow implementation",
        hours: 8,
      },
      {
        id: "t-15",
        date: "2024-01-23",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "JWT token handling",
        hours: 8,
      },
      {
        id: "t-16",
        date: "2024-01-24",
        project: "Project Beta",
        typeOfWork: "Bug fixes",
        description: "Fixed refresh token bug",
        hours: 8,
      },
      {
        id: "t-17",
        date: "2024-01-25",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Role-based access control",
        hours: 8,
      },
      {
        id: "t-18",
        date: "2024-01-26",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "Final testing",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-5",
    weekNumber: 5,
    dateRange: "29 Jan - 2 February, 2024",
    startDate: "2024-01-29",
    endDate: "2024-02-02",
    status: "missing",
    totalHours: 0,
    tasks: [],
  },
  {
    id: "ts-6",
    weekNumber: 6,
    dateRange: "5 - 9 February, 2024",
    startDate: "2024-02-05",
    endDate: "2024-02-09",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-19",
        date: "2024-02-05",
        project: "Project Gamma",
        typeOfWork: "Design",
        description: "Wireframes for new dashboard",
        hours: 8,
      },
      {
        id: "t-20",
        date: "2024-02-06",
        project: "Project Gamma",
        typeOfWork: "Design",
        description: "High-fidelity mockups",
        hours: 8,
      },
      {
        id: "t-21",
        date: "2024-02-07",
        project: "Internal",
        typeOfWork: "Meeting",
        description: "Sprint planning meeting",
        hours: 8,
      },
      {
        id: "t-22",
        date: "2024-02-08",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Component library setup",
        hours: 8,
      },
      {
        id: "t-23",
        date: "2024-02-09",
        project: "Project Alpha",
        typeOfWork: "Documentation",
        description: "API docs update",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-7",
    weekNumber: 7,
    dateRange: "12 - 16 February, 2024",
    startDate: "2024-02-12",
    endDate: "2024-02-16",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-24",
        date: "2024-02-12",
        project: "Project Beta",
        typeOfWork: "Development",
        description: "Notification system",
        hours: 8,
      },
      {
        id: "t-25",
        date: "2024-02-13",
        project: "Project Beta",
        typeOfWork: "Development",
        description: "Email templates",
        hours: 8,
      },
      {
        id: "t-26",
        date: "2024-02-14",
        project: "Project Gamma",
        typeOfWork: "Testing",
        description: "UI regression tests",
        hours: 8,
      },
      {
        id: "t-27",
        date: "2024-02-15",
        project: "Project Alpha",
        typeOfWork: "Bug fixes",
        description: "Fixed mobile layout",
        hours: 8,
      },
      {
        id: "t-28",
        date: "2024-02-16",
        project: "Internal",
        typeOfWork: "Meeting",
        description: "Retrospective meeting",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-8",
    weekNumber: 8,
    dateRange: "19 - 23 February, 2024",
    startDate: "2024-02-19",
    endDate: "2024-02-23",
    status: "incomplete",
    totalHours: 16,
    tasks: [
      {
        id: "t-29",
        date: "2024-02-19",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Search feature implementation",
        hours: 8,
      },
      {
        id: "t-30",
        date: "2024-02-20",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Filter & sort functionality",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-9",
    weekNumber: 9,
    dateRange: "26 Feb - 1 March, 2024",
    startDate: "2024-02-26",
    endDate: "2024-03-01",
    status: "missing",
    totalHours: 0,
    tasks: [],
  },
  {
    id: "ts-10",
    weekNumber: 10,
    dateRange: "4 - 8 March, 2024",
    startDate: "2024-03-04",
    endDate: "2024-03-08",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-31",
        date: "2024-03-04",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Payment gateway integration",
        hours: 8,
      },
      {
        id: "t-32",
        date: "2024-03-05",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Stripe webhook handling",
        hours: 8,
      },
      {
        id: "t-33",
        date: "2024-03-06",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "Payment flow E2E tests",
        hours: 8,
      },
      {
        id: "t-34",
        date: "2024-03-07",
        project: "Project Alpha",
        typeOfWork: "Bug fixes",
        description: "Fixed checkout error",
        hours: 8,
      },
      {
        id: "t-35",
        date: "2024-03-08",
        project: "Internal",
        typeOfWork: "Documentation",
        description: "Payment docs",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-11",
    weekNumber: 11,
    dateRange: "11 - 15 March, 2024",
    startDate: "2024-03-11",
    endDate: "2024-03-15",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-36",
        date: "2024-03-11",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Analytics dashboard",
        hours: 8,
      },
      {
        id: "t-37",
        date: "2024-03-12",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Chart components",
        hours: 8,
      },
      {
        id: "t-38",
        date: "2024-03-13",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Data export feature",
        hours: 8,
      },
      {
        id: "t-39",
        date: "2024-03-14",
        project: "Internal",
        typeOfWork: "Meeting",
        description: "Q1 review meeting",
        hours: 8,
      },
      {
        id: "t-40",
        date: "2024-03-15",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "Analytics QA",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-12",
    weekNumber: 12,
    dateRange: "18 - 22 March, 2024",
    startDate: "2024-03-18",
    endDate: "2024-03-22",
    status: "incomplete",
    totalHours: 32,
    tasks: [
      {
        id: "t-41",
        date: "2024-03-18",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Multi-language support",
        hours: 8,
      },
      {
        id: "t-42",
        date: "2024-03-19",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "i18n config setup",
        hours: 8,
      },
      {
        id: "t-43",
        date: "2024-03-20",
        project: "Project Beta",
        typeOfWork: "Bug fixes",
        description: "Translation key fixes",
        hours: 8,
      },
      {
        id: "t-44",
        date: "2024-03-21",
        project: "Internal",
        typeOfWork: "Meeting",
        description: "Design sync",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-13",
    weekNumber: 13,
    dateRange: "25 - 29 March, 2024",
    startDate: "2024-03-25",
    endDate: "2024-03-29",
    status: "missing",
    totalHours: 0,
    tasks: [],
  },
  {
    id: "ts-14",
    weekNumber: 14,
    dateRange: "1 - 5 April, 2024",
    startDate: "2024-04-01",
    endDate: "2024-04-05",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-45",
        date: "2024-04-01",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Dark mode implementation",
        hours: 8,
      },
      {
        id: "t-46",
        date: "2024-04-02",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Theme switcher component",
        hours: 8,
      },
      {
        id: "t-47",
        date: "2024-04-03",
        project: "Project Alpha",
        typeOfWork: "Testing",
        description: "Theme regression tests",
        hours: 8,
      },
      {
        id: "t-48",
        date: "2024-04-04",
        project: "Project Beta",
        typeOfWork: "Bug fixes",
        description: "Dark mode contrast fixes",
        hours: 8,
      },
      {
        id: "t-49",
        date: "2024-04-05",
        project: "Internal",
        typeOfWork: "Documentation",
        description: "Theming guide",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-15",
    weekNumber: 15,
    dateRange: "8 - 12 April, 2024",
    startDate: "2024-04-08",
    endDate: "2024-04-12",
    status: "completed",
    totalHours: 40,
    tasks: [
      {
        id: "t-50",
        date: "2024-04-08",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Performance optimizations",
        hours: 8,
      },
      {
        id: "t-51",
        date: "2024-04-09",
        project: "Project Alpha",
        typeOfWork: "Development",
        description: "Code splitting & lazy loading",
        hours: 8,
      },
      {
        id: "t-52",
        date: "2024-04-10",
        project: "Project Beta",
        typeOfWork: "Testing",
        description: "Lighthouse audit fixes",
        hours: 8,
      },
      {
        id: "t-53",
        date: "2024-04-11",
        project: "Project Gamma",
        typeOfWork: "Development",
        description: "Image optimization",
        hours: 8,
      },
      {
        id: "t-54",
        date: "2024-04-12",
        project: "Internal",
        typeOfWork: "Meeting",
        description: "Q2 kickoff",
        hours: 8,
      },
    ],
  },
  {
    id: "ts-16",
    weekNumber: 16,
    dateRange: "15 - 19 April, 2024",
    startDate: "2024-04-15",
    endDate: "2024-04-19",
    status: "missing",
    totalHours: 0,
    tasks: [],
  },
];

export function getTimesheets() {
  return [...timesheets].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
}
export function getTimesheetById(id: string) {
  return timesheets.find((ts) => ts.id === id) ?? null;
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.ceil((diff / 86400000 + startOfYear.getDay() + 1) / 7);
}

export function createTimesheet(startDate: string): TimesheetEntry | null {
  const existing = timesheets.find((ts) => ts.startDate === startDate);
  if (existing) return null;

  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + 4);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const endMonthYear = end.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const startMonthShort = start.toLocaleDateString("en-GB", { month: "long" });

  const dateRange =
    start.getMonth() === end.getMonth()
      ? `${startDay} - ${endDay} ${endMonthYear}`
      : `${startDay} ${startMonthShort} - ${endDay} ${endMonthYear}`;

  const newTs: TimesheetEntry = {
    id: `ts-${Date.now()}`,
    weekNumber: getWeekNumber(start),
    dateRange,
    startDate,
    endDate: end.toISOString().split("T")[0],
    status: "missing",
    totalHours: 0,
    tasks: [],
  };

  timesheets.push(newTs);
  return newTs;
}

export function addTaskToTimesheet(
  timesheetId: string,
  task: Omit<Task, "id">,
) {
  const ts = timesheets.find((t) => t.id === timesheetId);
  if (!ts) return null;
  const newTask: Task = { ...task, id: `t-${Date.now()}` };
  ts.tasks.push(newTask);
  ts.totalHours = ts.tasks.reduce((sum, t) => sum + t.hours, 0);
  ts.status =
    ts.totalHours >= 40
      ? "completed"
      : ts.totalHours > 0
        ? "incomplete"
        : "missing";
  return ts;
}

export function updateTask(
  timesheetId: string,
  taskId: string,
  updates: Partial<Task>,
) {
  const ts = timesheets.find((t) => t.id === timesheetId);
  if (!ts) return null;
  ts.tasks = ts.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t));
  ts.totalHours = ts.tasks.reduce((sum, t) => sum + t.hours, 0);
  ts.status =
    ts.totalHours >= 40
      ? "completed"
      : ts.totalHours > 0
        ? "incomplete"
        : "missing";
  return ts;
}

export function deleteTask(timesheetId: string, taskId: string) {
  const ts = timesheets.find((t) => t.id === timesheetId);
  if (!ts) return null;
  ts.tasks = ts.tasks.filter((t) => t.id !== taskId);
  ts.totalHours = ts.tasks.reduce((sum, t) => sum + t.hours, 0);
  ts.status =
    ts.totalHours >= 40
      ? "completed"
      : ts.totalHours > 0
        ? "incomplete"
        : "missing";
  return ts;
}
