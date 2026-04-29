"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { logoutClient } from "@/src/features/auth/services/auth-client";

export function useLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function logout() {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        await logoutClient();
        router.replace("/login");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Logout gagal. Silakan coba lagi.",
        );
      }
    });
  }

  return {
    errorMessage,
    isPending,
    logout,
  };
}
