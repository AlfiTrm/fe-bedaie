const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const LEGACY_SUMOPOD_BASE_URL = "https://api.sumopod.com/v1";
const DEFAULT_SUMOPOD_BASE_URL = "https://ai.sumopod.com/v1";

function normalizeSumopodBaseUrl(value: string) {
  const trimmed = trimTrailingSlash(value);

  if (trimmed === LEGACY_SUMOPOD_BASE_URL) {
    return DEFAULT_SUMOPOD_BASE_URL;
  }

  return trimmed;
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getLaravelApiBaseUrl(): string {
  return trimTrailingSlash(requireEnv("NEXT_PUBLIC_API_BASE_URL"));
}

export function getSumopodConfig() {
  const baseUrl = normalizeSumopodBaseUrl(
    process.env.SUMOPOD_API_BASE_URL?.trim() || DEFAULT_SUMOPOD_BASE_URL,
  );

  return {
    apiKey: requireEnv("SUMOPOD_API_KEY"),
    baseUrl,
    model: process.env.SUMOPOD_MODEL?.trim() || "deepseek-v4-flash",
  };
}
