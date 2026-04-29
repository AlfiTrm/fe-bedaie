"use client";

import Link from "next/link";

import { useGenerateForm } from "@/src/features/generator/hooks/use-generate-form";
import { useSubmitGenerateForm } from "@/src/features/generator/hooks/use-submit-generate-form";
import { getSalesPageThemeOptions } from "@/src/features/sales-pages/services/sales-page-theme-options";

export function GenerateSalesPageForm() {
  const { values, keyFeatures, hasMinimumInput, payloadPreview, updateField } =
    useGenerateForm();
  const { errorMessage, isPending, submit } = useSubmitGenerateForm(values);
  const themeOptions = getSalesPageThemeOptions();

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-[var(--color-text-muted)]">New draft</p>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
              Build the product brief first.
            </h3>
            <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
              Fill the core product details that will shape the AI-generated
              sales page.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="secondary-button inline-flex items-center justify-center"
          >
            Back to library
          </Link>
        </div>

        <form
          className="mt-8 space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="space-y-3 lg:col-span-2">
              <span className="text-sm font-medium text-white">Product name</span>
              <input
                className="field-input"
                placeholder="Madu Hutan Liar"
                value={values.productName}
                onChange={(event) =>
                  updateField("productName", event.target.value)
                }
              />
            </label>

            <label className="space-y-3 lg:col-span-2">
              <span className="text-sm font-medium text-white">Description</span>
              <textarea
                className="field-input min-h-32 resize-y"
                placeholder="Ceritakan produk, kualitas utama, dan hasil yang dijanjikan."
                value={values.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
              />
            </label>

            <label className="space-y-3 lg:col-span-2">
              <span className="text-sm font-medium text-white">Key features</span>
              <textarea
                className="field-input min-h-28 resize-y"
                placeholder={"Organik\nTanpa gula tambahan\nPanen langsung dari hutan"}
                value={values.keyFeaturesText}
                onChange={(event) =>
                  updateField("keyFeaturesText", event.target.value)
                }
              />
              <p className="text-xs text-[var(--color-text-muted)]">
                Pisahkan setiap fitur dengan baris baru atau koma.
              </p>
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-white">
                Target audience
              </span>
              <input
                className="field-input"
                placeholder="Orang dewasa aktif"
                value={values.targetAudience}
                onChange={(event) =>
                  updateField("targetAudience", event.target.value)
                }
              />
            </label>

            <label className="space-y-3">
              <span className="text-sm font-medium text-white">Price</span>
              <input
                className="field-input"
                placeholder="Rp 150.000"
                value={values.price}
                onChange={(event) => updateField("price", event.target.value)}
              />
            </label>

            <label className="space-y-3 lg:col-span-2">
              <span className="text-sm font-medium text-white">
                Unique selling proposition
              </span>
              <textarea
                className="field-input min-h-28 resize-y"
                placeholder="Garansi uang kembali 30 hari jika produk tidak cocok."
                value={values.usp}
                onChange={(event) => updateField("usp", event.target.value)}
              />
            </label>

            <label className="space-y-3 lg:col-span-2">
              <span className="text-sm font-medium text-white">Accent style</span>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      values.theme === option.value
                        ? "rounded-2xl border border-[var(--color-accent)] bg-white/8 px-4 py-4 text-left"
                        : "rounded-2xl border border-white/8 bg-white/3 px-4 py-4 text-left hover:border-white/16 hover:bg-white/4"
                    }
                    onClick={() => updateField("theme", option.value)}
                  >
                    <p className="text-sm font-medium text-white">{option.label}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      Clean white page with {option.label.toLowerCase()} accents.
                    </p>
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">
                {hasMinimumInput ? "Draft is ready" : "Complete the core fields"}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {errorMessage ?? "AI generation will use this exact input structure next."}
              </p>
            </div>
            <button
              type="submit"
              disabled={!hasMinimumInput || isPending}
              className="primary-button inline-flex items-center justify-center"
            >
              {isPending ? "Generating..." : "Generate Sales Page"}
            </button>
          </div>
        </form>
      </div>

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
            <pre className="mt-3 overflow-x-auto text-xs leading-6 text-[var(--color-text-muted)]">
              {payloadPreview
                ? JSON.stringify(payloadPreview, null, 2)
                : "Complete the form to preview the request payload."}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
