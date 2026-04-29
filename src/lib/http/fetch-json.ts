import { ApiError } from "@/src/lib/http/api-error";
import { isObject, toOptionalCleanString } from "@/src/lib/utils/object.ts";

function extractErrorMessage(payload: unknown, fallback: string): string {
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

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit & { fallbackMessage?: string },
): Promise<T> {
  const response = await fetch(input, init);
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(
        payload,
        init?.fallbackMessage || "Terjadi kesalahan pada request.",
      ),
      response.status,
      payload,
    );
  }

  return payload as T;
}

export function createJsonHeaders(
  token?: string | null,
  extraHeaders?: HeadersInit,
): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
}
