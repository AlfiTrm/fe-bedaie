"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
import { getSalesPageExportHref } from "@/src/features/sales-pages/services/sales-page-routes";
import { getSalesPageRegenerateHref } from "@/src/features/sales-pages/services/sales-page-routes";

interface PreviewTopbarProps {
  recordId: number;
  ctaClassName: string;
  secondaryCtaClassName: string;
}

export function PreviewTopbar({
  recordId,
  ctaClassName,
  secondaryCtaClassName,
}: PreviewTopbarProps) {
  return (
    <div className="sticky top-[4.55rem] z-20 border-b border-slate-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="hidden text-sm font-medium tracking-[-0.03em] text-slate-500 sm:block">
          Saved preview
        </p>

        <div className="flex items-center justify-between gap-3 sm:flex-1 sm:justify-end">
          <Link
            href="/dashboard"
            aria-label="Back to library"
            title="Back to library"
            className={`${secondaryCtaClassName} landing-button-compact shrink-0 justify-center`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Icon icon="solar:alt-arrow-left-linear" width={18} />
              <span>Back</span>
            </span>
          </Link>

          <div className="-mx-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <div className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap sm:justify-end sm:gap-3">
            <Link
              href="/dashboard/generate"
              aria-label="Generate another"
              title="Generate another"
              className={`${ctaClassName} landing-button-compact shrink-0 justify-center`}
            >
              <span>Generate new</span>
            </Link>
            <Link
              href={getSalesPageRegenerateHref(recordId)}
              aria-label="Re-generate"
              title="Re-generate"
              className={`${secondaryCtaClassName} landing-button-compact shrink-0 justify-center`}
            >
              <span>Re-generate</span>
            </Link>
            <a
              href={getSalesPageExportHref(recordId)}
              aria-label="Export HTML"
              title="Export HTML"
              className={`${secondaryCtaClassName} landing-button-compact inline-flex shrink-0 items-center justify-center`}
            >
              <span className="inline-flex items-center justify-center">
                <Icon icon="solar:download-linear" width={18} />
              </span>
            </a>
            <DeleteSalesPageButton
              id={recordId}
              redirectTo="/dashboard"
              variant="light"
              iconOnly
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
