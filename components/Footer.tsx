import Link from "./Link";
import siteMetadata from "@/app/data/siteMetadata";

export default function Footer() {
  return (
    <footer>
      <div className="mt-12 flex flex-col items-center">
        <div className="mb-3 flex space-x-4"></div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Built with Nextjs and Tailwind.
          </Link>
        </div>
        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <p>Made with 🧡 + ☕</p>
        </div>
        <div>
          <Link href="https://github.com/data-science-ucsb/ds-website-new" className="mb-2 text-sm text-blue-400">
            The code for this website is open source.
          </Link>
        </div>
        <br/>
      </div>
    </footer>
  );
}
