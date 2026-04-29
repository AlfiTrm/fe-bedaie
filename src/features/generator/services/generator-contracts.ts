import type { AiOutput, GeneratorInput } from "../../../types/sales-page.ts";
import {
  asArray,
  isObject,
  toCleanString,
} from "../../../lib/utils/object.ts";

const MAX_COPY_WORDS = 30;

function limitWords(value: string, maxWords = MAX_COPY_WORDS): string {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return value.trim();
  }

  return words.slice(0, maxWords).join(" ");
}

function normalizeOptionalPreviewHtml(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeStringList(values: unknown, fieldName: string): string[] {
  const cleaned = asArray(values)
    .map((value) =>
      typeof value === "string" ? limitWords(value.trim()) : "",
    )
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
        title: limitWords(toCleanString(item.title, "benefits.title")),
        description: limitWords(
          toCleanString(item.description, "benefits.description"),
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
        name: limitWords(toCleanString(item.name, "social_proof.name")),
        review: limitWords(
          toCleanString(item.review, "social_proof.review"),
        ),
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
      headline: limitWords(
        toCleanString(rawValue.hero.headline, "hero.headline"),
      ),
      subheadline: limitWords(
        toCleanString(rawValue.hero.subheadline, "hero.subheadline"),
      ),
    },
    benefits: normalizeBenefits(rawValue.benefits),
    features: normalizeStringList(rawValue.features, "features"),
    socialProof: normalizeSocialProof(
      rawValue.social_proof ?? rawValue.socialProof,
    ),
    pricing: {
      priceText: limitWords(
        toCleanString(
          rawValue.pricing.price_text ?? rawValue.pricing.priceText,
          "pricing.price_text",
        ),
      ),
      callToActionText: limitWords(
        toCleanString(
          rawValue.pricing.call_to_action_text ??
            rawValue.pricing.callToActionText,
          "pricing.call_to_action_text",
        ),
      ),
      guarantee: limitWords(
        toCleanString(rawValue.pricing.guarantee, "pricing.guarantee"),
      ),
    },
    previewHtml: normalizeOptionalPreviewHtml(
      rawValue.preview_html ?? rawValue.previewHtml,
    ),
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

  if (isObject(parsed) && isObject(parsed.ai_output)) {
    const aiOutput = normalizeAiOutput(parsed.ai_output);
    const previewHtml = normalizeOptionalPreviewHtml(
      parsed.preview_html ?? parsed.previewHtml,
    );

    return {
      ...aiOutput,
      previewHtml: previewHtml ?? aiOutput.previewHtml,
    };
  }

  return normalizeAiOutput(parsed);
}

export function buildFallbackAiOutput(input: GeneratorInput): AiOutput {
  return {
    hero: {
      headline: `${input.price} untuk ${input.productName} yang lebih relevan buat ${input.targetAudience}`,
      subheadline: `${input.description} Diperkuat oleh ${input.usp.toLowerCase()} agar pengunjung punya alasan jelas untuk bertindak sekarang.`,
    },
    benefits: [
      {
        title: "Lebih mudah melihat nilai utamanya",
        description: `Penawaran ${input.productName} langsung diarahkan ke kebutuhan ${input.targetAudience.toLowerCase()} tanpa copy yang berputar-putar.`,
      },
      {
        title: "Benefit dan alasan beli lebih cepat tertangkap",
        description: `Halaman ini menonjolkan USP, harga ${input.price}, dan manfaat yang paling terasa supaya keputusan terasa lebih ringan.`,
      },
      {
        title: "CTA punya konteks yang lebih meyakinkan",
        description: `Ajakan beli diperkuat oleh deskripsi produk, fitur utama, dan jaminan yang mendukung konversi.`,
      },
    ],
    features: input.keyFeatures.length >= 3
      ? input.keyFeatures
      : [...input.keyFeatures, input.usp, `Harga ${input.price}`].filter(
          (value, index, values) => values.indexOf(value) === index,
        ),
    socialProof: [
      {
        name: "Pembeli awal",
        review: `${input.productName} terasa lebih menarik karena manfaat, harga, dan ajakan belinya langsung jelas sejak awal.`,
      },
      {
        name: "Pengunjung landing page",
        review: `Format halamannya membantu saya cepat paham kenapa penawaran ini layak dipertimbangkan tanpa harus baca terlalu lama.`,
      },
    ],
    pricing: {
      priceText: input.price,
      callToActionText: `Dapatkan ${input.productName} sekarang`,
      guarantee: input.usp,
    },
  };
}
