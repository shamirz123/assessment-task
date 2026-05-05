import TimesheetDetail from "@/components/dashboard/TimesheetDetail";

export default async function TimesheetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TimesheetDetail timesheetId={id} />;
}
