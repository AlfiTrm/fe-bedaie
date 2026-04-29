"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import type {
  LoginFormInput,
  RegisterFormInput,
} from "@/src/features/auth/services/auth-form";
import {
  validateLoginInput,
  validateRegisterInput,
} from "@/src/features/auth/services/auth-form";
import {
  loginClient,
  registerClient,
} from "@/src/features/auth/services/auth-client";

interface AuthFormState {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const loginDefaults: AuthFormState = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

export function useLoginSubmit() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function submit(input: LoginFormInput) {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const payload = validateLoginInput(input);
        await loginClient(payload);
        router.replace("/dashboard");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Login gagal. Silakan coba lagi.",
        );
      }
    });
  }

  return {
    defaultValues: loginDefaults,
    errorMessage,
    isPending,
    submit,
  };
}

export function useRegisterSubmit() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function submit(input: RegisterFormInput) {
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const payload = validateRegisterInput(input);
        await registerClient(payload);
        router.replace("/dashboard");
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Registrasi gagal. Silakan coba lagi.",
        );
      }
    });
  }

  return {
    defaultValues: loginDefaults,
    errorMessage,
    isPending,
    submit,
  };
}
