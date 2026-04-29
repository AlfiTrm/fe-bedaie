import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { DashboardHome } from "@/src/features/dashboard/components/dashboard-home";
import { listSalesPages } from "@/src/features/sales-pages/services/sales-pages-api.server";

export default async function DashboardPage() {
  const session = await requireCurrentUser();
  const records = await listSalesPages(session.token);

  return <DashboardHome records={records} />;
}
