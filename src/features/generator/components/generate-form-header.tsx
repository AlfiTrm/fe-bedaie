"use client";

import Link from "next/link";

interface GenerateFormHeaderProps {
  isRegenerating: boolean;
  sourceProductName?: string;
}

export function GenerateFormHeader({
  isRegenerating,
  sourceProductName,
}: GenerateFormHeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-[var(--color-text-muted)]">
            {isRegenerating ? "Re-generate draft" : "New draft"}
          </p>
          <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
            {isRegenerating
              ? "Refine the brief and generate a new version."
              : "Build the product brief first."}
          </h3>
          <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
            {isRegenerating
              ? `Starting from ${sourceProductName ?? "your saved page"} so you can tune the input and generate a stronger result.`
              : "Fill the core product details that will shape the AI-generated sales page."}
          </p>
        </div>
        <Link
          href="/dashboard"
          className="secondary-button inline-flex items-center justify-center"
        >
          Back to library
        </Link>
      </div>

      {isRegenerating ? (
        <div className="mt-6 rounded-[1.4rem] border border-[var(--color-accent)]/30 bg-[rgba(205,163,73,0.08)] px-4 py-4 text-sm leading-7 text-[var(--color-text)]">
          This flow saves the re-generated result as a new sales page, so the
          original version stays intact.
        </div>
      ) : null}
    </>
  );
}
