import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-mbtDark px-4 pb-8 pt-16 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <h2 className="font-display text-2xl font-black uppercase tracking-widest text-white sm:text-3xl">
          MBT Poppys <span className="text-mbtYellow">Ventersdorp</span>
        </h2>

        <div className="mt-6 flex flex-col items-center gap-3 rounded-full border border-white/10 bg-mbtCard px-6 py-3 sm:flex-row">
          <span className="flex items-center gap-2 text-sm font-medium text-white/70">
            <span className="text-mbtYellow">📍</span>
            {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="text-sm font-semibold text-mbtYellow hover:underline"
          >
            {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex w-full flex-col items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-widest text-white/40 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <Link href="/admin" className="text-white/20 hover:text-white/40">
            Owner login
          </Link>
        </div>
      </div>
    </footer>
  );
}
