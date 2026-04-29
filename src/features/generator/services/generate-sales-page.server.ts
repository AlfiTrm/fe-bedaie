import "server-only";

import type { GeneratorInput } from "@/src/types/sales-page";
import {
  buildFallbackAiOutput,
  extractAiOutputFromText,
} from "@/src/features/generator/services/generator-contracts.ts";
import { generateSalesCopyText } from "@/src/features/generator/services/sumopod.server";
import { createSalesPage } from "@/src/features/sales-pages/services/sales-pages-api.server";

export async function generateAiOutput(
  input: GeneratorInput,
  theme = "clean-midnight",
) {
  const text = await generateSalesCopyText(input, theme);

  try {
    return extractAiOutputFromText(text);
  } catch {
    return buildFallbackAiOutput(input);
  }
}

export async function generateAndSaveSalesPage(
  token: string,
  input: GeneratorInput,
  theme = "clean-midnight",
) {
  const aiOutput = await generateAiOutput(input, theme);
  return createSalesPage(token, input, aiOutput, theme);
}
