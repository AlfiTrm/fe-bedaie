"use client";

import type { GeneratorDraftValues } from "@/src/features/generator/services/generator-form";

interface GenerateFormSidebarProps {
  values: GeneratorDraftValues;
  keyFeatures: string[];
  payloadPreview: unknown;
}

export function GenerateFormSidebar({
  values,
  keyFeatures,
  payloadPreview,
}: GenerateFormSidebarProps) {
  return (
    <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
      <div className="panel-surface rounded-[1.75rem] p-6">
        <p className="text-sm text-[var(--color-text-muted)]">Live snapshot</p>
        <h4 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          {values.productName.trim() || "Your product title"}
        </h4>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          {values.description.trim() ||
            "A short preview of your product positioning will appear here as you fill the form."}
        </p>

        <div className="mt-6 space-y-4 border-t border-white/8 pt-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/3 p-4">
              <p className="text-xs text-[var(--color-text-muted)]">Audience</p>
              <p className="mt-2 text-sm font-medium text-white">
                {values.targetAudience.trim() || "Not set"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/3 p-4">
              <p className="text-xs text-[var(--color-text-muted)]">Price</p>
              <p className="mt-2 text-sm font-medium text-white">
                {values.price.trim() || "Not set"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-muted)]">
              Key features
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(keyFeatures.length > 0 ? keyFeatures : ["No features yet"]).map(
                (feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
                  >
                    {feature}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="panel-surface rounded-[1.75rem] p-6">
        <p className="text-base font-semibold text-white">Payload readiness</p>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
          <li>Product name, description, and USP define the core positioning.</li>
          <li>Key features are normalized into the structure expected by the AI route.</li>
          <li>Target audience and price feed the final generated copy.</li>
        </ul>

        <div className="mt-5 rounded-2xl bg-black/20 p-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            Payload preview
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-[var(--color-text-muted)]">
            {payloadPreview
              ? JSON.stringify(payloadPreview, null, 2)
              : "Complete the form to preview the request payload."}
          </pre>
        </div>
      </div>
    </div>
  );
}
