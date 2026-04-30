"use client";

import type { GeneratorDraftValues } from "@/src/features/generator/services/generator-form";
import type { SalesPageThemeOption } from "@/src/features/sales-pages/services/sales-page-theme-options";

interface GenerateFormFieldsProps {
  values: GeneratorDraftValues;
  themeOptions: SalesPageThemeOption[];
  hasMinimumInput: boolean;
  isPending: boolean;
  isRegenerating: boolean;
  errorMessage: string | null;
  updateField: <TField extends keyof GeneratorDraftValues>(
    field: TField,
    value: GeneratorDraftValues[TField],
  ) => void;
  onSubmit: () => void;
}

export function GenerateFormFields({
  values,
  themeOptions,
  hasMinimumInput,
  isPending,
  isRegenerating,
  errorMessage,
  updateField,
  onSubmit,
}: GenerateFormFieldsProps) {
  return (
    <form
      className={`${isRegenerating ? "mt-6" : "mt-8"} space-y-8`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-3 lg:col-span-2">
          <span className="text-sm font-medium text-white">Product name</span>
          <input
            className="field-input"
            placeholder="Madu Hutan Liar"
            value={values.productName}
            onChange={(event) => updateField("productName", event.target.value)}
          />
        </label>

        <label className="space-y-3 lg:col-span-2">
          <span className="text-sm font-medium text-white">Description</span>
          <textarea
            className="field-input min-h-32 resize-y"
            placeholder="Ceritakan produk, kualitas utama, dan hasil yang dijanjikan."
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
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

      {errorMessage ? (
        <div className="rounded-[1.4rem] border border-red-500/25 bg-red-500/10 px-4 py-4 text-sm leading-7 text-red-100">
          <p className="font-medium text-white">Generation failed</p>
          <p className="mt-1 text-red-100/88">{errorMessage}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-white">
            {hasMinimumInput ? "Draft is ready" : "Complete the core fields"}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            AI generation will use this exact input structure next.
          </p>
        </div>
        <button
          type="submit"
          disabled={!hasMinimumInput || isPending}
          className="primary-button inline-flex w-full items-center justify-center sm:w-auto"
        >
          {isPending
            ? "Generating..."
            : isRegenerating
              ? "Re-generate Sales Page"
              : "Generate Sales Page"}
        </button>
      </div>
    </form>
  );
}
