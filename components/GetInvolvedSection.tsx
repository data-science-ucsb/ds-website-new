"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PillButton from "./PillButton";

export default function GetInvolvedSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cards = [
    {
      title: "General Meetings & Workshops",
      description:
        "Join our weekly meetings and hands-on workshops every Tuesday to learn industry relevant topics and meet new people!",
      image: "/images/Workshop2024.jpg",
      link: "/meetings",
    },
    {
      title: "Project Showcase",
      description:
        "Present your projects or explore others' work with industry professionals and executives in attendance.",
      image: "/images/showcase1.jpg",
      link: "/projects",
    },
    {
      title: "Data + Software Career Fair",
      description:
        "Connect with recruiters and industry pros looking for software engineering and data talent this Fall 2025.",
      image: "/images/showcase2.jpg",
      link: "/register",
    },
    {
      title: "Datathon",
      description:
        "Compete to solve real-world problems using data science, with industry executives and big tech companies in attendance!",
      image: "/images/datathon1.jpg",
      link: "https://datathon.datascienceucsb.org",
    },
  ];

  const stats = [
    { label: "Workshops", value: 100, duration: 3 },
    { label: "Members", value: 600, duration: 3.5 },
    { label: "Datathon Attendees", value: 200, duration: 3 },
    { label: "Projects", value: 100, duration: 3 },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // While the meetings dialog is open: lock page scroll, move focus into the
  // dialog, keep Tab inside it, close on Escape, and hand focus back after.
  useEffect(() => {
    if (!isModalOpen) return;
    const trigger = triggerRef.current;
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // the dialog is in the DOM by now: focus its Close button (the last control)
    focusables().at(-1)?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [isModalOpen]);

  const cardInner = (card: (typeof cards)[number], i: number) => (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-card">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
        <h3 className="font-serif text-[1.85rem] font-light leading-tight tracking-[-0.02em] text-ink">
          {card.title}
        </h3>
        <p className="mt-3 text-[15px] leading-6 text-ink-muted">{card.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-navy">
          Learn More
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </>
  );

  const cardClass =
    "group flex h-full flex-col rounded-[1.75rem] border border-paper-line bg-white/60 p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(18,28,64,0.35)]";

  return (
    <section className="py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1] tracking-display">
            Get Involved
          </h2>
        </div>
        <p className="max-w-md text-lg leading-7 text-ink-muted">
          Explore how you can participate in UCSB Data Science. Whether you want
          to compete, connect, or create — there’s something for you.
        </p>
      </div>

      {/* stats */}
      <div
        ref={ref}
        className="mt-14 grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-paper-line bg-paper-line lg:grid-cols-4"
        style={{ gap: 1 }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-paper p-6 sm:p-8">
            <div className="flex items-baseline font-serif text-[clamp(2.75rem,5vw,4.25rem)] font-light leading-none tracking-display text-navy tabular-nums">
              {inView ? (
                <CountUp start={0} end={stat.value} duration={stat.duration} />
              ) : (
                "0"
              )}
              <span className="text-gold-deep">+</span>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PillButton href="/calendar">View Upcoming Events</PillButton>
      </div>

      <div id="four-cards-section" className="mt-16 grid scroll-mt-28 grid-cols-1 gap-5 md:grid-cols-2">
        {cards.map((card, index) =>
          card.title === "General Meetings & Workshops" ? (
            <button
              key={card.title}
              ref={triggerRef}
              type="button"
              aria-haspopup="dialog"
              onClick={() => setIsModalOpen(true)}
              className={cardClass}
            >
              {cardInner(card, index)}
            </button>
          ) : (
            <a
              key={card.title}
              href={card.link}
              target={card.title === "Datathon" ? "_blank" : "_self"}
              rel={card.title === "Datathon" ? "noopener noreferrer" : undefined}
              className={cardClass}
            >
              {cardInner(card, index)}
            </a>
          )
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="meetings-title"
          >
            <div
              className="absolute inset-0 bg-navy-deep/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              ref={dialogRef}
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 max-w-lg rounded-[1.75rem] border border-paper-line bg-paper p-8 shadow-2xl"
            >
              <h3 id="meetings-title" className="font-serif text-3xl font-light tracking-[-0.02em] text-ink">
                General Meetings & Workshops
              </h3>
              <p className="mt-4 leading-7 text-ink-muted">
                Join our weekly meetings and hands-on workshops every Tuesday at 6 PM in TD-W 1701. Follow our{" "}
                <Link
                  href={"https://www.instagram.com/datascienceucsb?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}
                  className="text-navy underline decoration-gold decoration-2 underline-offset-4"
                >
                  Instagram page
                </Link>{" "}
                (@datascienceucsb) to stay updated!
              </p>
              <div className="mt-8">
                <PillButton onClick={() => setIsModalOpen(false)}>Close</PillButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
