import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getActiveFuelAnnouncements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Fuel Updates",
  description:
    "Fuel price announcements and station updates from MBT Poppys Ventersdorp, Ventersdorp.",
};

export const revalidate = 21600; // safety net — admin posts revalidate this page instantly

export default async function FuelUpdatesPage() {
  const announcements = await getActiveFuelAnnouncements();

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
              Official announcements from MBT Poppys Ventersdorp — price changes, stock updates
              and station news, straight from the owner.
            </p>
          </Reveal>

          <div className="mt-14 space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-mbtYellow">
              Station Announcements
            </h2>
            {announcements.length === 0 && (
              <p className="text-white/40">No announcements right now — check back soon.</p>
            )}
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
        </div>
      </main>
      <Footer />
    </>
  );
}
