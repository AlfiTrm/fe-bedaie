import { validateGeneratorInput } from "./generator-contracts.ts";
import type { GeneratePayload } from "./generator-client.ts";

export interface GeneratorDraftValues {
  productName: string;
  description: string;
  keyFeaturesText: string;
  targetAudience: string;
  price: string;
  usp: string;
}

export function createGeneratorDraftValues(): GeneratorDraftValues {
  return {
    productName: "",
    description: "",
    keyFeaturesText: "",
    targetAudience: "",
    price: "",
    usp: "",
  };
}

export function splitKeyFeaturesInput(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildGeneratePayload(
  values: GeneratorDraftValues,
): GeneratePayload {
  const normalized = validateGeneratorInput({
    product_name: values.productName,
    description: values.description,
    key_features: splitKeyFeaturesInput(values.keyFeaturesText),
    target_audience: values.targetAudience,
    price: values.price,
    usp: values.usp,
  });

  return {
    product_name: normalized.productName,
    description: normalized.description,
    key_features: normalized.keyFeatures,
    target_audience: normalized.targetAudience,
    price: normalized.price,
    usp: normalized.usp,
  };
}
