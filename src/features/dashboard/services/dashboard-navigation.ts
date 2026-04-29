export interface DashboardNavigationItem {
  href: string;
  label: string;
  icon: string;
  active: boolean;
  disabled?: boolean;
}

interface DashboardNavigationState {
  currentLabel: string;
  items: DashboardNavigationItem[];
}

const dashboardItems: Omit<DashboardNavigationItem, "active">[] = [
  {
    href: "/dashboard",
    label: "Saved Pages",
    icon: "solar:documents-linear",
  },
  {
    href: "/dashboard/generate",
    label: "Generate New",
    icon: "solar:magic-stick-3-linear",
  },
] as const;

export function getDashboardNavigationState(
  pathname: string,
): DashboardNavigationState {
  const items = dashboardItems.map((item) => ({
    ...item,
    active:
      !item.disabled &&
      ((item.href === "/dashboard" &&
        (pathname === "/dashboard" || pathname.startsWith("/dashboard/pages/"))) ||
        (item.href !== "/dashboard" && pathname.startsWith(item.href))),
  }));

  const currentLabel = pathname.startsWith("/dashboard/pages/")
    ? "Preview"
    : items.find((item) => item.active)?.label ??
      (pathname.startsWith("/dashboard") ? "Workspace" : "Dashboard");

  return {
    currentLabel,
    items,
  };
}
