const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

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
  const baseUrl = trimTrailingSlash(
    process.env.SUMOPOD_API_BASE_URL?.trim() || "https://api.sumopod.com/v1",
  );

  return {
    apiKey: requireEnv("SUMOPOD_API_KEY"),
    baseUrl,
    model: process.env.SUMOPOD_MODEL?.trim() || "deepseek-v4-flash",
  };
}
