import "server-only";

import type { GeneratorInput } from "@/src/types/sales-page";
import { getSumopodConfig } from "@/src/lib/env";
import { ApiError } from "@/src/lib/http/api-error";
import { requestJson } from "@/src/lib/http/fetch-json";
import { isObject } from "@/src/lib/utils/object.ts";
import { buildSalesPagePrompt } from "@/src/features/generator/prompts/sales-page-prompt";

function extractTextFromContent(content: unknown): string | null {
  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const text = content
      .map((item) => {
        if (!isObject(item)) {
          return "";
        }

        if (typeof item.text === "string") {
          return item.text;
        }

        if (item.type === "output_text" && typeof item.text === "string") {
          return item.text;
        }

        return "";
      })
      .filter(Boolean)
      .join("\n")
      .trim();

    return text || null;
  }

  return null;
}

export async function generateSalesCopyText(
  input: GeneratorInput,
  theme = "clean-midnight",
) {
  const config = getSumopodConfig();
  let response: unknown;

  try {
    response = await requestJson<unknown>(
      `${config.baseUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          temperature: 0.8,
          response_format: {
            type: "json_object",
          },
          messages: [
            {
              role: "system",
              content:
                "You are an expert Indonesian sales page copywriter and HTML landing page builder. Write for a polished landing page, not a dashboard preview. Return JSON only.",
            },
            {
              role: "user",
              content: buildSalesPagePrompt(input, theme),
            },
          ],
        }),
        cache: "no-store",
        fallbackMessage: "Gagal menghasilkan sales page dari AI provider.",
      },
    );
  } catch (error) {
    if (error instanceof TypeError && error.message === "fetch failed") {
      throw new ApiError(
        `Gagal menghubungi Sumopod. Cek SUMOPOD_API_BASE_URL dan API key. Base URL aktif saat ini: ${config.baseUrl}`,
        502,
      );
    }

    throw error;
  }

  if (
    !isObject(response) ||
    !Array.isArray(response.choices) ||
    !isObject(response.choices[0]) ||
    !isObject(response.choices[0].message)
  ) {
    throw new ApiError("Format respons AI provider tidak dikenali.", 502, response);
  }

  const content = extractTextFromContent(response.choices[0].message.content);

  if (!content) {
    throw new ApiError("AI provider tidak mengembalikan konten.", 502, response);
  }

  return content;
}
