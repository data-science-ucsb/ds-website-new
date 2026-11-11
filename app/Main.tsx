"use client";

import { useState, useEffect } from "react";
import SponsorsSection from "@/components/SponsorsSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import SocialLinks from "@/components/SocialLinks";
import AlternatingSection from "@/components/AlternatingSection";
import TitleAnimation from "@/components/TitleAnimation";
import TopGlassBanner from "@/components/TopGlassBanner";
import HeroBoard from "@/components/hero-boards/HeroBoard";
import PillButton from "@/components/PillButton";
// import Data4GoodModal from "@/components/Data4GoodModal";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Data4Good Modal */}
      {/* <Data4GoodModal /> Commented out but can be brought back next year - April 2026 */}

      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed left-0 top-0 z-50 h-[3px] bg-gold"
      />

      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-5.5rem)] items-center py-12">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-14">
        <div className="flex-1">
          <div className="enter">
            <TopGlassBanner
              href="https://tinyurl.com/ds-career-fair-26-27"
              message="Sign up for our Fall 2026 Career Fair!"
              cta="Sign up"
            />
          </div>

          <h1 className="enter enter-1 mt-8 font-serif text-[clamp(2.75rem,6.4vw,5rem)] font-light leading-[0.98] tracking-display text-ink">
            Welcome to Data Science Club{" "}
            <span className="text-navy">@&nbsp;UCSB!</span>
          </h1>

          <p className="enter enter-2 mt-6 min-h-[3.5rem] max-w-md text-lg leading-7 text-ink-muted">
            <TitleAnimation />
          </p>

          <div className="enter enter-3 mt-8 flex flex-wrap gap-3">
            <PillButton href="https://forms.gle/cBc4iRwiSMDfjfpf9">Join Us!</PillButton>
            <PillButton
              variant="outline"
              onClick={() => {
                document
                  .querySelector("#mission-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Learn More
            </PillButton>
          </div>

          <div className="enter enter-4 mt-8 -ml-3">
            <SocialLinks />
          </div>
        </div>

        {/* absolutely filled on lg so the text column alone sets the height */}
        <div className="enter enter-2 relative w-full lg:w-[44%]">
          <div className="lg:absolute lg:inset-0">
            <HeroBoard />
          </div>
        </div>
        </div>
      </section>

      {/* Mission: full-bleed navy band */}
      <section
        id="mission-section"
        className="bleed relative flex min-h-[90svh] scroll-mt-0 items-center overflow-hidden bg-black"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://archive.org/download/video1_20250717/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <span aria-hidden="true" className="mb-10 flex items-center gap-1">
            <span className="h-3.5 w-3.5 rounded-full border border-paper" />
            <span className="h-3.5 w-3.5 rounded-full bg-gold" />
          </span>
          <h2 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.05] tracking-display text-paper">
            Our Mission
          </h2>
          <p className="mt-8 max-w-3xl font-serif text-[clamp(1.25rem,2.2vw,1.65rem)] font-light leading-snug text-paper">
            We provide Gauchos with the resources and community to learn, share,
            and create in the realm of data science.{" "}
            <span className="text-paper/70">
              Our vision is to be the platform through which companies and
              faculty researchers seek the best data science talent UCSB has to
              offer, as well as one that empowers students looking to earn this
              distinction.
            </span>
          </p>
        </div>
      </section>

      <AlternatingSection />

      <GetInvolvedSection />

      <SponsorsSection />
    </>
  );
}

