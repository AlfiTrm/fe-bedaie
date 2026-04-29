import { AuthShell } from "@/src/features/auth/components/auth-shell";
import { LoginForm } from "@/src/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to your workspace."
      description="Masuk untuk membuka dashboard dan lanjutkan flow inti technical test dari satu product surface yang rapi."
      footerText="Belum punya akun?"
      footerLinkLabel="Create one here"
      footerHref="/register"
    >
      <LoginForm />
    </AuthShell>
  );
}
