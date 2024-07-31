import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import Image from "next/image";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="">
              <Image
                src={"/logo.png"}
                alt="Data Science Logo" 
                width={100}
                height={100}
              ></Image>
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            link.title === "Register" ? 
            <Link
              key={link.title}
              href={"https://forms.gle/GDa5qd5JNwhftGur8"}
              className="hidden font-medium text-gray-900  sm:block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >{link.title}</Link> 
            : 
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900  sm:block"
            >{link.title}</Link>)
            )}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
