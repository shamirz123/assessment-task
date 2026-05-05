  import { NextRequest, NextResponse } from "next/server";
  import { auth } from "@/auth";
  import { updateTask, deleteTask } from "@/lib/timesheets-store";

  export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; taskId: string }> }
  ) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, taskId } = await params;
    const body = await req.json();
    const updated = updateTask(id, taskId, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updated);
  }

  export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string; taskId: string }> }
  ) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, taskId } = await params;
    const updated = deleteTask(id, taskId);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updated);
  }