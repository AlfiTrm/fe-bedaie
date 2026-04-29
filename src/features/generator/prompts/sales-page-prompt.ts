import type { GeneratorInput } from "@/src/types/sales-page";

export function buildSalesPagePrompt(input: GeneratorInput) {
  return [
    "You are a conversion-focused sales copywriter.",
    "Return valid JSON only, with no markdown fences or extra commentary.",
    "Follow this exact shape:",
    JSON.stringify(
      {
        hero: {
          headline: "string",
          subheadline: "string",
        },
        benefits: [
          {
            title: "string",
            description: "string",
          },
        ],
        features: ["string"],
        social_proof: [
          {
            name: "string",
            review: "string",
          },
        ],
        pricing: {
          price_text: "string",
          call_to_action_text: "string",
          guarantee: "string",
        },
      },
      null,
      2,
    ),
    "",
    "Product data:",
    `- Product name: ${input.productName}`,
    `- Description: ${input.description}`,
    `- Key features: ${input.keyFeatures.join(", ")}`,
    `- Target audience: ${input.targetAudience}`,
    `- Price: ${input.price}`,
    `- USP: ${input.usp}`,
    "",
    "Rules:",
    "- Use persuasive but credible Indonesian copy.",
    "- Keep the headline sharp and benefit-led.",
    "- Provide at least 2 benefits.",
    "- Provide at least 2 features.",
    "- Provide at least 1 social proof entry.",
    "- Pricing CTA should feel strong and action-oriented.",
  ].join("\n");
}
