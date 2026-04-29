import Link from "next/link";

export function EmptySalesPagesState() {
  return (
    <section className="panel-surface rounded-[1.75rem] p-8 sm:p-10">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Library
        </p>
        <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
          No saved sales pages yet.
        </h3>
        <p className="text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
          Once you start generating and saving pages, this workspace will show
          your full library here so you can review, preview, or remove drafts.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/generate"
            className="primary-button inline-flex items-center justify-center"
          >
            Create first sales page
          </Link>
        </div>
      </div>
    </section>
  );
}
