# ticktock – Timesheet Management App

A simplified SaaS-style Timesheet Management application built for a frontend developer technical assessment.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **next-auth v5** (Credentials provider)
- **Jest** + **@testing-library/react** for unit/component tests

## Features

- **Login page** with next-auth credentials auth, form validation, error handling
- **Dashboard** – paginated timesheet list with status filter, per-page control
- **Timesheet detail** – view tasks grouped by day, progress bar, hours tracking
- **Add/Edit modal** – form with validation (project, type of work, description, hours)
- **Delete tasks** via the `•••` context menu
- **Status auto-calculation**: `completed` (>= 40 hrs), `incomplete` (< 40 hrs), `missing` (0 hrs)
- **Protected routes** via next-auth middleware
- **Internal API routes** (`/api/timesheets`, `/api/timesheets/[id]/tasks`)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

A `.env.local` file is already included:

```env
AUTH_SECRET=ticktock-super-secret-key-for-demo-2024
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Demo Credentials

| Email               | Password    |
|---------------------|-------------|
|dummy@example.com    | password123 |
| jane@example.com    | password123 |

## Running Tests

```bash
npm test
```

Tests cover:
- `timesheets-store.ts` – unit tests (add task, delete task, status recalculation)
- `StatusBadge` – component rendering tests

## Project Structure

```
ticktock/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts   # NextAuth handler
│   │   └── timesheets/
│   │       ├── route.ts                  # GET list + filter + paginate
│   │       └── [id]/
│   │           ├── route.ts              # GET single timesheet
│   │           └── tasks/
│   │               ├── route.ts          # POST task
│   │               └── [taskId]/route.ts # PATCH / DELETE task
│   ├── dashboard/
│   │   ├── layout.tsx                    # Auth guard + Navbar
│   │   ├── page.tsx
│   │   └── timesheets/[id]/page.tsx
│   ├── login/page.tsx
│   └── layout.tsx
├── auth.ts                               # NextAuth config
├── middleware.ts                         # Protect /dashboard routes
├── lib/
│   └── timesheets-store.ts               # In-memory store + CRUD
├── components/
│   ├── auth/LoginForm.tsx
│   ├── dashboard/
│   │   ├── Navbar.tsx
│   │   ├── TimesheetsTable.tsx
│   │   ├── TimesheetDetail.tsx
│   │   └── AddEntryModal.tsx
│   ├── ui/StatusBadge.tsx
│   └── Providers.tsx
└── __tests__/
    ├── timesheets-store.test.ts
    └── StatusBadge.test.tsx
```

## Notes

- Data is stored in-memory; resets on server restart (fine for this assessment)
- No over-engineering: no Redux, no heavy abstractions — clean, readable separation of concerns
- All client data fetching goes through internal API routes
