import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#fuel-prices", label: "Live Pump Prices" },
  { href: "#buzz-cafe", label: "BUZZ Café" },
  { href: "#services", label: "Our Services" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mbtDark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mbtYellow text-mbtDark shadow-led-glow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
              <path strokeLinecap="round" strokeWidth={1.8} d="M12 8v5" />
              <circle cx="12" cy="16" r="0.75" fill="currentColor" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-black uppercase tracking-wide text-mbtYellow sm:text-xl">
              MBT
            </p>
            <p className="-mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
              Poppys Ventersdorp
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-bold uppercase tracking-wide text-white/80 transition hover:text-mbtYellow"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${siteConfig.phoneE164}`}
          className="rounded-full bg-mbtYellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-mbtDark shadow-led-glow transition hover:brightness-95 sm:px-6 sm:py-2.5"
        >
          Call Station
        </a>
      </div>
    </header>
  );
}
