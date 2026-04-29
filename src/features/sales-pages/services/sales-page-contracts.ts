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
  if (Array.isArray(rawValue)) {
    return rawValue.map(normalizeSalesPageRecord);
  }

  if (isObject(rawValue)) {
    const items = asArray(rawValue.data);
    return items.map(normalizeSalesPageRecord);
  }

  throw new Error("List sales page tidak valid.");
}
