"use client";

interface PreviewConsultationSectionProps {
  ctaClassName: string;
}

export function PreviewConsultationSection({
  ctaClassName,
}: PreviewConsultationSectionProps) {
  return (
    <section id="consultation" className="border-t border-slate-200 bg-slate-50 py-14">
      <div className="space-y-10">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.1rem] sm:leading-[1.02]">
            Konsultasi gratis
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">
            Tinggalkan kontak dan tim kami akan menghubungi Anda untuk detail
            penawaran.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-[2.6rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama lengkap"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="Nomor telepon"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
            />
            <textarea
              placeholder="Tulis kebutuhan atau pertanyaan Anda"
              className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:bg-white"
            />
            <button
              type="button"
              className={`${ctaClassName} inline-flex w-full items-center justify-center`}
            >
              Kirim permintaan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
