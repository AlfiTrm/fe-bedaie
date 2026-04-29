"use client";

import { useState } from "react";

import { useRegisterSubmit } from "@/src/features/auth/hooks/use-auth-submit";

export function RegisterForm() {
  const { defaultValues, errorMessage, isPending, submit } =
    useRegisterSubmit();
  const [name, setName] = useState(defaultValues.name);
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);
  const [passwordConfirmation, setPasswordConfirmation] = useState(
    defaultValues.passwordConfirmation,
  );

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        submit({ name, email, password, passwordConfirmation });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/92" htmlFor="name">
          Nama
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="field-input"
          placeholder="Nama lengkap"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/92" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          className="field-input"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/92" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            className="field-input"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-white/92"
            htmlFor="password-confirmation"
          >
            Konfirmasi
          </label>
          <input
            id="password-confirmation"
            type="password"
            autoComplete="new-password"
            className="field-input"
            placeholder="Ulangi password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
          />
        </div>
      </div>
      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-100">
          {errorMessage}
        </p>
      ) : null}
      <button
        className="primary-button w-full"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
