"use client";

import { GenerateFormFields } from "@/src/features/generator/components/generate-form-fields";
import { GenerateFormHeader } from "@/src/features/generator/components/generate-form-header";
import { GenerateFormSidebar } from "@/src/features/generator/components/generate-form-sidebar";
import { useGenerateForm } from "@/src/features/generator/hooks/use-generate-form";
import { useSubmitGenerateForm } from "@/src/features/generator/hooks/use-submit-generate-form";
import type { GeneratorDraftValues } from "@/src/features/generator/services/generator-form";
import { getSalesPageThemeOptions } from "@/src/features/sales-pages/services/sales-page-theme-options";

interface GenerateSalesPageFormProps {
  initialValues?: GeneratorDraftValues;
  sourceProductName?: string;
}

export function GenerateSalesPageForm({
  initialValues,
  sourceProductName,
}: GenerateSalesPageFormProps) {
  const { values, keyFeatures, hasMinimumInput, payloadPreview, updateField } =
    useGenerateForm(initialValues);
  const { errorMessage, isPending, submit } = useSubmitGenerateForm(values);
  const themeOptions = getSalesPageThemeOptions();
  const isRegenerating = Boolean(initialValues);

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <GenerateFormHeader
          isRegenerating={isRegenerating}
          sourceProductName={sourceProductName}
        />

        <GenerateFormFields
          values={values}
          themeOptions={themeOptions}
          hasMinimumInput={hasMinimumInput}
          isPending={isPending}
          isRegenerating={isRegenerating}
          errorMessage={errorMessage}
          updateField={updateField}
          onSubmit={submit}
        />
      </div>

      <GenerateFormSidebar
        values={values}
        keyFeatures={keyFeatures}
        payloadPreview={payloadPreview}
      />
    </section>
  );
}
