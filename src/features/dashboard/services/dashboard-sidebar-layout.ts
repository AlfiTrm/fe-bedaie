export const DASHBOARD_SIDEBAR_STORAGE_KEY =
  "dashboard.sidebar.collapsed";

export interface DashboardSidebarLayout {
  sidebarWidthClassName: string;
  contentOffsetClassName: string;
  headerOffsetClassName: string;
  showLabels: boolean;
}

export function getDashboardSidebarLayout(
  isCollapsed: boolean,
): DashboardSidebarLayout {
  return {
    sidebarWidthClassName: isCollapsed ? "lg:w-[5.5rem]" : "lg:w-[17rem]",
    contentOffsetClassName: isCollapsed
      ? "lg:pl-[5.5rem]"
      : "lg:pl-[17rem]",
    headerOffsetClassName: isCollapsed
      ? "lg:left-[5.5rem]"
      : "lg:left-[17rem]",
    showLabels: !isCollapsed,
  };
}

export function isDashboardSidebarCollapsedValue(value: string | null): boolean {
  return value === "true";
}
