"use client";

import { useDeleteSalesPage } from "@/src/features/sales-pages/hooks/use-delete-sales-page";

interface DeleteSalesPageButtonProps {
  id: number;
  redirectTo?: string;
  variant?: "dark" | "light";
}

export function DeleteSalesPageButton({
  id,
  redirectTo,
  variant = "dark",
}: DeleteSalesPageButtonProps) {
  const { activeId, errorMessage, isPending, remove } = useDeleteSalesPage();
  const deleting = isPending && activeId === id;

  return (
    <div className="flex items-center justify-end gap-3">
      {errorMessage ? (
        <p className="text-xs text-red-200">{errorMessage}</p>
      ) : null}
      <button
        type="button"
        className={
          variant === "light"
            ? "landing-secondary-button landing-secondary-button-midnight landing-button-compact text-slate-600 hover:text-slate-900"
            : "landing-secondary-button landing-button-compact border-white/10 bg-white/3 text-[var(--color-text-muted)] hover:border-white/16 hover:bg-white/5 hover:text-white"
        }
        onClick={() => remove(id, redirectTo)}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
