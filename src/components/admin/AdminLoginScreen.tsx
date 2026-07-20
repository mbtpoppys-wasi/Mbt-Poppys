"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Fuel, Lock, Mail, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { loginAction, type ActionResult } from "@/lib/actions";

const initialState: ActionResult = { success: false, message: "" };

// Client-side rate limiting (UX only — credentials are verified server-side):
// 5 failed attempts locks the form for 5 minutes with a live countdown.
const LOCK_KEY = "mbt_admin_lock";
const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000;

type LockState = { count: number; lockedUntil: number };

function readLock(): LockState {
  try {
    const raw = localStorage.getItem(LOCK_KEY);
    if (!raw) return { count: 0, lockedUntil: 0 };
    const parsed = JSON.parse(raw) as LockState;
    return {
      count: Number(parsed.count) || 0,
      lockedUntil: Number(parsed.lockedUntil) || 0,
    };
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function writeLock(state: LockState) {
  try {
    localStorage.setItem(LOCK_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode) — limiter degrades to nothing
  }
}

function clearLock() {
  try {
    localStorage.removeItem(LOCK_KEY);
  } catch {
    // ignore
  }
}

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const FEATURES = [
  { icon: Fuel, text: "Update pump prices in seconds" },
  { icon: Sparkles, text: "Manage BUZZ Café products & specials" },
  { icon: Zap, text: "Changes go live on the site instantly" },
  { icon: ShieldCheck, text: "Secured owner-only access" },
];

export default function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [lockedUntil, setLockedUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setLockedUntil(readLock().lockedUntil);
    return () => {
      mounted.current = false;
    };
  }, []);

  const isLocked = lockedUntil > now;

  // Tick the mm:ss countdown while locked.
  useEffect(() => {
    if (!isLocked) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [isLocked]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (pending) return;

      const lock = readLock();
      const time = Date.now();
      if (lock.lockedUntil > time) {
        setLockedUntil(lock.lockedUntil);
        setNow(time);
        return;
      }

      setPending(true);
      setError("");
      try {
        const fd = new FormData();
        fd.set("email", email);
        fd.set("password", password);
        const result = await loginAction(initialState, fd);

        if (result.success) {
          clearLock();
          router.refresh(); // server page re-renders authenticated → dashboard
          return;
        }

        const count = lock.count + 1;
        if (count >= MAX_ATTEMPTS) {
          const until = Date.now() + LOCK_MS;
          writeLock({ count: 0, lockedUntil: until });
          if (mounted.current) {
            setLockedUntil(until);
            setNow(Date.now());
            setError("Too many failed attempts. Try again in 5 minutes.");
          }
        } else {
          writeLock({ count, lockedUntil: 0 });
          if (mounted.current) {
            const left = MAX_ATTEMPTS - count;
            setError(`${result.message} (${left} attempt${left === 1 ? "" : "s"} remaining)`);
          }
        }
      } catch {
        if (mounted.current) setError("Something went wrong — please try again.");
      } finally {
        if (mounted.current) setPending(false);
      }
    },
    [email, password, pending, router]
  );

  return (
    <div className="relative flex min-h-[100dvh] overflow-hidden bg-mbtDark">
      {/* ── Ambient background (whole page, mobile included) ─────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-mbtYellow/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-mbtYellow/10 blur-3xl" />

      {/* ── Left brand panel (desktop only) ─────────────────────────── */}
      <div className="relative hidden w-[52%] overflow-hidden lg:block">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* accent blobs */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-mbtYellow/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-mbtYellow/10 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/MBTLogo.jpg"
              alt="MBT Poppys Ventersdorp logo"
              className="h-14 w-14 rounded-2xl object-cover shadow-led-glow"
            />
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                MBT Poppys
              </p>
              <p className="text-sm text-white/50">Ventersdorp · 24 Hours</p>
            </div>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white"
            >
              Owner Admin
              <span className="block text-mbtYellow text-shadow-led">Portal</span>
            </motion.h1>
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 space-y-4"
            >
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/70">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-mbtYellow/10 text-mbtYellow">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <p className="text-xs text-white/30">
            38 Hendrik Potgieter Street, Ventersdorp · Fuel Station &amp; BUZZ Café
          </p>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* compact brand header on mobile */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/MBTLogo.jpg"
              alt="MBT Poppys Ventersdorp logo"
              className="h-12 w-12 rounded-xl object-cover shadow-led-glow"
            />
            <div>
              <p className="font-display text-base font-bold uppercase tracking-wide text-white">
                MBT Poppys
              </p>
              <p className="text-xs text-white/50">Owner Admin Portal</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-white/50">
              Sign in with your admin email and password to manage the station.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/60">
                  Email
                </span>
                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="owner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-mbtYellow focus:outline-none focus:ring-2 focus:ring-mbtYellow/40"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/60">
                  Password
                </span>
                <div className="relative">
                  <Lock
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/30 py-3 pl-11 pr-12 text-sm text-white placeholder:text-white/30 focus:border-mbtYellow focus:outline-none focus:ring-2 focus:ring-mbtYellow/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending || isLocked}
                className="w-full rounded-xl bg-mbtYellow px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-mbtDark shadow-lg shadow-mbtYellow/25 transition hover:brightness-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
              >
                {isLocked
                  ? `Locked — try again in ${formatCountdown(lockedUntil - now)}`
                  : pending
                    ? "Checking…"
                    : "Sign In"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-white/30">
            Owner access only. All changes publish to the live site immediately.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
