"use client";

import { useState } from "react";

import {
  buildGeneratePayload,
  createGeneratorDraftValues,
  splitKeyFeaturesInput,
  type GeneratorDraftValues,
} from "@/src/features/generator/services/generator-form";

export function useGenerateForm(initialValues?: GeneratorDraftValues) {
  const [values, setValues] = useState<GeneratorDraftValues>(
    () => initialValues ?? createGeneratorDraftValues(),
  );

  const updateField = <TField extends keyof GeneratorDraftValues>(
    field: TField,
    value: GeneratorDraftValues[TField],
  ) => {
    setValues((currentValue) => ({
      ...currentValue,
      [field]: value,
    }));
  };

  const keyFeatures = splitKeyFeaturesInput(values.keyFeaturesText);
  const hasMinimumInput =
    values.productName.trim().length > 0 &&
    values.description.trim().length > 0 &&
    keyFeatures.length > 0 &&
    values.targetAudience.trim().length > 0 &&
    values.price.trim().length > 0 &&
    values.usp.trim().length > 0;

  let payloadPreview = null;

  try {
    payloadPreview = hasMinimumInput ? buildGeneratePayload(values) : null;
  } catch {
    payloadPreview = null;
  }

  return {
    values,
    keyFeatures,
    hasMinimumInput,
    payloadPreview,
    updateField,
  };
}
