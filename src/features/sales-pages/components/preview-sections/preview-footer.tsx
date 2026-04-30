"use client";

interface PreviewFooterProps {
  productName: string;
  subheadline: string;
  priceText: string;
  guarantee: string;
}

export function PreviewFooter({
  productName,
  subheadline,
  priceText,
  guarantee,
}: PreviewFooterProps) {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-950">{productName}</p>
          <p className="max-w-xl text-sm leading-7 text-slate-500">
            {subheadline}
          </p>
        </div>
        <div className="text-sm leading-7 text-slate-500 sm:text-right">
          <p>{priceText}</p>
          <p>{guarantee}</p>
        </div>
      </div>
    </footer>
  );
}
