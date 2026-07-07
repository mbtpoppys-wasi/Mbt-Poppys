"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "mbt-status-banner-dismissed-at";

export default function StatusBannerClient({
  message,
  updatedAt,
}: {
  message: string;
  updatedAt: string;
}) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const dismissedAt = window.sessionStorage.getItem(DISMISS_KEY);
    setDismissed(dismissedAt === updatedAt);
  }, [updatedAt]);

  const handleDismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, updatedAt);
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="relative z-30 flex items-center justify-center gap-3 bg-mbtYellow px-4 py-2.5 text-center text-sm font-semibold text-mbtDark">
      <span className="inline-flex h-2 w-2 flex-shrink-0 animate-pulse-slow rounded-full bg-mbtDark" />
      <p className="font-body">{message}</p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notice"
        className="ml-2 flex-shrink-0 rounded-full px-2 text-mbtDark/70 transition hover:text-mbtDark"
      >
        ✕
      </button>
    </div>
  );
}
