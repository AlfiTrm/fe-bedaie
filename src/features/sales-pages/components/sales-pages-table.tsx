import Link from "next/link";

import { formatDateLabel } from "@/src/lib/utils/format";
import { normalizeSalesPageListItem } from "@/src/features/sales-pages/services/sales-page-list";
import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
import {
  getSalesPageDetailHref,
  getSalesPageRegenerateHref,
} from "@/src/features/sales-pages/services/sales-page-routes";
import type { SalesPageRecord } from "@/src/types/sales-page";

interface SalesPagesTableProps {
  records: SalesPageRecord[];
}

export function SalesPagesTable({ records }: SalesPagesTableProps) {
  const items = records.map(normalizeSalesPageListItem);

  return (
    <section className="panel-surface overflow-hidden rounded-[1.75rem]">
      <div className="border-b border-white/8 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Library</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
              Saved Pages
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
              Review the latest output, re-generate stronger versions, or clear
              old drafts from your workspace.
            </p>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {items.length} saved
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4 sm:px-6 md:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white">
                    {item.productName}
                  </p>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${item.themeBadgeClassName}`}
                  >
                    {item.themeLabel}
                  </span>
                </div>
                <p className="text-xs leading-6 text-[var(--color-text-muted)]">
                  Saved on {formatDateLabel(item.createdAt)}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Record ID #{item.id}
                </p>
              </div>

              <div className="grid gap-2">
                <Link
                  href={getSalesPageDetailHref(item.id)}
                  className="rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-center text-sm font-medium text-white transition hover:border-white/16 hover:bg-white/8"
                >
                  Preview
                </Link>
                <Link
                  href={getSalesPageRegenerateHref(item.id)}
                  className="rounded-xl border border-white/8 px-3 py-2 text-center text-sm text-[var(--color-text-muted)] transition hover:border-white/16 hover:bg-white/4 hover:text-white"
                >
                  Re-generate
                </Link>
                <DeleteSalesPageButton id={item.id} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/8 text-left">
              <th className="px-6 py-4 text-xs font-medium text-[var(--color-text-muted)] sm:px-8">
                Product
              </th>
              <th className="px-6 py-4 text-xs font-medium text-[var(--color-text-muted)]">
                Theme
              </th>
              <th className="px-6 py-4 text-xs font-medium text-[var(--color-text-muted)]">
                Created
              </th>
              <th className="px-6 py-4 text-xs font-medium text-[var(--color-text-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/6 transition hover:bg-white/[0.025] last:border-b-0"
              >
                <td className="px-6 py-5 align-top sm:px-8">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {item.productName}
                      </p>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${item.themeBadgeClassName}`}
                      >
                        {item.themeLabel}
                      </span>
                    </div>
                    <p className="text-xs leading-6 text-[var(--color-text-muted)]">
                      Saved on {formatDateLabel(item.createdAt)}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Record ID #{item.id}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5 align-top text-sm text-[var(--color-text-muted)]">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">
                      {item.themeLabel}
                    </p>
                    <p className="text-xs leading-6 text-[var(--color-text-muted)]">
                      Accent preset used for the saved preview.
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5 align-top text-sm text-[var(--color-text-muted)]">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">
                      {formatDateLabel(item.createdAt)}
                    </p>
                    <p className="text-xs leading-6 text-[var(--color-text-muted)]">
                      Ready to preview or re-generate.
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5 align-top">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <Link
                      href={getSalesPageDetailHref(item.id)}
                      className="rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-sm font-medium text-white transition hover:border-white/16 hover:bg-white/8"
                    >
                      Preview
                    </Link>
                    <Link
                      href={getSalesPageRegenerateHref(item.id)}
                      className="rounded-xl border border-white/8 px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:border-white/16 hover:bg-white/4 hover:text-white"
                    >
                      Re-generate
                    </Link>
                    <DeleteSalesPageButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
