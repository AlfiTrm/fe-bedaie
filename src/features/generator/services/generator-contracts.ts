import type { AiOutput, GeneratorInput } from "../../../types/sales-page.ts";
import {
  asArray,
  isObject,
  toCleanString,
} from "../../../lib/utils/object.ts";

function normalizeStringList(values: unknown, fieldName: string): string[] {
  const cleaned = asArray(values)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  if (cleaned.length === 0) {
    throw new Error(`Field "${fieldName}" wajib punya minimal satu item.`);
  }

  return cleaned;
}

function normalizeBenefits(value: unknown): AiOutput["benefits"] {
  const benefits = asArray(value)
    .map((item) => {
      if (!isObject(item)) {
        return null;
      }

      return {
        title: toCleanString(item.title, "benefits.title"),
        description: toCleanString(
          item.description,
          "benefits.description",
        ),
      };
    })
    .filter((item): item is AiOutput["benefits"][number] => item !== null);

  if (benefits.length === 0) {
    throw new Error("AI output wajib punya minimal satu benefit.");
  }

  return benefits;
}

function normalizeSocialProof(value: unknown): AiOutput["socialProof"] {
  const proofs = asArray(value)
    .map((item) => {
      if (!isObject(item)) {
        return null;
      }

      return {
        name: toCleanString(item.name, "social_proof.name"),
        review: toCleanString(item.review, "social_proof.review"),
      };
    })
    .filter((item): item is AiOutput["socialProof"][number] => item !== null);

  if (proofs.length === 0) {
    throw new Error("AI output wajib punya minimal satu social proof.");
  }

  return proofs;
}

export function validateGeneratorInput(rawValue: unknown): GeneratorInput {
  if (!isObject(rawValue)) {
    throw new Error("Payload generator tidak valid.");
  }

  const productName = toCleanString(
    rawValue.product_name ?? rawValue.productName,
    "product_name",
  );
  const description = toCleanString(rawValue.description, "description");
  const keyFeatures = normalizeStringList(
    rawValue.key_features ?? rawValue.keyFeatures,
    "key_features",
  );
  const targetAudience = toCleanString(
    rawValue.target_audience ?? rawValue.targetAudience,
    "target_audience",
  );
  const price = toCleanString(rawValue.price, "price");
  const usp = toCleanString(rawValue.usp, "usp");

  return {
    productName,
    description,
    keyFeatures,
    targetAudience,
    price,
    usp,
  };
}

export function normalizeAiOutput(rawValue: unknown): AiOutput {
  if (!isObject(rawValue)) {
    throw new Error("AI output tidak valid.");
  }

  if (!isObject(rawValue.hero)) {
    throw new Error("Hero section wajib ada.");
  }

  if (!isObject(rawValue.pricing)) {
    throw new Error("Pricing section wajib ada.");
  }

  return {
    hero: {
      headline: toCleanString(rawValue.hero.headline, "hero.headline"),
      subheadline: toCleanString(
        rawValue.hero.subheadline,
        "hero.subheadline",
      ),
    },
    benefits: normalizeBenefits(rawValue.benefits),
    features: normalizeStringList(rawValue.features, "features"),
    socialProof: normalizeSocialProof(
      rawValue.social_proof ?? rawValue.socialProof,
    ),
    pricing: {
      priceText: toCleanString(
        rawValue.pricing.price_text ?? rawValue.pricing.priceText,
        "pricing.price_text",
      ),
      callToActionText: toCleanString(
        rawValue.pricing.call_to_action_text ??
          rawValue.pricing.callToActionText,
        "pricing.call_to_action_text",
      ),
      guarantee: toCleanString(rawValue.pricing.guarantee, "pricing.guarantee"),
    },
  };
}

function extractJsonCandidate(text: string): string {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);

  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  throw new Error("Respons AI tidak mengandung JSON yang bisa diparse.");
}

export function extractAiOutputFromText(text: string): AiOutput {
  const parsed = JSON.parse(extractJsonCandidate(text));
  return normalizeAiOutput(parsed);
}

export function buildFallbackAiOutput(input: GeneratorInput): AiOutput {
  return {
    hero: {
      headline: `${input.productName} untuk ${input.targetAudience}`,
      subheadline: `${input.description} Dirancang untuk menonjolkan ${input.usp.toLowerCase()}.`,
    },
    benefits: [
      {
        title: `Alasan memilih ${input.productName}`,
        description: `Copy penjualan ini menekankan manfaat paling terasa untuk ${input.targetAudience.toLowerCase()}.`,
      },
      {
        title: "Lebih mudah dikonversi",
        description: `Setiap section disusun dari USP, fitur utama, dan harga ${input.price}.`,
      },
    ],
    features: input.keyFeatures.length >= 2
      ? input.keyFeatures
      : [...input.keyFeatures, input.usp],
    socialProof: [
      {
        name: "Pelanggan awal",
        review: `${input.productName} terasa lebih meyakinkan karena penawaran dan manfaatnya langsung jelas.`,
      },
    ],
    pricing: {
      priceText: input.price,
      callToActionText: `Pesan ${input.productName} sekarang`,
      guarantee: input.usp,
    },
  };
}
