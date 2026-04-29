"use client";

import Link from "next/link";

import type { AuthUser } from "@/src/types/sales-page";
import { LogoutButton } from "@/src/features/dashboard/components/logout-button";
import { useDashboardNavigation } from "@/src/features/dashboard/hooks/use-dashboard-navigation";
import { cn } from "@/src/lib/utils/cn";

interface DashboardShellProps {
  user: AuthUser;
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const { currentLabel, items } = useDashboardNavigation();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_16%)] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-white/8 bg-[rgba(255,255,255,0.02)] px-5 py-6 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-b-0 lg:px-6">
          <div className="flex items-start justify-between gap-4 lg:flex-col">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-tight text-white">
                AI Sales Page Generator
              </p>
              <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                Workspace
              </h1>
              <p className="max-w-xs text-sm leading-7 text-[var(--color-text-muted)]">
                Shell inti untuk auth-protected area. Generate, history, dan
                preview akan masuk di phase berikutnya.
              </p>
            </div>
          </div>
          <nav className="mt-8 space-y-3">
            {items.map((item) =>
              item.disabled ? (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 opacity-72"
                >
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs leading-6 text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-2xl border px-4 py-3 transition",
                    item.active
                      ? "border-[var(--color-border-strong)] bg-white/6"
                      : "border-white/8 bg-white/3 hover:border-white/14 hover:bg-white/4",
                  )}
                >
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs leading-6 text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </Link>
              ),
            )}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/8 bg-white/3 p-4">
            <p className="text-xs font-medium text-[var(--color-text-muted)]">
              Signed in as
            </p>
            <p className="mt-2 text-sm font-semibold text-white">{user.name}</p>
            <p className="mt-1 text-xs leading-6 text-[var(--color-text-muted)]">
              {user.email}
            </p>
          </div>
          <div className="mt-6 lg:mt-auto">
            <LogoutButton />
          </div>
        </aside>
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-white/8 bg-[rgba(255,255,255,0.015)] px-5 py-5 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Protected workspace
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
                  {currentLabel}
                </h2>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-[var(--color-text-muted)]">
                Bearer token tetap di cookie httpOnly lewat Next.js BFF.
              </div>
            </div>
          </header>
          <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
