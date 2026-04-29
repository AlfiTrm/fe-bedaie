export function DashboardHome() {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
      <div className="panel-surface rounded-[1.75rem] p-6 sm:p-8">
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Auth layer is in place.
          </p>
          <h3 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.6rem]">
            Workspace sekarang punya session gate yang siap dipakai buat flow utama.
          </h3>
          <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-muted)] sm:text-base">
            Login, register, redirect, logout, dan protected shell sudah jalan.
            Dari sini kita tinggal menambahkan surface kerja yang lebih nyata:
            saved pages, generate form, dan preview hasil AI.
          </p>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
          {[
            {
              label: "Auth routes",
              value: "4 endpoints",
              detail: "login, register, me, logout",
            },
            {
              label: "Session storage",
              value: "httpOnly cookie",
              detail: "Bearer token tetap di server boundary",
            },
            {
              label: "Ready next",
              value: "history + generate",
              detail: "phase 3 dan 4 tinggal melanjutkan shell ini",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/8 bg-white/3 p-4"
            >
              <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
              <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-xs leading-6 text-[var(--color-text-muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="panel-surface rounded-[1.75rem] p-6">
          <p className="text-base font-semibold text-white">Current surface</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li>Register dan login lewat route handler Next.js.</li>
            <li>Cookie session disimpan aman di server layer.</li>
            <li>Guest route dan protected route sudah dipisah.</li>
          </ul>
        </div>
        <div className="panel-surface rounded-[1.75rem] p-6">
          <p className="text-base font-semibold text-white">What comes next</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li>History saved pages dan delete action.</li>
            <li>Generate form dengan DeepSeek via Sumopod.</li>
            <li>Preview full-screen yang siap didemo.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
