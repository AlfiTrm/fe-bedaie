import type { SalesPageRecord } from "@/src/types/sales-page";
import { SalesPagesOverview } from "@/src/features/sales-pages/components/sales-pages-overview";

interface DashboardHomeProps {
  records: SalesPageRecord[];
}

export function DashboardHome({ records }: DashboardHomeProps) {
  const latestRecord = records[0];
  const latestLabel = latestRecord
    ? new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(latestRecord.createdAt))
    : "No activity yet";

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <div className="space-y-3">
          <p className="text-sm text-[var(--color-text-muted)]">Overview</p>
          <h3 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.6rem]">
            Your saved sales pages, ready to review.
          </h3>
          <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
            Keep track of generated pages, revisit the strongest drafts, and
            manage what stays in your library as you move from brief to saved
            preview.
          </p>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
          {[
            {
              label: "Saved records",
              value: String(records.length).padStart(2, "0"),
              detail: records.length === 1 ? "1 page stored in library" : `${records.length} pages stored in library`,
            },
            {
              label: "Last saved",
              value: latestLabel,
              detail: latestRecord ? latestRecord.productName : "Your next saved page will appear here",
            },
            {
              label: "Status",
              value: records.length > 0 ? "Library active" : "Ready to start",
              detail: records.length > 0 ? "You can review or remove saved pages below" : "Saved pages will appear here after generation",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/8 bg-white/3 p-4"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-xs leading-6 text-[var(--color-text-muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="panel-surface rounded-[1.75rem] p-6">
          <p className="text-base font-semibold text-white">Inside this view</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li>See every saved sales page from the live backend in one list.</li>
            <li>Check product, theme, and saved date at a glance.</li>
            <li>Remove old drafts without leaving the workspace.</li>
          </ul>
        </div>
        <div className="panel-surface rounded-[1.75rem] p-6">
          <p className="text-base font-semibold text-white">Use this workflow</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li>Generate a new page with DeepSeek through Sumopod.</li>
            <li>Save the result automatically after generation succeeds.</li>
            <li>Open a dedicated preview/detail page for each saved record.</li>
          </ul>
        </div>
      </div>
      <div className="xl:col-span-2">
        <SalesPagesOverview records={records} />
      </div>
    </section>
  );
}
