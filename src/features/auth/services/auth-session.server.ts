import "server-only";

import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "bedaie_session";

const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function setSessionToken(token: string) {
  (await cookies()).set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
}

export async function clearSessionToken() {
  (await cookies()).set(SESSION_COOKIE_NAME, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
}
