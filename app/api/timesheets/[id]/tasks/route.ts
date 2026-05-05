import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { addTaskToTimesheet } from "@/lib/timesheets-store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const { project, typeOfWork, description, hours, date } = body;
  if (!project || !typeOfWork || !description || !hours || !date) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const updated = addTaskToTimesheet(id, { project, typeOfWork, description, hours, date });
  if (!updated) return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });

  return NextResponse.json(updated, { status: 201 });
}
