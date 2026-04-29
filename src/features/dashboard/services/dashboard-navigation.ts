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
    href: "#",
    label: "Generate New",
    icon: "solar:magic-stick-3-linear",
    disabled: true,
  },
] as const;

export function getDashboardNavigationState(
  pathname: string,
): DashboardNavigationState {
  const items = dashboardItems.map((item) => ({
    ...item,
    active: !item.disabled && pathname === item.href,
  }));

  return {
    currentLabel:
      items.find((item) => item.active)?.label ??
      (pathname.startsWith("/dashboard") ? "Workspace" : "Dashboard"),
    items,
  };
}
