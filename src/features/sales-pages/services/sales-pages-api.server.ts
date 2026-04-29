import "server-only";

import type { AiOutput, GeneratorInput } from "@/src/types/sales-page";
import { getLaravelApiBaseUrl } from "@/src/lib/env";
import { createJsonHeaders, requestJson } from "@/src/lib/http/fetch-json";
import {
  normalizeSalesPageList,
  normalizeSalesPageRecord,
} from "@/src/features/sales-pages/services/sales-page-contracts.ts";

function buildLaravelUrl(path: string) {
  return `${getLaravelApiBaseUrl()}${path}`;
}

function serializeAiOutput(aiOutput: AiOutput) {
  return {
    hero: aiOutput.hero,
    benefits: aiOutput.benefits,
    features: aiOutput.features,
    social_proof: aiOutput.socialProof,
    pricing: {
      price_text: aiOutput.pricing.priceText,
      call_to_action_text: aiOutput.pricing.callToActionText,
      guarantee: aiOutput.pricing.guarantee,
    },
  };
}

function serializeRawInput(input: GeneratorInput) {
  return {
    description: input.description,
    key_features: input.keyFeatures,
    target_audience: input.targetAudience,
    price: input.price,
    usp: input.usp,
  };
}

function unwrapRecord(payload: unknown) {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: unknown }).data;
  }

  return payload;
}

export async function listSalesPages(token: string) {
  const response = await requestJson<unknown>(buildLaravelUrl("/api/sales-pages"), {
    method: "GET",
    headers: createJsonHeaders(token),
    cache: "no-store",
    fallbackMessage: "Gagal mengambil history sales page.",
  });

  return normalizeSalesPageList(response);
}

export async function getSalesPageById(token: string, id: string | number) {
  const response = await requestJson<unknown>(
    buildLaravelUrl(`/api/sales-pages/${id}`),
    {
      method: "GET",
      headers: createJsonHeaders(token),
      cache: "no-store",
      fallbackMessage: "Gagal mengambil detail sales page.",
    },
  );

  return normalizeSalesPageRecord(unwrapRecord(response));
}

export async function createSalesPage(
  token: string,
  input: GeneratorInput,
  aiOutput: AiOutput,
  theme = "dark-luxury",
) {
  const response = await requestJson<unknown>(buildLaravelUrl("/api/sales-pages"), {
    method: "POST",
    headers: createJsonHeaders(token),
    body: JSON.stringify({
      product_name: input.productName,
      raw_input: serializeRawInput(input),
      ai_output: serializeAiOutput(aiOutput),
      theme,
    }),
    cache: "no-store",
    fallbackMessage: "Gagal menyimpan sales page.",
  });

  return normalizeSalesPageRecord(unwrapRecord(response));
}

export async function deleteSalesPage(token: string, id: string | number) {
  await requestJson<unknown>(buildLaravelUrl(`/api/sales-pages/${id}`), {
    method: "DELETE",
    headers: createJsonHeaders(token),
    cache: "no-store",
    fallbackMessage: "Gagal menghapus sales page.",
  });
}
