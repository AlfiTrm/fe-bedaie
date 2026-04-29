import { toCleanString } from "../../../lib/utils/object.ts";

export interface LoginFormInput {
  email: string;
  password: string;
}

export interface RegisterFormInput extends LoginFormInput {
  name: string;
  passwordConfirmation: string;
}

export function validateLoginInput(rawValue: unknown): LoginFormInput {
  if (!rawValue || typeof rawValue !== "object") {
    throw new Error("Data login tidak valid.");
  }

  const payload = rawValue as Record<string, unknown>;

  return {
    email: toCleanString(payload.email, "email").toLowerCase(),
    password: toCleanString(payload.password, "password"),
  };
}

export function validateRegisterInput(rawValue: unknown): RegisterFormInput {
  if (!rawValue || typeof rawValue !== "object") {
    throw new Error("Data registrasi tidak valid.");
  }

  const payload = rawValue as Record<string, unknown>;
  const password = toCleanString(payload.password, "password");
  const passwordConfirmation = toCleanString(
    payload.passwordConfirmation ?? payload.password_confirmation,
    "passwordConfirmation",
  );

  if (password !== passwordConfirmation) {
    throw new Error("Konfirmasi password tidak cocok.");
  }

  return {
    name: toCleanString(payload.name, "name"),
    email: toCleanString(payload.email, "email").toLowerCase(),
    password,
    passwordConfirmation,
  };
}
