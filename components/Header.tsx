"use client";

import siteMetadata from "@/app/data/siteMetadata";
import headerNavLinks from "@/app/data/headerNavLinks";
import Link from "./Link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
import { aboutOptions, resourceOptions } from "@/app/data/dropdown";

const Header = () => {
  const store = headerNavLinks.find((l) => l.title === "Store");
  const register = headerNavLinks.find((l) => l.title === "Register");

  return (
    <header className="sticky top-3 z-40 mt-3 flex items-center justify-between py-2 pl-4 pr-2">
      {/* blur lives on its own layer so the fixed mobile menu isn't trapped by backdrop-filter */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-2xl border border-paper-line/70 bg-paper/80 backdrop-blur-xl" />
      <Link href="/" aria-label={siteMetadata.headerTitle} className="shrink-0">
        <Image
          src={"/images/datasciencelogotransparent.png"}
          alt="Data Science Logo"
          width={200}
          height={45}
          className="h-auto w-[170px] sm:w-[200px]"
          priority
        />
      </Link>
      <div className="flex items-center gap-1">
        <Dropdown primaryName={resourceOptions.primaryName} pages={resourceOptions.pages} />
        <Dropdown primaryName={aboutOptions.primaryName} pages={aboutOptions.pages} />

        {store && (
          <Link
            href={store.href}
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/5 sm:block"
          >
            Store
          </Link>
        )}

        {register && (
          <Link
            href={register.href}
            className="group ml-2 hidden items-center gap-3 rounded-full bg-navy py-2.5 pl-4 pr-3.5 text-sm font-medium text-paper transition hover:bg-navy-deep active:scale-[0.98] sm:inline-flex"
          >
            Join Us!
            <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform group-hover:scale-[1.8]" />
          </Link>
        )}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
