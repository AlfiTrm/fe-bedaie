"use client";

import { useDeleteSalesPage } from "@/src/features/sales-pages/hooks/use-delete-sales-page";

interface DeleteSalesPageButtonProps {
  id: number;
  redirectTo?: string;
}

export function DeleteSalesPageButton({
  id,
  redirectTo,
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
        className="rounded-xl border border-white/8 px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:border-white/16 hover:bg-white/4 hover:text-white"
        onClick={() => remove(id, redirectTo)}
        disabled={deleting}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
