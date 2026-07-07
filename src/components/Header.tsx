import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-mbtDark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="leading-tight">
          <p className="font-display text-lg font-black uppercase tracking-wide text-mbtYellow sm:text-xl">
            MBT
          </p>
          <p className="-mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
            Poppys Ventersdorp
          </p>
        </div>

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
