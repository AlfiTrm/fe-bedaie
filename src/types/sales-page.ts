export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
}

export interface GeneratorInput {
  productName: string;
  description: string;
  keyFeatures: string[];
  targetAudience: string;
  price: string;
  usp: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface SocialProofItem {
  name: string;
  review: string;
}

export interface AiOutput {
  hero: {
    headline: string;
    subheadline: string;
  };
  benefits: BenefitItem[];
  features: string[];
  socialProof: SocialProofItem[];
  pricing: {
    priceText: string;
    callToActionText: string;
    guarantee: string;
  };
  previewHtml?: string;
}

export interface SalesPageRecord {
  id: number;
  productName: string;
  rawInput: GeneratorInput;
  aiOutput: AiOutput;
  theme: string;
  createdAt: string;
}
