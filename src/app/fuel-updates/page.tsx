import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getActiveFuelAnnouncements } from "@/lib/data";
import { getFuelNews } from "@/lib/news-feed";

export const metadata: Metadata = {
  title: "Fuel Updates",
  description:
    "Fuel price announcements and the latest South African fuel news for MBT Poppys Ventersdorp, Ventersdorp.",
};

export const revalidate = 21600; // 6h, matches the news feed cache

export default async function FuelUpdatesPage() {
  const [announcements, news] = await Promise.all([getActiveFuelAnnouncements(), getFuelNews()]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-mbtDark px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <span className="inline-block rounded-full border border-mbtYellow/30 bg-mbtYellow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-mbtYellow">
              Stay Informed
            </span>
            <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Fuel <span className="text-mbtYellow text-shadow-led">Updates</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Announcements from MBT Poppys Ventersdorp, plus the latest fuel price news from
              South African sources.
            </p>
          </Reveal>

          {announcements.length > 0 && (
            <div className="mt-14 space-y-4">
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-mbtYellow">
                Station Announcements
              </h2>
              {announcements.map((announcement, index) => (
                <Reveal
                  key={announcement.id}
                  delay={index * 60}
                  className="rounded-2xl border border-mbtYellow/30 bg-mbtYellow/5 p-6"
                >
                  <p className="text-white">{announcement.message}</p>
                  <p className="mt-2 text-xs text-white/40">
                    Posted{" "}
                    {new Date(announcement.created_at).toLocaleDateString("en-ZA", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-14">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-mbtYellow">
              Latest Fuel News
            </h2>
            <div className="mt-4 space-y-3">
              {news.length === 0 && (
                <p className="text-white/40">No fuel news articles available right now.</p>
              )}
              {news.map((item, index) => (
                <Reveal key={item.link} delay={index * 50}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-mbtCard p-5 transition hover:border-mbtYellow/40"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-mbtYellow">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {item.source} ·{" "}
                        {new Date(item.pubDate).toLocaleDateString("en-ZA", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-white/30 transition group-hover:text-mbtYellow">
                      →
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
