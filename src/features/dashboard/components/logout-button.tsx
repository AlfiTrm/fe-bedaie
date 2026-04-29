"use client";

import { Icon } from "@iconify/react";

import { useLogout } from "@/src/features/dashboard/hooks/use-logout";
import { cn } from "@/src/lib/utils/cn";

interface LogoutButtonProps {
  compact?: boolean;
}

export function LogoutButton({ compact = false }: LogoutButtonProps) {
  const { errorMessage, isPending, logout } = useLogout();

  return (
    <div className="space-y-3">
      {errorMessage ? (
        <p className="text-xs leading-6 text-red-200">{errorMessage}</p>
      ) : null}
      <button
        type="button"
        aria-label={isPending ? "Logging out" : "Logout"}
        title={compact ? "Logout" : undefined}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:bg-white/10",
          compact && "px-3",
        )}
        onClick={logout}
        disabled={isPending}
      >
        <Icon icon="solar:logout-2-linear" width={18} />
        {compact ? null : isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
