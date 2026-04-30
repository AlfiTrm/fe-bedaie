import type { BenefitItem, SalesPageRecord, SocialProofItem } from "@/src/types/sales-page";

export interface SalesPagePreviewPainPoint {
  title: string;
  description: string;
}

export interface SalesPagePreviewFaqItem {
  question: string;
  answer: string;
}

export interface SalesPagePreviewHeadlineParts {
  shouldHighlight: boolean;
  baseHeadline: string;
  highlightedHeadline: string;
}

export interface SalesPagePreviewModel {
  headline: SalesPagePreviewHeadlineParts;
  benefits: BenefitItem[];
  features: string[];
  socialProof: SocialProofItem[];
  painPoints: SalesPagePreviewPainPoint[];
  faqs: SalesPagePreviewFaqItem[];
}

function limitWords(value: string, maxWords: number) {
  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return value.trim();
  }

  return `${words.slice(0, maxWords).join(" ")}...`;
}

function buildHeadlineParts(headline: string): SalesPagePreviewHeadlineParts {
  const headlineWords = headline.trim().split(/\s+/).filter(Boolean);
  const highlightCount = headlineWords.length >= 6 ? 2 : 1;
  const shouldHighlight = headlineWords.length >= 3;

  return {
    shouldHighlight,
    baseHeadline: shouldHighlight
      ? headlineWords.slice(0, -highlightCount).join(" ")
      : headline,
    highlightedHeadline: shouldHighlight
      ? headlineWords.slice(-highlightCount).join(" ")
      : "",
  };
}

export function buildSalesPagePreviewModel(
  record: SalesPageRecord,
): SalesPagePreviewModel {
  return {
    headline: buildHeadlineParts(record.aiOutput.hero.headline),
    benefits: record.aiOutput.benefits.slice(0, 3),
    features: record.aiOutput.features.slice(0, 6),
    socialProof: [
      ...record.aiOutput.socialProof,
      {
        name: "Owner bisnis lokal",
        review: `${record.productName} terasa lebih meyakinkan karena nilai utamanya langsung jelas sejak bagian awal halaman.`,
      },
      {
        name: "Calon investor",
        review: `Presentasinya membantu ${record.rawInput.targetAudience.toLowerCase()} memahami penawaran ini lebih cepat tanpa harus menebak-nebak detail penting.`,
      },
    ].slice(0, 4),
    painPoints: [
      {
        title: "Nilai Kabur",
        description: limitWords(
          `Penawaran sering belum terasa cukup relevan untuk ${record.rawInput.targetAudience.toLowerCase()}.`,
          20,
        ),
      },
      {
        title: "Detail Tersebar",
        description: limitWords(
          "Detail penting sering tersebar, jadi keputusan terasa lebih lama dari yang seharusnya.",
          20,
        ),
      },
      {
        title: "Keputusan Lambat",
        description: limitWords(
          "Tanpa manfaat, bukti, dan jaminan yang jelas, minat mudah turun sebelum sampai ke CTA.",
          20,
        ),
      },
    ],
    faqs: [
      {
        question: "Apakah penawaran ini cocok untuk saya?",
        answer: `Penawaran ini dirancang untuk ${record.rawInput.targetAudience.toLowerCase()} yang ingin melihat nilai utama dengan cepat dan jelas.`,
      },
      {
        question: "Apa keuntungan utamanya?",
        answer: record.rawInput.usp,
      },
      {
        question: "Apa yang membuatnya lebih aman dipertimbangkan?",
        answer: record.aiOutput.pricing.guarantee,
      },
    ],
  };
}
