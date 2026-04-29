"use client";

import { usePathname } from "next/navigation";
import { getDashboardNavigationState } from "@/src/features/dashboard/services/dashboard-navigation";

export function useDashboardNavigation() {
  const pathname = usePathname();

  return getDashboardNavigationState(pathname);
}
