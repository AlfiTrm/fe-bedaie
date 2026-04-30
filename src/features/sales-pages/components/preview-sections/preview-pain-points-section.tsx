"use client";

interface PreviewPainPointsSectionProps {
  accentBlockClassName: string;
  painPoints: Array<{
    title: string;
    description: string;
  }>;
}

export function PreviewPainPointsSection({
  accentBlockClassName,
  painPoints,
}: PreviewPainPointsSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-10">
      <div
        className={`${accentBlockClassName} rounded-[2.8rem] px-6 py-8 sm:px-8 sm:py-10`}
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-[3.2rem] sm:leading-[1]">
              Masalah yang sering bikin keputusan tertunda.
            </h2>
            <p className="max-w-2xl text-sm leading-7 opacity-88">
              Ketika nilai utama tidak terasa cepat, minat beli biasanya turun sebelum calon pembeli masuk ke penawaran.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="landing-card landing-card-hover rounded-[1.9rem] border-white/16 px-5 py-5 text-slate-950 sm:px-6"
              >
                <div className="space-y-3">
                  <p className="text-xl font-semibold tracking-[-0.05em] text-slate-950">
                    {item.title}
                  </p>
                  <p className="text-sm leading-7 text-slate-700/90">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
