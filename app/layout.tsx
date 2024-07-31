import type { Metadata } from "next";
import siteMetadata from "@/app/data/siteMetadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import SectionContainer from "@/components/SectionContainer";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "UCSB Data Science Club",
  description: "Data Science Club at UCSB",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
          <SectionContainer>
            <div className="flex flex-col justify-between min-h-screen">
              <Header />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </SectionContainer>
        </div>
      </body>
    </html>
  );
}
