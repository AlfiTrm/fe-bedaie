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
    sidebarWidthClassName: isCollapsed
      ? "w-[5rem] lg:w-[5.5rem]"
      : "w-[5rem] lg:w-[17rem]",
    contentOffsetClassName: isCollapsed
      ? "pl-[5rem] lg:pl-[5.5rem]"
      : "pl-[5rem] lg:pl-[17rem]",
    headerOffsetClassName: isCollapsed
      ? "left-[5rem] lg:left-[5.5rem]"
      : "left-[5rem] lg:left-[17rem]",
    showLabels: !isCollapsed,
  };
}

export function isDashboardSidebarCollapsedValue(value: string | null): boolean {
  return value === "true";
}
