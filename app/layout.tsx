import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import siteMetadata from "@/data/siteMetadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import SectionContainer from "@/components/SectionContainer";

const robotoConfig = Roboto({
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-space-roboto",
  preload: true,
  fallback: ["sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UCSB Data Science Club",
  description: "Data Science Club at UCSB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${robotoConfig.variable} scroll-smooth`}
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
