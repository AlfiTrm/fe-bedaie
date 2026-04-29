import { AuthShell } from "@/src/features/auth/components/auth-shell";
import { RegisterForm } from "@/src/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create a new workspace account."
      description="Registrasi akan langsung mengaktifkan session, jadi setelah submit berhasil kamu langsung masuk ke dashboard yang sudah diproteksi."
      footerText="Sudah punya akun?"
      footerLinkLabel="Sign in instead"
      footerHref="/login"
    >
      <RegisterForm />
    </AuthShell>
  );
}
