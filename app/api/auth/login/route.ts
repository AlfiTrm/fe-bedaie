import { NextResponse } from "next/server";

import { loginWithLaravel } from "@/src/features/auth/services/auth-api.server";
import { validateLoginInput } from "@/src/features/auth/services/auth-form";
import { setSessionToken } from "@/src/features/auth/services/auth-session.server";
import { ApiError } from "@/src/lib/http/api-error";

export async function POST(request: Request) {
  try {
    const payload = validateLoginInput(await request.json());
    const session = await loginWithLaravel(payload);
    await setSessionToken(session.token);

    return NextResponse.json({ user: session.user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Login gagal. Silakan coba lagi.";
    const status = error instanceof ApiError ? error.status : 400;

    return NextResponse.json({ message }, { status });
  }
}
