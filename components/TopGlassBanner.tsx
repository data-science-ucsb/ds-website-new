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
  dateLabel = "Jan 08",
  message,
  cta = "Learn more",
  className = "",
}: Props) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        className={[
          // pill container
          "group inline-flex max-w-full flex-wrap items-center justify-center gap-3 sm:gap-4",
          "backdrop-blur-xl",
          "bg-gradient-to-r from-blue-500/10 to-blue-400/10",
          "border border-blue-400/20",
          "rounded-2xl sm:rounded-full px-5 sm:px-14 py-2.5 text-center",
          "shadow-lg shadow-blue-500/20",
          "transition-all duration-300 hover:bg-blue-400/20",
          "text-sm",
        ].join(" ")}
      >
        {/* center message */}
        <span className="font-medium text-gray-600">{message}</span>

        {/* right CTA */}
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-500 transition-colors"
        >
          {cta}
          <span
            aria-hidden="true"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
