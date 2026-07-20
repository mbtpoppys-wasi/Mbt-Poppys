"use client";

import { useEffect, useState } from "react";
import { Download, Share, SquarePlus, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari's legacy standalone flag
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isAppleTouch = /iPhone|iPad|iPod/.test(ua);
  // iPadOS 13+ reports as "Macintosh" but exposes touch points
  const isIpadOs = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return isAppleTouch || isIpadOs;
}

export default function AdminInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosSteps, setShowIosSteps] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    if (isIos()) {
      setVisible(true);
      return;
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setVisible(false);
      return;
    }
    // iOS has no programmatic install — show the manual steps instead
    setShowIosSteps(true);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-mbtDark/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/admin-icon-192.png"
            alt="MBT Admin app icon"
            className="h-11 w-11 flex-shrink-0 rounded-full shadow-led-glow"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Install MBT Admin
            </p>
            {!showIosSteps ? (
              <p className="mt-0.5 text-xs text-white/50">
                Add this to your home screen for one-tap access, like a real app.
              </p>
            ) : (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
                Tap <Share size={13} className="inline text-mbtYellow" /> then{" "}
                <SquarePlus size={13} className="inline text-mbtYellow" /> &quot;Add to Home Screen&quot;
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss install prompt"
            className="flex-shrink-0 rounded-lg p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {!showIosSteps && (
          <button
            type="button"
            onClick={handleInstall}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-mbtYellow px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wide text-mbtDark shadow-lg shadow-mbtYellow/25 transition hover:brightness-95 active:scale-[0.99]"
          >
            <Download size={14} />
            Install App
          </button>
        )}
      </div>
    </div>
  );
}
