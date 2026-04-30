"use client";

import type { AuthUser } from "@/src/types/sales-page";
import { DashboardSidebar } from "@/src/features/dashboard/components/dashboard-sidebar";
import { useDashboardNavigation } from "@/src/features/dashboard/hooks/use-dashboard-navigation";
import { useDashboardSidebarState } from "@/src/features/dashboard/hooks/use-dashboard-sidebar-state";
import { getDashboardSidebarLayout } from "@/src/features/dashboard/services/dashboard-sidebar-layout";
import { cn } from "@/src/lib/utils/cn";

interface DashboardShellProps {
  user: AuthUser;
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const { currentLabel } = useDashboardNavigation();
  const { isCollapsed, toggle } = useDashboardSidebarState();
  const layout = getDashboardSidebarLayout(isCollapsed);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_16%)] text-white">
      <DashboardSidebar user={user} isCollapsed={isCollapsed} onToggle={toggle} />
      <div
        className={cn(
          "min-h-screen transition-[padding] duration-200",
          layout.contentOffsetClassName,
        )}
      >
        <div className="flex min-h-screen flex-1 flex-col">
          <header
            className={cn(
              "fixed top-0 right-0 z-20 border-b border-white/8 bg-[rgba(11,12,15,0.88)] px-5 py-3 backdrop-blur lg:px-8",
              layout.headerOffsetClassName,
            )}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[var(--color-text-muted)]">
                Workspace
              </p>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">
                {currentLabel}
              </h2>
            </div>
          </header>
          <main className="flex-1 px-4 pt-24 pb-6 sm:px-5 lg:px-8 lg:pt-24 lg:pb-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
