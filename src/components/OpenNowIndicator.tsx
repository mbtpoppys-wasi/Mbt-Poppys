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
      className={`inline-block rounded-lg px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest shadow-led-glow ${
        open === false ? "bg-red-500/90 text-white" : "bg-mbtYellow text-mbtDark"
      }`}
      role="status"
      aria-live="polite"
    >
      {label}
    </div>
  );
}
