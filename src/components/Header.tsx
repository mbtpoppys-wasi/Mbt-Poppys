"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const NAV_LINKS = [
  { href: "#fuel-prices", label: "Live Pump Prices" },
  { href: "#buzz-cafe", label: "BUZZ Café" },
  { href: "#services", label: "Our Services" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mbtDark/95 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-mbtYellow text-mbtDark transition duration-300 group-hover:rotate-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-black uppercase tracking-tighter text-mbtYellow sm:text-2xl">
              MBT
            </p>
            <p className="-mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Poppys Ventersdorp
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold tracking-wide md:flex">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display transition ${
                index === 0 ? "text-mbtYellow hover:text-white" : "text-white/80 hover:text-mbtYellow"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="rounded bg-mbtYellow px-5 py-2.5 font-display text-xs font-black uppercase tracking-wider text-mbtDark shadow-[0_0_15px_rgba(255,222,0,0.3)] transition hover:scale-105 hover:bg-white"
          >
            Call Station
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="p-2 text-mbtYellow focus:outline-none md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-b border-white/10 bg-mbtDark md:hidden">
          <div className="flex flex-col gap-1 px-4 pb-6 pt-2 text-sm font-bold uppercase tracking-wider">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/5 py-3 ${index === 0 ? "text-mbtYellow" : "text-white/80"}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="mt-2 rounded bg-mbtYellow py-3 text-center font-black text-mbtDark"
            >
              Call Station
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
