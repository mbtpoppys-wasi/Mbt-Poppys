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
      ? "Checking hours…"
      : open
        ? isOpen24Hours()
          ? "Open Now — 24 Hours"
          : "Open Now"
        : "Currently Closed";

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-mbt-yellow/40 bg-black/40 px-4 py-2 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2.5 w-2.5">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mbt-yellow opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            open === null ? "bg-gray-400" : open ? "bg-mbt-yellow" : "bg-red-500"
          }`}
        />
      </span>
      <span className="font-display text-xs font-bold uppercase tracking-widest text-mbt-yellow">
        {label}
      </span>
    </div>
  );
}
