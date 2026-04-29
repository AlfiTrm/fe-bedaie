import type { AuthUser } from "../../../types/sales-page.ts";
import {
  isObject,
  toOptionalCleanString,
} from "../../../lib/utils/object.ts";

function normalizeUser(rawUser: unknown): AuthUser {
  if (!isObject(rawUser)) {
    throw new Error("Payload user tidak valid.");
  }

  const { id, name, email } = rawUser;

  if ((typeof id !== "string" && typeof id !== "number") || !name || !email) {
    throw new Error("Data user tidak lengkap.");
  }

  return {
    id,
    name: String(name).trim(),
    email: String(email).trim(),
  };
}

export function extractAuthSession(payload: unknown): {
  token: string;
  user: AuthUser;
} {
  if (!isObject(payload)) {
    throw new Error("Payload autentikasi tidak valid.");
  }

  const directToken = toOptionalCleanString(payload.token);
  const nestedData = isObject(payload.data) ? payload.data : null;
  const accessToken = toOptionalCleanString(payload.access_token);
  const nestedToken =
    nestedData === null
      ? null
      : toOptionalCleanString(nestedData.token) ??
        toOptionalCleanString(nestedData.access_token);

  const token = directToken ?? accessToken ?? nestedToken;

  if (!token) {
    throw new Error("Token autentikasi tidak ditemukan.");
  }

  const userCandidate =
    payload.user ??
    (nestedData && "user" in nestedData ? nestedData.user : null) ??
    payload.data;

  return {
    token,
    user: normalizeUser(userCandidate),
  };
}

export function getApiErrorMessage(
  payload: unknown,
  fallback = "Terjadi kesalahan. Silakan coba lagi.",
): string {
  if (!isObject(payload)) {
    return fallback;
  }

  const directMessage = toOptionalCleanString(payload.message);

  if (directMessage) {
    return directMessage;
  }

  const directError = toOptionalCleanString(payload.error);

  if (directError) {
    return directError;
  }

  if (isObject(payload.errors)) {
    for (const value of Object.values(payload.errors)) {
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }

      if (Array.isArray(value)) {
        const firstString = value.find(
          (item) => typeof item === "string" && item.trim(),
        );

        if (typeof firstString === "string") {
          return firstString.trim();
        }
      }
    }
  }

  return fallback;
}
