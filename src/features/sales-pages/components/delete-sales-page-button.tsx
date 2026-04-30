"use client";

import { Icon } from "@iconify/react";

import { useDeleteSalesPage } from "@/src/features/sales-pages/hooks/use-delete-sales-page";

interface DeleteSalesPageButtonProps {
  id: number;
  redirectTo?: string;
  variant?: "dark" | "light";
  iconOnlyOnMobile?: boolean;
  iconOnly?: boolean;
}

export function DeleteSalesPageButton({
  id,
  redirectTo,
  variant = "dark",
  iconOnlyOnMobile = false,
  iconOnly = false,
}: DeleteSalesPageButtonProps) {
  const { activeId, errorMessage, isPending, remove } = useDeleteSalesPage();
  const deleting = isPending && activeId === id;
  const label = deleting ? "Deleting..." : "Delete";

  return (
    <div className="flex items-center justify-end gap-3">
      {errorMessage ? (
        <p className="text-xs text-red-200">{errorMessage}</p>
      ) : null}
      <button
        type="button"
        aria-label={label}
        title={label}
        className={
          variant === "light"
            ? "landing-secondary-button landing-secondary-button-midnight landing-button-compact text-slate-600 hover:text-slate-900"
            : "landing-secondary-button landing-button-compact border-white/10 bg-white/3 text-[var(--color-text-muted)] hover:border-white/16 hover:bg-white/5 hover:text-white"
        }
        onClick={() => remove(id, redirectTo)}
        disabled={deleting}
      >
        {!iconOnly && iconOnlyOnMobile ? (
          <span className="inline-flex items-center justify-center sm:hidden">
            <Icon icon="solar:trash-bin-trash-linear" width={18} />
          </span>
        ) : null}
        {iconOnly ? null : (
          <span className={iconOnlyOnMobile ? "hidden sm:inline" : ""}>
            {label}
          </span>
        )}
        {iconOnly ? (
          <span className="inline-flex items-center justify-center">
            <Icon icon="solar:trash-bin-trash-linear" width={18} />
          </span>
        ) : null}
      </button>
    </div>
  );
}
