import Link from "next/link";

interface AuthShellProps {
  title: string;
  description: string;
  footerText: string;
  footerLinkLabel: string;
  footerHref: string;
  children: React.ReactNode;
}

export function AuthShell({
  title,
  description,
  footerText,
  footerLinkLabel,
  footerHref,
  children,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background-elevated)]">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.15fr_0.85fr]">
        <section className="hidden min-h-screen flex-col justify-between border-r border-white/8 px-10 py-12 lg:flex">
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[0.82rem] font-semibold tracking-tight text-white">
                  AI Sales Page Generator
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Write less. Generate cleaner. Ship faster.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                  Masuk ke workspace untuk mengelola auth, generation pipeline,
                  dan persistence dalam satu product surface yang tenang dan
                  siap dipakai demo.
                </p>
              </div>
            </div>
            <div className="grid gap-3 border-t border-white/8 pt-6 text-sm text-[var(--color-text-muted)] sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-white">Server-side AI</p>
                <p>Prompt dan call provider berjalan di layer Next.js.</p>
              </div>
              <div className="space-y-1">
                <p className="text-white">Secure auth</p>
                <p>Bearer token tinggal di cookie httpOnly.</p>
              </div>
              <div className="space-y-1">
                <p className="text-white">Ready to expand</p>
                <p>History, generate, dan preview tinggal melanjutkan shell ini.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex min-h-screen items-center bg-[rgba(255,255,255,0.015)] px-6 py-8 sm:px-8 sm:py-10 lg:min-h-screen lg:px-10 lg:py-12">
          <div className="mx-auto w-full max-w-md space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                  {description}
                </p>
              </div>
              {children}
              <p className="border-t border-white/8 pt-5 text-sm leading-7 text-[var(--color-text-muted)]">
                {footerText}{" "}
                <Link
                  href={footerHref}
                  className="font-semibold text-white transition hover:text-[var(--color-accent-soft)]"
                >
                  {footerLinkLabel}
                </Link>
              </p>
          </div>
        </section>
        </div>
    </div>
  );
}
