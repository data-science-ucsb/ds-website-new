"use client";

import siteMetadata from "@/app/data/siteMetadata";
import headerNavLinks from "@/app/data/headerNavLinks";
import Link from "./Link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { aboutOptions, resourceOptions } from "@/app/data/dropdown";

const Header = () => {

  return (
    <header className="flex items-center justify-between py-4">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="">
              <Image
                src={"/images/datasciencelogotransparent.png"}
                alt="Data Science Logo" 
                width={250} 
                height={250} 
              />
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-2 leading-5 sm:space-x-1">
          <Dropdown primaryName={resourceOptions.primaryName} pages={resourceOptions.pages}/>
          <Dropdown primaryName={aboutOptions.primaryName} pages={aboutOptions.pages} />
          {headerNavLinks
          .filter((link) => link.title === "Register")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden sm:block relative overflow-hidden font-medium text-white py-2 px-4 rounded-full bg-blue-500 group"
            >
             
              <span className="absolute inset-y-0 left-0 w-0 bg-blue-700 transition-all duration-300 ease-out group-hover:w-full" />
              <span className="relative z-10">Join Us!</span>
            </Link>
          ))}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
