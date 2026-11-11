import Link from "./Link";
import siteMetadata from "@/app/data/siteMetadata";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bleed mt-16 overflow-hidden bg-navy-deep text-paper">
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6 xl:max-w-6xl xl:px-0">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span aria-hidden="true" className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full border border-paper" />
              <span className="h-3 w-3 rounded-full bg-gold" />
            </span>
            <div className="-ml-3 mt-6">
              <SocialLinks dark />
            </div>
          </div>
          <div className="space-y-2 font-mono text-[12px] text-paper/70 md:text-right">
            <div className="flex gap-2 md:justify-end">
              <span>{`© ${new Date().getFullYear()}`}</span>
              <Link href="/" className="hover:text-paper">
                {siteMetadata.title}
              </Link>
            </div>
            <div>
              <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog" className="hover:text-paper">
                Built with Nextjs and Tailwind.
              </Link>
            </div>
            <p>Made with 🧡 + ☕</p>
            <div>
              <Link
                href="https://github.com/data-science-ucsb/ds-website-new"
                className="text-gold hover:text-gold-soft"
              >
                The code for this website is open source.
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* oversized wordmark, reflection-style footer reveal */}
      <div
        aria-hidden="true"
        className="select-none whitespace-nowrap px-2 pb-2 text-center font-serif text-[17.5vw] font-light leading-[0.8] tracking-[-0.05em] text-paper/[0.07]"
      >
        DS @ UCSB
      </div>
    </footer>
  );
}
