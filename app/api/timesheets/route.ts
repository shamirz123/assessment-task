import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTimesheets, createTimesheet } from "@/lib/timesheets-store";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? "10");

  let data = getTimesheets();
  if (status && status !== "all") {
    data = data.filter((ts) => ts.status === status);
  }

  const total = data.length;
  const paginated = data.slice((page - 1) * perPage, page * perPage);

  return NextResponse.json({ timesheets: paginated, total, page, perPage });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { startDate } = await req.json();
  if (!startDate) return NextResponse.json({ error: "startDate required" }, { status: 400 });

  const ts = createTimesheet(startDate);
  if (!ts) return NextResponse.json({ error: "Timesheet for this week already exists" }, { status: 409 });

  return NextResponse.json(ts, { status: 201 });
}