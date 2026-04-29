import "server-only";

import type { AuthUser } from "@/src/types/sales-page";
import { getLaravelApiBaseUrl } from "@/src/lib/env";
import { createJsonHeaders, requestJson } from "@/src/lib/http/fetch-json";
import { ApiError } from "@/src/lib/http/api-error";
import {
  extractAuthSession,
  getApiErrorMessage,
} from "@/src/features/auth/services/auth-contracts.ts";
import { getSessionToken } from "@/src/features/auth/services/auth-session.server";
import { isObject } from "@/src/lib/utils/object.ts";

function buildLaravelUrl(path: string) {
  return `${getLaravelApiBaseUrl()}${path}`;
}

function normalizeAuthUser(payload: unknown): AuthUser {
  if (isObject(payload) && isObject(payload.user)) {
    return extractAuthSession({
      token: "temporary",
      user: payload.user,
    }).user;
  }

  return extractAuthSession({
    token: "temporary",
    user: payload,
  }).user;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  passwordConfirmation: string;
}

export async function loginWithLaravel(payload: LoginPayload) {
  const response = await requestJson<unknown>(buildLaravelUrl("/api/login"), {
    method: "POST",
    headers: createJsonHeaders(),
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
    cache: "no-store",
    fallbackMessage: "Login gagal. Periksa kembali email dan password.",
  });

  return extractAuthSession(response);
}

export async function registerWithLaravel(payload: RegisterPayload) {
  const response = await requestJson<unknown>(buildLaravelUrl("/api/register"), {
    method: "POST",
    headers: createJsonHeaders(),
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    }),
    cache: "no-store",
    fallbackMessage: "Registrasi gagal. Pastikan data yang diisi valid.",
  });

  return extractAuthSession(response);
}

export async function getCurrentUserByToken(token: string) {
  const response = await requestJson<unknown>(buildLaravelUrl("/api/user"), {
    method: "GET",
    headers: createJsonHeaders(token),
    cache: "no-store",
    fallbackMessage: "Sesi login tidak valid.",
  });

  return normalizeAuthUser(response);
}

export async function getOptionalCurrentUser() {
  const token = await getSessionToken();

  if (!token) {
    return null;
  }

  try {
    return await getCurrentUserByToken(token);
  } catch {
    return null;
  }
}

export async function requireCurrentUser() {
  const token = await getSessionToken();

  if (!token) {
    throw new ApiError("Anda harus login untuk mengakses halaman ini.", 401);
  }

  return {
    token,
    user: await getCurrentUserByToken(token),
  };
}

export async function logoutFromLaravel(token: string) {
  try {
    await requestJson<unknown>(buildLaravelUrl("/api/logout"), {
      method: "POST",
      headers: createJsonHeaders(token),
      cache: "no-store",
      fallbackMessage: "Logout gagal.",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw new ApiError(getApiErrorMessage(error.details, error.message), 500);
    }

    throw error;
  }
}
