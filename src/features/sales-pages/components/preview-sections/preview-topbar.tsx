"use client";

import Link from "next/link";

import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
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
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-end gap-3 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/dashboard"
          className={`${secondaryCtaClassName} landing-button-compact`}
        >
          Back to library
        </Link>
        <Link
          href="/dashboard/generate"
          className={`${ctaClassName} landing-button-compact`}
        >
          Generate another
        </Link>
        <Link
          href={getSalesPageRegenerateHref(recordId)}
          className={`${secondaryCtaClassName} landing-button-compact`}
        >
          Re-generate
        </Link>
        <DeleteSalesPageButton
          id={recordId}
          redirectTo="/dashboard"
          variant="light"
        />
      </div>
    </div>
  );
}
