import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-mbtDark py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-white/40 sm:px-6 lg:px-8">
        <p className="font-display font-bold uppercase tracking-wide text-white/70">
          {siteConfig.businessName}
        </p>
        <p>
          {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality} ·{" "}
          <a href={`tel:${siteConfig.phoneE164}`} className="hover:text-mbtYellow">
            {siteConfig.phoneDisplay}
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
        </p>
        <Link href="/admin" className="text-white/20 hover:text-white/40">
          Owner login
        </Link>
      </div>
    </footer>
  );
}
