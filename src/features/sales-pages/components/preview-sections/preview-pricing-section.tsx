"use client";

interface PreviewPricingSectionProps {
  priceText: string;
  guarantee: string;
  usp: string;
  audience: string;
  ctaText: string;
  ctaClassName: string;
  secondaryCtaClassName: string;
}

export function PreviewPricingSection({
  priceText,
  guarantee,
  usp,
  audience,
  ctaText,
  ctaClassName,
  secondaryCtaClassName,
}: PreviewPricingSectionProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14">
      <div className="rounded-[2.8rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-[3.2rem] sm:leading-[1.02]">
                Harga yang jelas. Alasan membeli yang lebih kuat.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                {usp}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className={`${ctaClassName} landing-button-compact inline-flex items-center justify-center`}
              >
                {ctaText}
              </button>
              <button
                type="button"
                className={`${secondaryCtaClassName} landing-button-compact inline-flex items-center justify-center`}
              >
                Minta brosur
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-sm text-slate-500">Jaminan</p>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
                  {guarantee}
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 px-5 py-5">
                <p className="text-sm text-slate-500">Cocok untuk</p>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
                  {audience}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-slate-200 bg-slate-950 px-6 py-7 text-white shadow-sm">
            <p className="text-sm tracking-[0.08em] text-white/64 uppercase">
              Penawaran mulai
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-[3.4rem] sm:leading-[1]">
              {priceText}
            </p>
            <p className="mt-5 text-sm leading-7 text-white/74">
              Siap dipertimbangkan lebih cepat dengan harga yang terang, pesan yang jelas, dan langkah lanjut yang mudah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
