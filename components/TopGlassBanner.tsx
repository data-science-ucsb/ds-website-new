"use client";
import Link from "next/link";

type Props = {
  href: string;
  dateLabel?: string; // e.g. "Jan 08"
  message: string; // middle text
  cta?: string; // right side link label
  className?: string;
};

export default function TopGlassBanner({
  href,
  message,
  cta = "Learn more",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-paper-line bg-white/70 py-1.5 pl-2 pr-4 text-sm transition hover:border-navy/30 hover:bg-white ${className}`}
    >
      <span aria-hidden="true" className="ml-1.5 h-2 w-2 rounded-full bg-gold" />
      <span className="text-ink-muted">{message}</span>
      <span className="inline-flex items-center gap-1 font-medium text-navy">
        {cta}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </Link>
  );
}
