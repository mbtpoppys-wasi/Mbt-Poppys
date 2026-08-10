import { siteConfig } from "@/lib/site-config";

// lucide-react doesn't ship brand/logo icons, so these are small inline SVGs
// instead of pulling in a whole extra icon package for two icons.
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.459h-1.26c-1.243 0-1.631.771-1.631 1.562v1.878h2.777l-.444 2.91h-2.333V22c4.78-.756 8.438-4.918 8.438-9.94Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

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

        <div className="mt-6 flex items-center gap-4">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MBT Poppys Ventersdorp on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-mbtCard text-white/70 transition hover:border-mbtYellow/60 hover:text-mbtYellow"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MBT Poppys Ventersdorp on Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-mbtCard text-white/70 transition hover:border-mbtYellow/60 hover:text-mbtYellow"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex w-full flex-col items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
          <p>
            Built by{" "}
            <a
              href="https://www.signhubsa.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mbtYellow hover:underline"
            >
              SignHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
