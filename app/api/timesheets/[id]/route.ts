import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTimesheetById } from "@/lib/timesheets-store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const ts = getTimesheetById(id);
  if (!ts) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(ts);
}
