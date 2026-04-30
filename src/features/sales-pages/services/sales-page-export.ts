import { buildSalesPagePreviewModel } from "./sales-page-preview-model.ts";
import type { SalesPageRecord } from "@/src/types/sales-page";

function slugifyProductName(productName: string) {
  const slug = productName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "sales-page";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getThemePalette(theme: string) {
  switch (theme) {
    case "clean-coral":
      return {
        accent: "#fb923c",
        accentStrong: "#c2410c",
        accentSoft: "#fff7ed",
        accentText: "#9a3412",
      };
    case "clean-gold":
      return {
        accent: "#facc15",
        accentStrong: "#a16207",
        accentSoft: "#fefce8",
        accentText: "#854d0e",
      };
    case "clean-forest":
      return {
        accent: "#4ade80",
        accentStrong: "#166534",
        accentSoft: "#f0fdf4",
        accentText: "#166534",
      };
    case "clean-ocean":
      return {
        accent: "#38bdf8",
        accentStrong: "#0369a1",
        accentSoft: "#f0f9ff",
        accentText: "#075985",
      };
    default:
      return {
        accent: "#334155",
        accentStrong: "#111827",
        accentSoft: "#f8fafc",
        accentText: "#0f172a",
      };
  }
}

function renderExportIcon(
  name:
    | "storefront"
    | "location"
    | "shield"
    | "spark"
    | "layout"
    | "briefcase"
    | "check"
    | "building"
    | "badge"
    | "chevron",
) {
  switch (name) {
    case "storefront":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10.5V18a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 18v-7.5" />
          <path d="M3.5 8.5 5 4.5h14l1.5 4a2.5 2.5 0 0 1-2.34 3.38H5.84A2.5 2.5 0 0 1 3.5 8.5Z" />
          <path d="M9 19.5v-4.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.25" />
        </svg>
      `;
    case "location":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20.25s6-4.5 6-10.25a6 6 0 1 0-12 0c0 5.75 6 10.25 6 10.25Z" />
          <circle cx="12" cy="10" r="2.25" />
        </svg>
      `;
    case "shield":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3.75 5.25 6v5.14c0 4.61 2.85 7.85 6.75 9.11 3.9-1.26 6.75-4.5 6.75-9.11V6L12 3.75Z" />
          <path d="m9.5 12 1.75 1.75L14.75 10" />
        </svg>
      `;
    case "spark":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3 1.65 4.35L18 9l-4.35 1.65L12 15l-1.65-4.35L6 9l4.35-1.65L12 3Z" />
          <path d="m18.5 15.5.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
        </svg>
      `;
    case "layout":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M10.5 5v14M10.5 10h9.5" />
        </svg>
      `;
    case "briefcase":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="7" width="16" height="11" rx="2.5" />
          <path d="M9 7V5.75A1.75 1.75 0 0 1 10.75 4h2.5A1.75 1.75 0 0 1 15 5.75V7" />
          <path d="M4 11.5h16" />
        </svg>
      `;
    case "check":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="m8.75 12.25 2.25 2.25 4.5-4.75" />
        </svg>
      `;
    case "building":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 20V6.75A1.75 1.75 0 0 1 7.75 5h8.5A1.75 1.75 0 0 1 18 6.75V20" />
          <path d="M4 20h16" />
          <path d="M9 8.5h1.5M13.5 8.5H15M9 12h1.5M13.5 12H15M10.5 20v-3h3v3" />
        </svg>
      `;
    case "badge":
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="9.25" r="4.25" />
          <path d="m9.5 13 1.25 6 1.25-2 1.25 2 1.25-6" />
        </svg>
      `;
    case "chevron":
    default:
      return `
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      `;
  }
}

function getFeatureIconName(index: number) {
  const iconNames = ["layout", "briefcase", "location", "check", "building", "shield"] as const;

  return iconNames[index % iconNames.length];
}

export function buildSalesPageExportFilename(productName: string) {
  return `${slugifyProductName(productName)}.html`;
}

export function normalizeExportHtmlDocument(html: string) {
  const trimmed = html.trim();

  if (/<!doctype html>/i.test(trimmed)) {
    return trimmed;
  }

  return `<!DOCTYPE html>\n${trimmed}`;
}

export function buildSalesPageExportHtml(record: SalesPageRecord) {
  const palette = getThemePalette(record.theme);
  const preview = buildSalesPagePreviewModel(record);

  const sectionsHtml = `
    <section class="hero section">
      <div class="hero-halo"></div>
      <div class="hero-surface">
        <div class="hero-icons">
          <span class="hero-icon">${renderExportIcon("storefront")}</span>
          <span class="hero-icon">${renderExportIcon("location")}</span>
          <span class="hero-icon">${renderExportIcon("shield")}</span>
        </div>
        <p class="eyebrow">${escapeHtml(record.productName)}</p>
        <h1 class="hero-title">
          ${preview.headline.shouldHighlight ? `${escapeHtml(preview.headline.baseHeadline)} <span class="accent-text">${escapeHtml(preview.headline.highlightedHeadline)}</span>` : escapeHtml(record.aiOutput.hero.headline)}
        </h1>
        <p class="hero-subtitle">${escapeHtml(record.aiOutput.hero.subheadline)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#cta">${escapeHtml(record.aiOutput.pricing.callToActionText)}</a>
          <a class="button button-secondary" href="#features">Lihat spesifikasi</a>
        </div>
      </div>
    </section>

    <section class="section pain-section">
      <div class="accent-panel">
      <div class="section-heading">
        <h2>Masalah yang sering bikin keputusan tertunda.</h2>
        <p>Ketika nilai utama tidak terasa cepat, minat beli biasanya turun sebelum calon pembeli masuk ke penawaran.</p>
      </div>
      <div class="three-grid">
        ${preview.painPoints
          .map(
            (item) => `
              <article class="card card-light">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="muted">${escapeHtml(item.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      </div>
    </section>

    <section class="section benefits-section">
      <div class="section-heading center">
        <h2>Solusi dan manfaat yang langsung terasa.</h2>
        <p>Setelah masalahnya jelas, bagian ini menunjukkan bagaimana penawaranmu membantu menyelesaikannya.</p>
      </div>
      <div class="three-grid">
        ${preview.benefits
          .map(
            (benefit) => `
              <article class="card">
                <div class="badge-icon">${renderExportIcon("spark")}</div>
                <h3 class="accent-text">${escapeHtml(benefit.title)}</h3>
                <p class="muted">${escapeHtml(benefit.description)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section id="features" class="section features-section">
      <div class="section-soft">
      <div class="section-heading center">
        <h2>Fitur dan spesifikasi yang mendukung keputusan.</h2>
      </div>
      <div class="price-band">
        <strong>${escapeHtml(record.aiOutput.pricing.priceText)}</strong>
        <span>${escapeHtml(record.aiOutput.pricing.guarantee)}</span>
      </div>
      <div class="three-grid">
        ${preview.features
          .map(
            (feature, index) => `
              <article class="card">
                <div class="badge-icon">${renderExportIcon(getFeatureIconName(index))}</div>
                <p class="feature-text">${escapeHtml(feature)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      </div>
    </section>

    <section class="section social-section">
      <div class="section-heading center">
        <h2>Bukti sosial yang menjaga momentum.</h2>
      </div>
      <div class="social-row">
        ${preview.socialProof
          .map(
            (proof) => `
              <blockquote class="social-card">
                <p>${escapeHtml(proof.review)}</p>
                <footer>${escapeHtml(proof.name)}</footer>
              </blockquote>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="section faq-section">
      <div class="section-heading center">
        <h2>FAQ yang paling sering ditanyakan.</h2>
        <p>Bagian ini membantu menjawab pertanyaan umum sebelum calon pembeli masuk ke CTA terakhir.</p>
      </div>
      <div class="faq-stack">
        ${preview.faqs
          .map(
            (item, index) => `
              <article class="faq-card">
                <button
                  class="faq-toggle"
                  type="button"
                  aria-expanded="${index === 0 ? "true" : "false"}"
                >
                  <span>${escapeHtml(item.question)}</span>
                  <span class="faq-chevron" aria-hidden="true">${renderExportIcon("chevron")}</span>
                </button>
                <div class="faq-answer" data-open="${index === 0 ? "true" : "false"}">
                  <div class="faq-answer-inner">
                    <p class="muted">${escapeHtml(item.answer)}</p>
                  </div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section id="cta" class="section cta-section">
      <div class="cta-panel">
        <div class="cta-copy">
          <h2>Tutup keputusan dengan langkah yang terasa jelas.</h2>
          <p>${escapeHtml(record.aiOutput.hero.subheadline)}</p>
          <small>${escapeHtml(record.aiOutput.pricing.guarantee)}</small>
          <div class="hero-actions">
            <a class="button button-secondary on-accent" href="#consultation">${escapeHtml(record.aiOutput.pricing.callToActionText)}</a>
            <a class="button button-ghost" href="#consultation">Minta brosur</a>
          </div>
        </div>
        <div class="cta-motifs">
          <div class="motif-card">
            <div class="motif-icon">${renderExportIcon("building")}</div>
            <strong>Unit komersial</strong>
            <span>Tampil profesional</span>
          </div>
          <div class="motif-card offset">
            <div class="motif-icon">${renderExportIcon("location")}</div>
            <strong>Lokasi kuat</strong>
            <span>Mudah dijangkau</span>
          </div>
          <div class="motif-card offset-more">
            <div class="motif-icon">${renderExportIcon("badge")}</div>
            <strong>Lebih aman</strong>
            <span>Jaminan lebih jelas</span>
          </div>
        </div>
      </div>
    </section>

    <section id="consultation" class="section consultation-section">
      <div class="section-soft">
      <div class="section-heading center">
        <h2>Konsultasi gratis</h2>
        <p>Tinggalkan kontak dan tim kami akan menghubungi Anda untuk detail penawaran.</p>
      </div>
      <form class="consult-form">
        <input type="text" placeholder="Nama lengkap" />
        <input type="tel" placeholder="Nomor telepon" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Tulis kebutuhan atau pertanyaan Anda"></textarea>
        <button type="button" class="button button-primary wide">Kirim permintaan</button>
      </form>
      </div>
    </section>
  `;

  return normalizeExportHtmlDocument(`
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(record.productName)}</title>
        <style>
          :root {
            --bg: #f8fafc;
            --surface: #ffffff;
            --soft: ${palette.accentSoft};
            --accent: ${palette.accent};
            --accent-strong: ${palette.accentStrong};
            --accent-text: ${palette.accentText};
            --text: #0f172a;
            --muted: #475569;
            --border: rgba(15, 23, 42, 0.08);
            --shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
          }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            margin: 0;
            background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,1));
            color: var(--text);
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          }
          a { text-decoration: none; color: inherit; }
          .page {
            width: min(1280px, calc(100% - 40px));
            margin: 0 auto;
            padding: 24px 0 52px;
          }
          .section { position: relative; padding: 56px 0; }
          .section-soft { background: var(--soft); border-radius: 40px; padding: 56px 24px; }
          .hero {
            padding-top: 0;
          }
          .hero-halo {
            position: absolute;
            left: 50%;
            top: 5rem;
            width: 18rem;
            height: 18rem;
            transform: translateX(-50%);
            border-radius: 999px;
            background: radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%);
            filter: blur(48px);
            pointer-events: none;
          }
          .hero-surface {
            min-height: calc(100vh - 110px);
            border: 1px solid var(--border);
            border-radius: 46px;
            background: var(--surface);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 56px 28px;
            box-shadow: var(--shadow);
            position: relative;
          }
          .hero-icons, .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
          .hero-icon, .badge-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 1px solid var(--border);
            background: #fff;
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
          }
          .hero-icon svg, .badge-icon svg, .faq-chevron svg, .motif-icon svg {
            width: 20px;
            height: 20px;
          }
          .eyebrow {
            margin: 22px 0 0;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: .12em;
            color: #64748b;
            font-weight: 600;
          }
          .hero-title {
            margin: 18px auto 0;
            max-width: 980px;
            font-size: clamp(2.7rem, 8vw, 5.4rem);
            line-height: .95;
            letter-spacing: -.08em;
          }
          .hero-subtitle {
            max-width: 760px;
            margin: 20px auto 0;
            font-size: 1.05rem;
            line-height: 1.9;
            color: var(--muted);
          }
          .accent-text { color: var(--accent-text); }
          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            padding: 0 22px;
            border-radius: 999px;
            font-weight: 700;
            border: 1px solid transparent;
          }
          .button-primary { background: var(--accent-strong); color: white; }
          .button-secondary { background: white; color: var(--text); border-color: rgba(15,23,42,.08); }
          .button-secondary.on-accent { border-color: rgba(255,255,255,.18); }
          .button-ghost { border-color: rgba(255,255,255,.22); color: white; }
          .button.wide { width: 100%; }
          .pain-section,
          .benefits-section,
          .features-section,
          .social-section {
            border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          }
          .cta-section,
          .consultation-section {
            border-top: 1px solid rgba(15, 23, 42, 0.08);
          }
          .accent-panel {
            background: linear-gradient(160deg, var(--accent), var(--accent-strong));
            color: white;
            border-radius: 44px;
            padding: 32px 24px;
          }
          .section-heading h2 {
            margin: 0;
            font-size: clamp(2rem, 5vw, 3.2rem);
            line-height: 1;
            letter-spacing: -.06em;
          }
          .section-heading p {
            margin: 12px 0 0;
            max-width: 720px;
            font-size: .98rem;
            line-height: 1.9;
            opacity: .92;
          }
          .section-heading.center { text-align: center; }
          .section-heading.center p { margin-left: auto; margin-right: auto; color: var(--muted); opacity: 1; }
          .three-grid {
            display: grid;
            gap: 16px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin-top: 24px;
          }
          .card, .faq-card, .social-card {
            border: 1px solid var(--border);
            border-radius: 30px;
            background: rgba(255,255,255,.95);
            padding: 22px;
            box-shadow: var(--shadow);
          }
          .card-light {
            border-color: rgba(255,255,255,.16);
            background: rgba(255,255,255,.96);
          }
          .card h3, .faq-card h3 {
            margin: 0;
            font-size: 1.3rem;
            letter-spacing: -.04em;
          }
          .card p, .faq-card p, .social-card p { margin: 12px 0 0; }
          .muted { color: var(--muted); line-height: 1.8; font-size: .95rem; }
          .price-band {
            margin: 24px auto 0;
            max-width: 760px;
            border-radius: 28px;
            padding: 22px;
            text-align: center;
            background: linear-gradient(160deg, var(--accent), var(--accent-strong));
            color: white;
          }
          .price-band strong {
            display: block;
            font-size: 1.55rem;
            letter-spacing: -.05em;
          }
          .price-band span {
            display: block;
            margin-top: 10px;
            opacity: .9;
            line-height: 1.8;
            font-size: .95rem;
          }
          .feature-text { margin: 12px 0 0; font-weight: 600; line-height: 1.7; }
          .social-row {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding: 2px 2px 8px;
            margin-top: 24px;
          }
          .social-card {
            width: 264px;
            min-height: 216px;
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 27px;
            padding: 20px;
          }
          .social-card footer {
            margin-top: 16px;
            font-size: .8rem;
            font-weight: 700;
          }
          .faq-stack {
            display: grid;
            gap: 16px;
            max-width: 880px;
            margin: 24px auto 0;
          }
          .faq-card {
            overflow: hidden;
            padding: 0;
          }
          .faq-toggle {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 22px;
            border: 0;
            background: transparent;
            text-align: left;
            color: var(--text);
            font: inherit;
            cursor: pointer;
          }
          .faq-toggle span:first-child {
            font-size: 1.3rem;
            font-weight: 600;
            letter-spacing: -.04em;
          }
          .faq-chevron {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 999px;
            border: 1px solid var(--border);
            background: #f8fafc;
            transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease;
          }
          .faq-toggle[aria-expanded="true"] .faq-chevron {
            transform: rotate(180deg);
            background: white;
          }
          .faq-answer {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transform: translateY(-6px);
            transition:
              max-height 320ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 220ms ease,
              transform 220ms ease;
          }
          .faq-answer[data-open="true"] {
            max-height: 14rem;
            opacity: 1;
            transform: translateY(0);
          }
          .faq-answer-inner {
            padding: 0 22px 22px;
          }
          .faq-answer-inner p {
            margin: 0;
            padding-top: 14px;
            border-top: 1px solid var(--border);
          }
          .cta-panel {
            border-radius: 44px;
            padding: 34px 24px;
            color: white;
            background: linear-gradient(160deg, var(--accent), var(--accent-strong));
            display: grid;
            gap: 24px;
            grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr);
            align-items: center;
          }
          .cta-copy h2 {
            margin: 0;
            font-size: clamp(2rem, 4vw, 3.4rem);
            line-height: 1;
            letter-spacing: -.06em;
          }
          .cta-copy p {
            margin: 16px 0 0;
            line-height: 1.9;
            opacity: .94;
          }
          .cta-copy small {
            display: block;
            margin-top: 12px;
            font-size: .92rem;
            opacity: .78;
          }
          .cta-motifs { position: relative; }
          .motif-card {
            border: 1px solid rgba(255,255,255,.16);
            background: rgba(255,255,255,.12);
            border-radius: 28px;
            padding: 18px 20px;
            backdrop-filter: blur(12px);
          }
          .motif-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,.16);
            background: rgba(255,255,255,.14);
            margin-bottom: 14px;
          }
          .motif-card + .motif-card { margin-top: 12px; }
          .motif-card.offset { margin-left: 16px; }
          .motif-card.offset-more { margin-left: 32px; }
          .motif-card strong, .motif-card span { display: block; }
          .motif-card span { margin-top: 6px; opacity: .82; font-size: .92rem; }
          .consult-form {
            max-width: 760px;
            margin: 24px auto 0;
            display: grid;
            gap: 14px;
            border: 1px solid var(--border);
            background: white;
            border-radius: 42px;
            padding: 32px;
            box-shadow: var(--shadow);
          }
          .consult-form input, .consult-form textarea {
            width: 100%;
            border: 1px solid var(--border);
            background: #f8fafc;
            border-radius: 18px;
            padding: 14px 16px;
            font: inherit;
            color: var(--text);
          }
          .consult-form textarea {
            min-height: 132px;
            resize: vertical;
          }
          @media (max-width: 960px) {
            .three-grid,
            .cta-panel { grid-template-columns: 1fr; }
            .motif-card.offset, .motif-card.offset-more { margin-left: 0; }
          }
          @media (max-width: 640px) {
            .page { width: min(100% - 24px, 1180px); }
            .section { padding: 44px 0; }
            .hero-surface, .section-soft, .accent-panel, .cta-panel { border-radius: 28px; }
            .card, .faq-card, .social-card, .consult-form { border-radius: 22px; }
            .hero-title { font-size: 3.2rem; }
            .hero-subtitle { font-size: 1rem; }
          }
        </style>
      </head>
      <body>
        <main class="page">
          ${sectionsHtml}
        </main>
        <script>
          document.querySelectorAll(".faq-card").forEach((card) => {
            const button = card.querySelector(".faq-toggle");
            const answer = card.querySelector(".faq-answer");

            if (!button || !answer) return;

            button.addEventListener("click", () => {
              const isOpen = button.getAttribute("aria-expanded") === "true";
              button.setAttribute("aria-expanded", String(!isOpen));
              answer.setAttribute("data-open", String(!isOpen));
            });
          });
        </script>
      </body>
    </html>
  `);
}
