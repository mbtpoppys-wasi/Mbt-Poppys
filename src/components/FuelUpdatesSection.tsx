import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getActiveFuelAnnouncements } from "@/lib/data";
import { getFuelNews } from "@/lib/news-feed";

export default async function FuelUpdatesSection() {
  const [announcements, news] = await Promise.all([getActiveFuelAnnouncements(), getFuelNews()]);

  const latestAnnouncement = announcements[0];
  const latestNews = news.slice(0, 2);

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Fuel <span className="text-mbtYellow">Updates</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-mbtYellow">
            Announcements and the latest South African fuel price news
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {latestAnnouncement && (
            <Reveal className="rounded-2xl border border-mbtYellow/30 bg-mbtYellow/5 p-6 text-left">
              <p className="text-white">{latestAnnouncement.message}</p>
            </Reveal>
          )}

          {latestNews.map((item, index) => (
            <Reveal key={item.link} delay={index * 60}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-mbtCard p-5 text-left transition hover:border-mbtYellow/40"
              >
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-mbtYellow">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{item.source}</p>
                </div>
                <span className="flex-shrink-0 text-white/30 transition group-hover:text-mbtYellow">
                  →
                </span>
              </a>
            </Reveal>
          ))}

          {!latestAnnouncement && latestNews.length === 0 && (
            <p className="text-center text-white/40">Check back soon for fuel updates.</p>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/fuel-updates"
            className="inline-block rounded bg-mbtYellow px-8 py-3 font-display text-xs font-black uppercase tracking-widest text-mbtDark shadow-[0_0_15px_rgba(255,222,0,0.3)] transition hover:bg-white"
          >
            View All Fuel Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
