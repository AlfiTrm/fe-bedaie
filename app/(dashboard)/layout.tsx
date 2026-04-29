import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/src/features/auth/services/auth-api.server";
import { DashboardShell } from "@/src/features/dashboard/components/dashboard-shell";
import { ApiError } from "@/src/lib/http/api-error";

export default async function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session;

  try {
    session = await requireCurrentUser();
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/login");
    }

    throw error;
  }

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
