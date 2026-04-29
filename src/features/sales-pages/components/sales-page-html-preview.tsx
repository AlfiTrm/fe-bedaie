"use client";

import { useSalesPagePreviewFrame } from "@/src/features/sales-pages/hooks/use-sales-page-preview-frame";

interface SalesPageHtmlPreviewProps {
  html: string;
}

export function SalesPageHtmlPreview({ html }: SalesPageHtmlPreviewProps) {
  const { frameHeight, srcDoc } = useSalesPagePreviewFrame(html);

  return (
    <iframe
      title="Generated sales page preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts allow-forms"
      className="block w-full rounded-[2rem] border border-slate-200 bg-white"
      style={{ height: `${frameHeight}px` }}
    />
  );
}
