export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function toCleanString(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`Field "${fieldName}" harus berupa string.`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(`Field "${fieldName}" wajib diisi.`);
  }

  return trimmed;
}

export function toOptionalCleanString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed || null;
}
