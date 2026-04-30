import Link from "next/link";

import type { SalesPageRecord } from "@/src/types/sales-page";
import { SalesPagesOverview } from "@/src/features/sales-pages/components/sales-pages-overview";
import {
  getSalesPageDetailHref,
  getSalesPageRegenerateHref,
} from "@/src/features/sales-pages/services/sales-page-routes";

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
    <section className="space-y-6">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-text-muted)]">Workspace</p>
            <h3 className="max-w-3xl text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2.8rem]">
              Build, review, and iterate from one library.
            </h3>
            <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
              Start a new page fast, then come back here to preview, re-generate,
              or remove saved drafts.
            </p>
          </div>

          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center xl:justify-end">
            {latestRecord ? (
              <Link
                href={getSalesPageDetailHref(latestRecord.id)}
                className="secondary-button inline-flex items-center justify-center sm:w-auto"
              >
                Open latest preview
              </Link>
            ) : null}
            <Link
              href="/dashboard/generate"
              className="primary-button inline-flex items-center justify-center sm:w-auto"
            >
              Generate new page
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-2 xl:grid-cols-[minmax(0,220px)_minmax(0,220px)_1fr]">
          <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Saved pages</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {String(records.length).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs leading-6 text-[var(--color-text-muted)]">
              {records.length === 1
                ? "1 page stored in your library"
                : `${records.length} pages stored in your library`}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Last saved</p>
            <p className="mt-2 text-base font-semibold text-white">
              {latestLabel}
            </p>
            <p className="mt-2 text-xs leading-6 text-[var(--color-text-muted)]">
              {latestRecord ? latestRecord.productName : "Your next result will show up here"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
            <p className="text-xs text-[var(--color-text-muted)]">Quick action</p>
            {latestRecord ? (
              <div className="mt-2 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <p className="text-sm font-medium text-white">
                  Continue iterating on {latestRecord.productName}.
                </p>
                <Link
                  href={getSalesPageRegenerateHref(latestRecord.id)}
                  className="rounded-xl border border-white/8 px-3 py-2 text-center text-sm text-[var(--color-text-muted)] transition hover:border-white/16 hover:bg-white/4 hover:text-white"
                >
                  Re-generate latest
                </Link>
              </div>
            ) : (
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                Generate your first sales page to unlock preview, export, and
                regenerate actions here.
              </p>
            )}
          </div>
        </div>
      </div>

      <SalesPagesOverview records={records} />
    </section>
  );
}
