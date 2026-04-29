import type { SalesPageRecord } from "../../../types/sales-page.ts";
import {
  normalizeAiOutput,
  validateGeneratorInput,
} from "../../generator/services/generator-contracts.ts";
import {
  asArray,
  isObject,
  toCleanString,
} from "../../../lib/utils/object.ts";

function createSummaryFallbackRecord(
  rawValue: Record<string, unknown>,
): SalesPageRecord {
  const productName = toCleanString(rawValue.product_name, "product_name");

  return {
    id: Number(rawValue.id),
    productName,
    rawInput: {
      productName,
      description: "Summary item",
      keyFeatures: ["Summary item"],
      targetAudience: "Summary item",
      price: "Summary item",
      usp: "Summary item",
    },
    aiOutput: {
      hero: {
        headline: productName,
        subheadline: "Summary item",
      },
      benefits: [
        {
          title: "Summary item",
          description: "Summary item",
        },
      ],
      features: ["Summary item"],
      socialProof: [
        {
          name: "Summary item",
          review: "Summary item",
        },
      ],
      pricing: {
        priceText: "Summary item",
        callToActionText: "Summary item",
        guarantee: "Summary item",
      },
    },
    theme: toCleanString(rawValue.theme ?? "dark-luxury", "theme"),
    createdAt: toCleanString(rawValue.created_at, "created_at"),
  };
}

export function normalizeSalesPageRecord(rawValue: unknown): SalesPageRecord {
  if (!isObject(rawValue)) {
    throw new Error("Sales page record tidak valid.");
  }

  const id = Number(rawValue.id);

  if (!Number.isFinite(id)) {
    throw new Error("Sales page id tidak valid.");
  }

  return {
    id,
    productName: toCleanString(rawValue.product_name, "product_name"),
    rawInput: validateGeneratorInput({
      ...(isObject(rawValue.raw_input) ? rawValue.raw_input : {}),
      product_name: rawValue.product_name,
    }),
    aiOutput: normalizeAiOutput(rawValue.ai_output),
    theme: toCleanString(rawValue.theme ?? "dark-luxury", "theme"),
    createdAt: toCleanString(rawValue.created_at, "created_at"),
  };
}

export function normalizeSalesPageList(rawValue: unknown): SalesPageRecord[] {
  const normalizeListItem = (item: unknown) => {
    if (!isObject(item)) {
      throw new Error("Sales page record tidak valid.");
    }

    if ("raw_input" in item && "ai_output" in item) {
      return normalizeSalesPageRecord(item);
    }

    return createSummaryFallbackRecord(item);
  };

  if (Array.isArray(rawValue)) {
    return rawValue.map(normalizeListItem);
  }

  if (isObject(rawValue)) {
    const items = asArray(rawValue.data);
    return items.map(normalizeListItem);
  }

  throw new Error("List sales page tidak valid.");
}
