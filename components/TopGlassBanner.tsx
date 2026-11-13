"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  label?: string; // fixed lead-in, e.g. "General Meeting"
  messages: string[]; // rotated one at a time
  intervalMs?: number;
  href?: string; // optional CTA link
  cta?: string;
  className?: string;
};

/** Announcement pill: a fixed label plus messages that rotate in place. */
export default function TopGlassBanner({
  label,
  messages,
  intervalMs = 3200,
  href,
  cta = "Learn more",
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (messages.length < 2 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), intervalMs);
    return () => clearInterval(id);
  }, [messages.length, intervalMs, paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`group inline-flex max-w-full items-center gap-3 rounded-full border border-paper-line bg-white/70 py-1.5 pl-3 pr-4 text-sm transition hover:border-navy/30 hover:bg-white ${className}`}
    >
      {label && (
        <span className="flex shrink-0 items-center gap-2 border-r border-paper-line pr-3 font-medium text-navy">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          {label}
        </span>
      )}

      {/* rotating message; fixed height clips the slide */}
      <span className="relative block h-5 overflow-hidden text-left text-ink-muted" aria-live="polite">
        {/* invisible sizer: widest message reserves the width so the pill doesn't jump */}
        <span className="invisible block h-0 overflow-hidden whitespace-nowrap" aria-hidden="true">
          {messages.reduce((a, b) => (b.length > a.length ? b : a), "")}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            className="block whitespace-nowrap leading-5"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {href && (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 font-medium text-navy"
        >
          {cta}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
