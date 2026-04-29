import Link from "next/link";

import type { SalesPageRecord } from "@/src/types/sales-page";
import { DeleteSalesPageButton } from "@/src/features/sales-pages/components/delete-sales-page-button";
import { getSalesPageDetailHref } from "@/src/features/sales-pages/services/sales-page-routes";
import { formatDateLabel } from "@/src/lib/utils/format";

interface SalesPagePreviewProps {
  record: SalesPageRecord;
}

export function SalesPagePreview({ record }: SalesPagePreviewProps) {
  return (
    <section className="space-y-6">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-white/8 pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm text-[var(--color-text-muted)]">Saved preview</p>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.5rem]">
              {record.productName}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="rounded-full bg-white/5 px-3 py-1.5">
                {record.theme}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1.5">
                Saved {formatDateLabel(record.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="secondary-button inline-flex items-center justify-center"
            >
              Back to library
            </Link>
            <Link
              href="/dashboard/generate"
              className="primary-button inline-flex items-center justify-center"
            >
              Generate another
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">Product brief</p>
            <p className="max-w-3xl text-sm leading-7 text-[var(--color-text-muted)]">
              {record.rawInput.description}
            </p>
          </div>
          <div className="sm:min-w-[10rem]">
            <DeleteSalesPageButton id={record.id} redirectTo="/dashboard" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <article className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
          <p className="text-sm text-[var(--color-text-muted)]">Hero</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-[3.5rem]">
            {record.aiOutput.hero.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
            {record.aiOutput.hero.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {record.aiOutput.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-[rgba(205,163,73,0.08)] px-3 py-1.5 text-sm text-[var(--color-accent-soft)]"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-2">
            {record.aiOutput.benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[1.5rem] bg-white/3 p-5">
                <p className="text-lg font-semibold text-white">
                  {benefit.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <div className="panel-surface rounded-[1.75rem] p-6">
            <p className="text-sm text-[var(--color-text-muted)]">Offer</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
              {record.aiOutput.pricing.priceText}
            </p>
            <button
              type="button"
              className="primary-button mt-6 inline-flex w-full items-center justify-center"
            >
              {record.aiOutput.pricing.callToActionText}
            </button>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
              {record.aiOutput.pricing.guarantee}
            </p>
          </div>

          <div className="panel-surface rounded-[1.75rem] p-6">
            <p className="text-base font-semibold text-white">Target profile</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[var(--color-text-muted)]">Audience</dt>
                <dd className="mt-1 text-white">{record.rawInput.targetAudience}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)]">USP</dt>
                <dd className="mt-1 text-white">{record.rawInput.usp}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-muted)]">Preview link</dt>
                <dd className="mt-1 text-white">{getSalesPageDetailHref(record.id)}</dd>
              </div>
            </dl>
          </div>

          <div className="panel-surface rounded-[1.75rem] p-6">
            <p className="text-base font-semibold text-white">Social proof</p>
            <div className="mt-4 space-y-3">
              {record.aiOutput.socialProof.map((proof) => (
                <div key={`${proof.name}-${proof.review}`} className="rounded-2xl bg-white/3 p-4">
                  <p className="text-sm font-semibold text-white">{proof.name}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                    {proof.review}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
