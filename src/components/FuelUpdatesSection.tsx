import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getActiveFuelAnnouncements } from "@/lib/data";

export default async function FuelUpdatesSection() {
  const announcements = await getActiveFuelAnnouncements();
  const latest = announcements.slice(0, 3);

  return (
    <section className="border-t border-white/10 bg-[#0a0a0a] px-4 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Fuel <span className="text-mbtYellow">Updates</span>
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-mbtYellow">
            Announcements from MBT Poppys Ventersdorp
          </p>
        </Reveal>

        <div className="mt-12 space-y-3">
          {latest.map((announcement, index) => (
            <Reveal
              key={announcement.id}
              delay={index * 60}
              className="rounded-2xl border border-mbtYellow/30 bg-mbtYellow/5 p-6 text-left"
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

          {latest.length === 0 && (
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
