"use client";

import { useLogout } from "@/src/features/dashboard/hooks/use-logout";

export function LogoutButton() {
  const { errorMessage, isPending, logout } = useLogout();

  return (
    <div className="space-y-3">
      {errorMessage ? (
        <p className="text-xs leading-6 text-red-200">{errorMessage}</p>
      ) : null}
      <button
        type="button"
        className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-accent)] hover:bg-white/10"
        onClick={logout}
        disabled={isPending}
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
