"use client";

import { useEffect, useState } from "react";
import { isOpen24Hours, isOpenNow } from "@/lib/hours";

export default function OpenNowIndicator() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const label =
    open === null
      ? "Checking Hours…"
      : open
        ? isOpen24Hours()
          ? "Open 24 Hours • 7 Days A Week"
          : "Open Now"
        : "Currently Closed";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded px-4 py-2 font-display text-xs font-black uppercase tracking-[0.25em] shadow-xl sm:text-sm ${
        open === false ? "bg-red-500/90 text-white" : "animate-pulse bg-mbtYellow text-mbtDark"
      }`}
      role="status"
      aria-live="polite"
    >
      {open !== false && (
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mbtDark opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mbtDark" />
        </span>
      )}
      {label}
    </div>
  );
}
