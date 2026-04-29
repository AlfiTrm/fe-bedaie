import { formatDateLabel } from "@/src/lib/utils/format";
import { normalizeSalesPageListItem } from "@/src/features/sales-pages/services/sales-page-list";
import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
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
            <p className="text-sm text-[var(--color-text-muted)]">
              Library
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
              Saved Pages
            </h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {items.length} saved
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
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
              <tr key={item.id} className="border-b border-white/6 last:border-b-0">
                <td className="px-6 py-5 align-top sm:px-8">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      {item.productName}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      ID #{item.id}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5 align-top">
                  <span className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-xs text-[var(--color-text-muted)]">
                    {item.themeLabel}
                  </span>
                </td>
                <td className="px-6 py-5 align-top text-sm text-[var(--color-text-muted)]">
                  {formatDateLabel(item.createdAt)}
                </td>
                <td className="px-6 py-5 align-top">
                  <DeleteSalesPageButton id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
