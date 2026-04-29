"use client";

import { useState } from "react";

import { useLoginSubmit } from "@/src/features/auth/hooks/use-auth-submit";

export function LoginForm() {
  const { defaultValues, errorMessage, isPending, submit } = useLoginSubmit();
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        submit({ email, password });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/92" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="field-input"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/92" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="field-input"
          placeholder="Masukkan password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
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
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
