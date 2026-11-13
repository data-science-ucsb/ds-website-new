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
    const id = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [messages.length, intervalMs, paused]);

  return (
    <div className={`flex justify-center ${className}`}>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={[
          "group inline-flex max-w-full items-center justify-center gap-3 sm:gap-4",
          "backdrop-blur-xl",
          "bg-gradient-to-r from-blue-500/10 to-blue-400/10",
          "border border-blue-400/20",
          "rounded-full px-4 sm:px-8 py-2.5",
          "shadow-lg shadow-blue-500/20",
          "transition-colors duration-300 hover:bg-blue-400/20",
          "text-sm",
        ].join(" ")}
      >
        {label && (
          <span className="flex shrink-0 items-center gap-2 border-r border-blue-400/30 pr-3 sm:pr-4 font-semibold text-blue-600">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            {label}
          </span>
        )}

        {/* rotating message; fixed height clips the slide */}
        <span
          className="relative block h-5 overflow-hidden text-left font-medium text-gray-700"
          aria-live="polite"
        >
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
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-blue-500 transition-colors hover:text-blue-600"
          >
            {cta}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
