import { NextResponse } from "next/server";

import {
  getSessionToken,
  clearSessionToken,
} from "@/src/features/auth/services/auth-session.server";
import { logoutFromLaravel } from "@/src/features/auth/services/auth-api.server";

export async function POST() {
  const token = await getSessionToken();

  if (token) {
    try {
      await logoutFromLaravel(token);
    } finally {
      await clearSessionToken();
    }
  } else {
    await clearSessionToken();
  }

  return NextResponse.json({ ok: true });
}
