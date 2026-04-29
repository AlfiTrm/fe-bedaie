"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

import type { AuthUser } from "@/src/types/sales-page";
import { LogoutButton } from "@/src/features/dashboard/components/logout-button";
import { useDashboardNavigation } from "@/src/features/dashboard/hooks/use-dashboard-navigation";
import { getDashboardSidebarLayout } from "@/src/features/dashboard/services/dashboard-sidebar-layout";
import { cn } from "@/src/lib/utils/cn";

interface DashboardSidebarProps {
  user: AuthUser;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function DashboardSidebar({
  user,
  isCollapsed,
  onToggle,
}: DashboardSidebarProps) {
  const { items } = useDashboardNavigation();
  const layout = getDashboardSidebarLayout(isCollapsed);

  return (
    <aside
      className={cn(
        "border-b border-white/8 bg-[rgba(11,12,15,0.96)] px-4 py-4 backdrop-blur transition-[width,padding] duration-200 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:border-r lg:border-b-0 lg:px-5 lg:py-5",
        layout.sidebarWidthClassName,
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex border-b border-white/8 pb-4",
            layout.showLabels ? "items-center gap-3" : "items-center justify-center",
          )}
        >
          {layout.showLabels ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(205,163,73,0.08)] text-[var(--color-accent-soft)]">
              <Icon icon="solar:widget-2-linear" width={20} />
            </div>
          ) : null}
          {layout.showLabels ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.95rem] font-semibold tracking-[-0.02em] text-white">
                AI Sales Page
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Dashboard
              </p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-9 w-9 items-center justify-center rounded-xl bg-white/4 text-[var(--color-text-muted)] hover:bg-white/7 lg:flex"
          >
            <Icon
              icon={
                isCollapsed
                  ? "solar:alt-arrow-right-linear"
                  : "solar:alt-arrow-left-linear"
              }
              width={18}
            />
          </button>
        </div>

        <nav className="mt-5 space-y-2">
          {items.map((item) =>
            item.disabled ? (
              <div
                key={item.label}
                title={!layout.showLabels ? item.label : undefined}
                className={cn(
                  "rounded-2xl bg-white/3 px-3 py-2.5 opacity-65",
                  layout.showLabels
                    ? "flex items-center gap-3"
                    : "flex items-center justify-center",
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/20 text-[var(--color-text-muted)]">
                  <Icon icon={item.icon} width={18} />
                </span>
                {layout.showLabels ? (
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Soon</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                title={!layout.showLabels ? item.label : undefined}
                className={cn(
                  "rounded-2xl px-3 py-2.5 transition",
                  layout.showLabels
                    ? "flex items-center gap-3"
                    : "flex items-center justify-center",
                  item.active
                    ? "bg-white/7"
                    : "bg-transparent hover:bg-white/4",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-text-muted)]",
                    item.active
                      ? "bg-[rgba(205,163,73,0.08)] text-[var(--color-accent-soft)]"
                      : "bg-transparent",
                  )}
                >
                  <Icon icon={item.icon} width={18} />
                </span>
                {layout.showLabels ? (
                  <span className="min-w-0 text-sm font-medium text-white">
                    {item.label}
                  </span>
                ) : null}
              </Link>
            ),
          )}
        </nav>

        <div className="mt-5 space-y-3 lg:mt-auto">
          <div className={cn(!layout.showLabels && "px-1")}>
            {layout.showLabels ? (
              <div className="space-y-1 px-1">
                <p className="text-xs text-[var(--color-text-muted)]">
                  Signed in
                </p>
                <p className="truncate text-sm font-semibold text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-[var(--color-text-muted)]">
                  {user.email}
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-sm font-semibold text-white">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
              </div>
            )}
          </div>

          <div>
            <LogoutButton compact={!layout.showLabels} />
          </div>
        </div>
      </div>
    </aside>
  );
}
