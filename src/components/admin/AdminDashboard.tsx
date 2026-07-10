"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BadgePercent,
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  Coffee,
  Fuel,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  addCafeProductAction,
  addFuelAnnouncementAction,
  addGalleryImageAction,
  addSpecialAction,
  deleteCafeProductAction,
  deleteFuelAnnouncementAction,
  deleteGalleryImageAction,
  deleteSpecialAction,
  logoutAction,
  moveSpecialAction,
  toggleFuelAnnouncementAction,
  toggleSpecialAction,
  updateCafeProductAction,
  updateFuelAnnouncementAction,
  updateFuelPriceAction,
  updateGalleryImageAction,
  updateSpecialAction,
  updateStatusBannerAction,
  type ActionResult,
} from "@/lib/actions";
import { getStoragePhotoUrl } from "@/lib/storage-url";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type {
  CafeCategory,
  CafeProduct,
  CafeProductStatus,
  FuelAnnouncement,
  FuelPrice,
  FuelType,
  GalleryImage,
  Special,
  StatusBanner,
} from "@/lib/types";

/* ────────────────────────────── metadata ────────────────────────────── */

const noop: ActionResult = { success: false, message: "" };

type ServerAction = (prev: ActionResult, fd: FormData) => Promise<ActionResult>;

// Every mutation follows the same optimistic-after-confirm pattern:
// await the server action; on failure alert + bail, on success the caller
// updates local state and flashes "Saved".
async function runAction(
  action: ServerAction,
  fields: Record<string, string | File>
): Promise<ActionResult> {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  try {
    return await action(noop, fd);
  } catch {
    return { success: false, message: "Network error — please try again." };
  }
}

const FUEL_LABELS: Record<FuelType, string> = {
  petrol_95: "Petrol 95 Unleaded",
  petrol_93: "Petrol 93 Unleaded",
  diesel_50ppm: "Diesel 50ppm",
  diesel_10ppm: "Diesel 10ppm",
};

const FUEL_ORDER: Record<FuelType, number> = {
  petrol_95: 0,
  petrol_93: 1,
  diesel_50ppm: 2,
  diesel_10ppm: 3,
};

const CATEGORY_META: Record<CafeCategory, { label: string; icon: string }> = {
  fresh_bakery: { label: "Fresh Bakery", icon: "🥐" },
  cold_drinks: { label: "Cold Drinks", icon: "🥤" },
  travel_snacks: { label: "Travel Snacks", icon: "🍫" },
  tobacco_vapes: { label: "Tobacco & Vapes", icon: "💨" },
  braai_outdoor: { label: "Braai & Outdoor", icon: "🔥" },
  essentials: { label: "Essentials", icon: "🧺" },
};

const STATUS_META: Record<CafeProductStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-emerald-100 text-emerald-700" },
  out_of_stock: { label: "Out of Stock", className: "bg-red-100 text-red-700" },
  coming_soon: { label: "Coming Soon", className: "bg-sky-100 text-sky-700" },
  temporarily_removed: { label: "Removed", className: "bg-gray-200 text-gray-600" },
};

type SectionId = "overview" | "fuel" | "banner" | "cafe" | "specials" | "gallery" | "updates";

const INACTIVITY_MS = 30 * 60 * 1000;

function formatRand(price: number): string {
  return `R ${price.toFixed(2)}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-ZA", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

/* ────────────────────────────── shared UI ────────────────────────────── */

const inputClass =
  "w-full rounded-xl border border-mbtDark/10 bg-mbtGray/60 px-4 py-2.5 text-sm text-mbtDark placeholder:text-mbtDark/50 focus:border-mbtYellow focus:outline-none focus:ring-2 focus:ring-mbtYellow/40";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-mbtDark";

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-mbtDark">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-mbtDark transition hover:bg-mbtDark/5 hover:text-mbtDark"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function SubmitRow({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-xl bg-mbtYellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-mbtDark shadow-lg shadow-mbtYellow/25 transition hover:brightness-95 active:scale-[0.99] disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

// Delete swaps in place to inline Yes / No — no browser confirm().
function InlineDelete({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        aria-label="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
      >
        <Trash2 size={15} />
      </button>
    );
  }

  return (
    <span className="flex items-center gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          await onConfirm();
          setBusy(false);
          setConfirming(false);
        }}
        className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
      >
        {busy ? "…" : "Yes"}
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => setConfirming(false)}
        className="rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-600 transition hover:bg-gray-300"
      >
        No
      </button>
    </span>
  );
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Edit"
      className="flex h-8 w-8 items-center justify-center rounded-full text-mbtDark transition hover:bg-mbtYellow/20 hover:text-mbtDark"
    >
      <Pencil size={15} />
    </button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
        on ? "bg-emerald-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  count,
  children,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  subtitle?: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5">
      <div className="flex items-center gap-3 border-b border-mbtDark/5 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mbtYellow/15 text-mbtDark">
          <Icon size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-mbtDark">
            {title}
          </h2>
          {subtitle && <p className="truncate text-xs text-mbtDark">{subtitle}</p>}
        </div>
        {typeof count === "number" && (
          <span className="rounded-full bg-mbtDark/5 px-2.5 py-1 text-xs font-bold text-mbtDark">
            {count}
          </span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

/* ────────────────────────────── main component ────────────────────────────── */

type ModalState =
  | { type: "edit-fuel"; fuel: FuelPrice }
  | { type: "add-product" }
  | { type: "edit-product"; product: CafeProduct }
  | { type: "add-special" }
  | { type: "edit-special"; special: Special }
  | { type: "add-photo" }
  | { type: "edit-photo"; image: GalleryImage }
  | { type: "edit-announcement"; announcement: FuelAnnouncement }
  | null;

interface Props {
  fuelPrices: FuelPrice[];
  statusBanner: StatusBanner | null;
  cafeProducts: CafeProduct[];
  galleryImages: GalleryImage[];
  specials: Special[];
  fuelAnnouncements: FuelAnnouncement[];
}

const NAV: { id: SectionId; label: string; icon: React.ComponentType<{ size?: number | string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "fuel", label: "Fuel Prices", icon: Fuel },
  { id: "banner", label: "Status Banner", icon: AlertTriangle },
  { id: "cafe", label: "BUZZ Café", icon: Coffee },
  { id: "specials", label: "Specials", icon: BadgePercent },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "updates", label: "Fuel Updates", icon: Bell },
];

export default function AdminDashboard(props: Props) {
  const [fuel, setFuel] = useState<FuelPrice[]>(
    [...props.fuelPrices].sort((a, b) => FUEL_ORDER[a.fuel_type] - FUEL_ORDER[b.fuel_type])
  );
  const [banner, setBanner] = useState<StatusBanner | null>(props.statusBanner);
  const [products, setProducts] = useState<CafeProduct[]>(props.cafeProducts);
  const [gallery, setGallery] = useState<GalleryImage[]>(props.galleryImages);
  const [specials, setSpecials] = useState<Special[]>(props.specials);
  const [announcements, setAnnouncements] = useState<FuelAnnouncement[]>(props.fuelAnnouncements);

  // revalidatePath("/admin") in every action re-renders the server page →
  // fresh props flow in; sync them so local state converges on the DB truth.
  useEffect(() => {
    setFuel([...props.fuelPrices].sort((a, b) => FUEL_ORDER[a.fuel_type] - FUEL_ORDER[b.fuel_type]));
  }, [props.fuelPrices]);
  useEffect(() => setBanner(props.statusBanner), [props.statusBanner]);
  useEffect(() => setProducts(props.cafeProducts), [props.cafeProducts]);
  useEffect(() => setGallery(props.galleryImages), [props.galleryImages]);
  useEffect(() => setSpecials(props.specials), [props.specials]);
  useEffect(() => setAnnouncements(props.fuelAnnouncements), [props.fuelAnnouncements]);

  const [section, setSection] = useState<SectionId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flashSaved = useCallback(() => {
    setSavedFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSavedFlash(false), 2000);
  }, []);

  const handleLogout = useCallback(() => {
    void logoutAction();
  }, []);

  // 30-min inactivity auto-logout.
  useEffect(() => {
    let timer = setTimeout(handleLogout, INACTIVITY_MS);
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, INACTIVITY_MS);
    };
    const events = ["mousedown", "keydown", "touchstart"] as const;
    for (const ev of events) window.addEventListener(ev, reset, { passive: true });
    return () => {
      clearTimeout(timer);
      for (const ev of events) window.removeEventListener(ev, reset);
    };
  }, [handleLogout]);

  /* ── derived ── */

  const query = search.trim().toLowerCase();
  const filteredProducts = useMemo(
    () => (query ? products.filter((p) => p.name.toLowerCase().includes(query)) : products),
    [products, query]
  );
  const filteredSpecials = useMemo(
    () => (query ? specials.filter((s) => s.title.toLowerCase().includes(query)) : specials),
    [specials, query]
  );
  const filteredAnnouncements = useMemo(
    () =>
      query ? announcements.filter((a) => a.message.toLowerCase().includes(query)) : announcements,
    [announcements, query]
  );
  const matchCount = filteredProducts.length + filteredSpecials.length + filteredAnnouncements.length;

  const activeSpecials = specials.filter((s) => s.is_active).length;
  const petrol95 = fuel.find((f) => f.fuel_type === "petrol_95");

  const addTargets: Partial<Record<SectionId, ModalState>> = {
    specials: { type: "add-special" },
    gallery: { type: "add-photo" },
  };
  const addModalForSection: ModalState = addTargets[section] ?? { type: "add-product" };

  /* ── mutations (await → confirm → local state → flash) ── */

  const saveFuel = async (fuelType: FuelType, price: number): Promise<string | null> => {
    const res = await runAction(updateFuelPriceAction, {
      fuel_type: fuelType,
      price: String(price),
    });
    if (!res.success) return res.message;
    setFuel((prev) =>
      prev.map((f) =>
        f.fuel_type === fuelType ? { ...f, price, updated_at: new Date().toISOString() } : f
      )
    );
    flashSaved();
    return null;
  };

  const saveBanner = async (isActive: boolean, message: string): Promise<string | null> => {
    if (!banner) return "No banner row found — run the status_banner migration first.";
    const fields: Record<string, string> = { id: banner.id, message };
    if (isActive) fields.is_active = "on";
    const res = await runAction(updateStatusBannerAction, fields);
    if (!res.success) return res.message;
    setBanner({ ...banner, is_active: isActive, message, updated_at: new Date().toISOString() });
    flashSaved();
    return null;
  };

  const deleteProduct = async (p: CafeProduct) => {
    const res = await runAction(deleteCafeProductAction, {
      id: p.id,
      image_filename: p.image_filename ?? "",
    });
    if (!res.success) {
      alert("Delete failed: " + res.message);
      return;
    }
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    flashSaved();
  };

  const toggleSpecial = async (s: Special) => {
    const res = await runAction(toggleSpecialAction, { id: s.id, is_active: String(s.is_active) });
    if (!res.success) {
      alert("Update failed: " + res.message);
      return;
    }
    setSpecials((prev) =>
      prev.map((x) => (x.id === s.id ? { ...x, is_active: !x.is_active } : x))
    );
    flashSaved();
  };

  const moveSpecial = async (s: Special, direction: "up" | "down") => {
    const res = await runAction(moveSpecialAction, { id: s.id, direction });
    if (!res.success) {
      alert("Reorder failed: " + res.message);
      return;
    }
    setSpecials((prev) => {
      const sorted = [...prev].sort((a, b) => a.sort_order - b.sort_order);
      const i = sorted.findIndex((x) => x.id === s.id);
      const j = direction === "up" ? i - 1 : i + 1;
      if (i === -1 || j < 0 || j >= sorted.length) return prev;
      const a = sorted[i];
      const b = sorted[j];
      return prev.map((x) =>
        x.id === a.id
          ? { ...x, sort_order: b.sort_order }
          : x.id === b.id
            ? { ...x, sort_order: a.sort_order }
            : x
      );
    });
    flashSaved();
  };

  const deleteSpecial = async (s: Special) => {
    const res = await runAction(deleteSpecialAction, {
      id: s.id,
      image_filename: s.image_filename ?? "",
    });
    if (!res.success) {
      alert("Delete failed: " + res.message);
      return;
    }
    setSpecials((prev) => prev.filter((x) => x.id !== s.id));
    flashSaved();
  };

  const deletePhoto = async (img: GalleryImage) => {
    const res = await runAction(deleteGalleryImageAction, { id: img.id, filename: img.filename });
    if (!res.success) {
      alert("Delete failed: " + res.message);
      return;
    }
    setGallery((prev) => prev.filter((x) => x.id !== img.id));
    flashSaved();
  };

  const toggleAnnouncement = async (a: FuelAnnouncement) => {
    const res = await runAction(toggleFuelAnnouncementAction, {
      id: a.id,
      is_active: String(a.is_active),
    });
    if (!res.success) {
      alert("Update failed: " + res.message);
      return;
    }
    setAnnouncements((prev) =>
      prev.map((x) => (x.id === a.id ? { ...x, is_active: !x.is_active } : x))
    );
    flashSaved();
  };

  const deleteAnnouncement = async (a: FuelAnnouncement) => {
    const res = await runAction(deleteFuelAnnouncementAction, { id: a.id });
    if (!res.success) {
      alert("Delete failed: " + res.message);
      return;
    }
    setAnnouncements((prev) => prev.filter((x) => x.id !== a.id));
    flashSaved();
  };

  /* ── sections ── */

  const showSection = (id: SectionId) => section === "overview" || section === id;

  const sortedSpecials = [...filteredSpecials].sort((a, b) => a.sort_order - b.sort_order);

  const productsByCategory = useMemo(() => {
    const map = new Map<CafeCategory, CafeProduct[]>();
    for (const key of Object.keys(CATEGORY_META) as CafeCategory[]) map.set(key, []);
    for (const p of filteredProducts) {
      map.get(p.category)?.push(p);
    }
    for (const list of Array.from(map.values())) list.sort((a, b) => a.sort_order - b.sort_order);
    return map;
  }, [filteredProducts]);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-mbtGray font-body text-mbtDark">
      {/* ══ Top bar ══ */}
      <header className="z-30 flex h-16 flex-shrink-0 items-center gap-3 bg-mbtDark px-4 shadow-lg shadow-black/20 sm:px-6">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/MBTLogo.jpg"
          alt="MBT Poppys logo"
          className="h-9 w-9 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <h1 className="truncate font-display text-sm font-bold uppercase tracking-wide text-white sm:text-base">
            Admin Dashboard
          </h1>
          <p className="hidden text-[11px] text-white/40 sm:block">MBT Poppys Ventersdorp</p>
        </div>

        <span className="ml-1 flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>

        <AnimatePresence>
          {savedFlash && (
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-1 rounded-full bg-mbtYellow px-3 py-1 text-xs font-bold text-mbtDark"
            >
              <Check size={13} /> Saved
            </motion.span>
          )}
        </AnimatePresence>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModal(addModalForSection)}
            className="flex items-center gap-1.5 rounded-full bg-mbtYellow px-4 py-2 font-display text-xs font-bold uppercase tracking-wide text-mbtDark transition hover:brightness-95 active:scale-[0.98]"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-mbtYellow/40 hover:text-white"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ══ Sidebar ══ */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
          )}
        </AnimatePresence>

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-mbtDark transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 flex-shrink-0 items-center justify-between px-5 lg:hidden">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {NAV.map(({ id, label, icon: Icon }) => {
              const counts: Partial<Record<SectionId, number>> = {
                fuel: fuel.length,
                cafe: products.length,
                specials: specials.length,
                gallery: gallery.length,
                updates: announcements.length,
              };
              const active = section === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSection(id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-mbtYellow text-mbtDark shadow-lg shadow-mbtYellow/20"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  <span className="flex-1">{label}</span>
                  {typeof counts[id] === "number" && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active ? "bg-mbtDark/10 text-mbtDark" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {counts[id]}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex-shrink-0 border-t border-white/10 p-4">
            <div className="flex items-center gap-2 text-xs">
              {isSupabaseConfigured ? (
                <>
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-white/50">Connected · live sync on</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                  <span className="text-white/50">Supabase not connected</span>
                </>
              )}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-white/25">
              Changes publish to the live site within seconds.
            </p>
          </div>
        </aside>

        {/* ══ Main area ══ */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
            {/* banner + stats */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-mbtDark via-[#242424] to-mbtDark p-6 shadow-lg sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-mbtYellow">
                {new Date().toLocaleDateString("en-ZA", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
                Welcome back 👋
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/50">
                Manage fuel prices, BUZZ Café products, specials and photos. Everything you save
                here goes live on the website instantly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[
                {
                  label: "Petrol 95",
                  value: petrol95 ? formatRand(petrol95.price) : "—",
                  hint: petrol95 ? `Updated ${formatDate(petrol95.updated_at)}` : "",
                },
                { label: "Café Products", value: String(products.length), hint: "across 6 categories" },
                {
                  label: "Active Specials",
                  value: String(activeSpecials),
                  hint: `${specials.length} total`,
                },
                { label: "Gallery Photos", value: String(gallery.length), hint: "on the website" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm shadow-black/5 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-mbtDark">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-mbtDark sm:text-2xl">
                    {stat.value}
                  </p>
                  {stat.hint && <p className="mt-0.5 truncate text-[11px] text-mbtDark">{stat.hint}</p>}
                </div>
              ))}
            </div>

            {/* search */}
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mbtDark"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, specials, updates…"
                className="w-full rounded-2xl border border-transparent bg-white py-3 pl-11 pr-24 text-sm shadow-sm shadow-black/5 placeholder:text-mbtDark/50 focus:border-mbtYellow focus:outline-none focus:ring-2 focus:ring-mbtYellow/30"
              />
              {query && (
                <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  <span className="text-xs text-mbtDark">
                    {matchCount} result{matchCount === 1 ? "" : "s"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="rounded-full bg-mbtDark/5 p-1 text-mbtDark hover:bg-mbtDark/10"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}
            </div>

            {/* ── Fuel prices ── */}
            {showSection("fuel") && !query && (
              <SectionCard icon={Fuel} title="Fuel Prices" subtitle="Prices shown on the homepage" count={fuel.length}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {fuel.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between rounded-xl border border-mbtDark/5 bg-mbtGray/50 p-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-mbtDark">{FUEL_LABELS[f.fuel_type]}</p>
                        <p className="mt-0.5 text-[11px] text-mbtDark">
                          Updated {formatDate(f.updated_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-lg font-bold text-mbtDark">
                          {formatRand(f.price)}
                        </span>
                        <EditButton onClick={() => setModal({ type: "edit-fuel", fuel: f })} />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* ── Status banner ── */}
            {showSection("banner") && !query && (
              <SectionCard
                icon={AlertTriangle}
                title="Status Banner"
                subtitle="Generator / load-shedding notice at the top of the site"
              >
                {banner ? (
                  <BannerForm banner={banner} onSave={saveBanner} />
                ) : (
                  <p className="text-sm text-mbtDark">
                    No banner row found — run the status_banner migration first.
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── BUZZ Café ── */}
            {showSection("cafe") && (
              <SectionCard
                icon={Coffee}
                title="BUZZ Café Products"
                subtitle="Convenience store catalogue"
                count={filteredProducts.length}
              >
                <div className="space-y-6">
                  {(Object.keys(CATEGORY_META) as CafeCategory[]).map((cat) => {
                    const list = productsByCategory.get(cat) ?? [];
                    if (list.length === 0) return null;
                    return (
                      <div key={cat}>
                        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-mbtDark">
                          <span>{CATEGORY_META[cat].icon}</span>
                          {CATEGORY_META[cat].label}
                          <span className="rounded-full bg-mbtDark/5 px-2 py-0.5 text-[10px]">
                            {list.length}
                          </span>
                        </p>
                        <div className="divide-y divide-mbtDark/5 rounded-xl border border-mbtDark/5">
                          {list.map((p) => (
                            <div key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                              {p.image_filename ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={getStoragePhotoUrl(p.image_filename)}
                                  alt={p.name}
                                  className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                                />
                              ) : (
                                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-mbtGray text-base">
                                  {CATEGORY_META[p.category].icon}
                                </span>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-mbtDark">
                                  {p.name}
                                  {p.is_best_price && (
                                    <span className="ml-2 rounded-full bg-mbtYellow/25 px-2 py-0.5 text-[10px] font-bold text-mbtDark">
                                      ★ Best Price
                                    </span>
                                  )}
                                </p>
                                {p.description && (
                                  <p className="truncate text-xs text-mbtDark">{p.description}</p>
                                )}
                              </div>
                              <span
                                className={`hidden flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline ${STATUS_META[p.status].className}`}
                              >
                                {STATUS_META[p.status].label}
                              </span>
                              <span className="flex flex-shrink-0 items-center gap-0.5">
                                <EditButton onClick={() => setModal({ type: "edit-product", product: p })} />
                                <InlineDelete onConfirm={() => deleteProduct(p)} />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <p className="py-4 text-center text-sm text-mbtDark">
                      {query ? "No products match your search." : "No products yet — tap Add to create one."}
                    </p>
                  )}
                </div>
              </SectionCard>
            )}

            {/* ── Specials ── */}
            {showSection("specials") && (
              <SectionCard
                icon={BadgePercent}
                title="Specials"
                subtitle="Shown on the /specials page"
                count={sortedSpecials.length}
              >
                <div className="divide-y divide-mbtDark/5 rounded-xl border border-mbtDark/5">
                  {sortedSpecials.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-3 px-3 py-2.5">
                      <span className="flex flex-shrink-0 flex-col">
                        <button
                          type="button"
                          disabled={i === 0 || Boolean(query)}
                          onClick={() => moveSpecial(s, "up")}
                          aria-label="Move up"
                          className="text-mbtDark transition hover:text-mbtDark disabled:opacity-20"
                        >
                          <ChevronUp size={15} />
                        </button>
                        <button
                          type="button"
                          disabled={i === sortedSpecials.length - 1 || Boolean(query)}
                          onClick={() => moveSpecial(s, "down")}
                          aria-label="Move down"
                          className="text-mbtDark transition hover:text-mbtDark disabled:opacity-20"
                        >
                          <ChevronDown size={15} />
                        </button>
                      </span>
                      {s.image_filename ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getStoragePhotoUrl(s.image_filename)}
                          alt={s.title}
                          className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-mbtGray text-base">
                          🏷️
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-mbtDark">{s.title}</p>
                        {s.description && (
                          <p className="truncate text-xs text-mbtDark">{s.description}</p>
                        )}
                      </div>
                      <Toggle on={s.is_active} onChange={() => toggleSpecial(s)} />
                      <span className="flex flex-shrink-0 items-center gap-0.5">
                        <EditButton onClick={() => setModal({ type: "edit-special", special: s })} />
                        <InlineDelete onConfirm={() => deleteSpecial(s)} />
                      </span>
                    </div>
                  ))}
                  {sortedSpecials.length === 0 && (
                    <p className="py-4 text-center text-sm text-mbtDark">
                      {query ? "No specials match your search." : "No specials yet — tap Add to create one."}
                    </p>
                  )}
                </div>
              </SectionCard>
            )}

            {/* ── Gallery ── */}
            {showSection("gallery") && !query && (
              <SectionCard
                icon={Images}
                title="Photo Gallery"
                subtitle="Station photos on the homepage"
                count={gallery.length}
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {gallery.map((img) => (
                    <div key={img.id} className="group overflow-hidden rounded-xl border border-mbtDark/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getStoragePhotoUrl(img.filename)}
                        alt={img.alt_text}
                        className="aspect-square w-full object-cover"
                      />
                      <div className="flex items-center justify-between gap-1 p-2">
                        <p className="min-w-0 truncate text-[11px] text-mbtDark">
                          {img.caption || img.alt_text}
                        </p>
                        <span className="flex flex-shrink-0 items-center">
                          <EditButton onClick={() => setModal({ type: "edit-photo", image: img })} />
                          <InlineDelete onConfirm={() => deletePhoto(img)} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {gallery.length === 0 && (
                  <p className="py-4 text-center text-sm text-mbtDark">
                    No photos yet — tap Add to upload one.
                  </p>
                )}
              </SectionCard>
            )}

            {/* ── Fuel updates ── */}
            {showSection("updates") && (
              <SectionCard
                icon={Bell}
                title="Fuel Updates"
                subtitle="Announcements on the /fuel-updates page"
                count={filteredAnnouncements.length}
              >
                <AnnouncementComposer
                  onPosted={(row) => {
                    setAnnouncements((prev) => [row, ...prev]);
                    flashSaved();
                  }}
                />
                <div className="mt-4 divide-y divide-mbtDark/5 rounded-xl border border-mbtDark/5">
                  {filteredAnnouncements.map((a) => (
                    <div key={a.id} className="flex items-center gap-3 px-3 py-2.5">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-mbtDark">{a.message}</p>
                        <p className="mt-0.5 text-[11px] text-mbtDark">{formatDate(a.created_at)}</p>
                      </div>
                      <Toggle on={a.is_active} onChange={() => toggleAnnouncement(a)} />
                      <span className="flex flex-shrink-0 items-center gap-0.5">
                        <EditButton
                          onClick={() => setModal({ type: "edit-announcement", announcement: a })}
                        />
                        <InlineDelete onConfirm={() => deleteAnnouncement(a)} />
                      </span>
                    </div>
                  ))}
                  {filteredAnnouncements.length === 0 && (
                    <p className="py-4 text-center text-sm text-mbtDark">
                      {query ? "No updates match your search." : "No announcements yet."}
                    </p>
                  )}
                </div>
              </SectionCard>
            )}
          </div>
        </main>
      </div>

      {/* ══ Modals ══ */}
      <AnimatePresence>
        {modal?.type === "edit-fuel" && (
          <ModalShell
            key="edit-fuel"
            title={`Edit ${FUEL_LABELS[modal.fuel.fuel_type]}`}
            onClose={() => setModal(null)}
          >
            <FuelForm
              fuel={modal.fuel}
              onSave={async (price) => {
                const err = await saveFuel(modal.fuel.fuel_type, price);
                if (err) {
                  alert("Save failed: " + err);
                  return;
                }
                setModal(null);
              }}
            />
          </ModalShell>
        )}

        {(modal?.type === "add-product" || modal?.type === "edit-product") && (
          <ModalShell
            key="product"
            title={modal.type === "add-product" ? "Add Café Product" : "Edit Product"}
            onClose={() => setModal(null)}
          >
            <ProductForm
              product={modal.type === "edit-product" ? modal.product : null}
              onDone={(saved, isNew) => {
                setProducts((prev) =>
                  isNew ? [...prev, saved] : prev.map((p) => (p.id === saved.id ? saved : p))
                );
                flashSaved();
                setModal(null);
              }}
            />
          </ModalShell>
        )}

        {(modal?.type === "add-special" || modal?.type === "edit-special") && (
          <ModalShell
            key="special"
            title={modal.type === "add-special" ? "Add Special" : "Edit Special"}
            onClose={() => setModal(null)}
          >
            <SpecialForm
              special={modal.type === "edit-special" ? modal.special : null}
              nextSortOrder={specials.length}
              onDone={(saved, isNew) => {
                setSpecials((prev) =>
                  isNew ? [...prev, saved] : prev.map((s) => (s.id === saved.id ? saved : s))
                );
                flashSaved();
                setModal(null);
              }}
            />
          </ModalShell>
        )}

        {modal?.type === "add-photo" && (
          <ModalShell key="add-photo" title="Upload Photo" onClose={() => setModal(null)}>
            <PhotoAddForm
              nextSortOrder={gallery.length}
              onDone={(saved) => {
                setGallery((prev) => [...prev, saved]);
                flashSaved();
                setModal(null);
              }}
            />
          </ModalShell>
        )}

        {modal?.type === "edit-photo" && (
          <ModalShell key="edit-photo" title="Edit Photo Details" onClose={() => setModal(null)}>
            <PhotoEditForm
              image={modal.image}
              onDone={(saved) => {
                setGallery((prev) => prev.map((g) => (g.id === saved.id ? saved : g)));
                flashSaved();
                setModal(null);
              }}
            />
          </ModalShell>
        )}

        {modal?.type === "edit-announcement" && (
          <ModalShell key="edit-announcement" title="Edit Announcement" onClose={() => setModal(null)}>
            <AnnouncementEditForm
              announcement={modal.announcement}
              onDone={(saved) => {
                setAnnouncements((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
                flashSaved();
                setModal(null);
              }}
            />
          </ModalShell>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────── modal forms ────────────────────────────── */

function FuelForm({ fuel, onSave }: { fuel: FuelPrice; onSave: (price: number) => Promise<void> }) {
  const [price, setPrice] = useState(String(fuel.price));
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const value = Number(price);
        if (!Number.isFinite(value) || value <= 0) {
          alert("Enter a valid price.");
          return;
        }
        setPending(true);
        await onSave(value);
        setPending(false);
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className={labelClass}>Price per litre (R)</span>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`${inputClass} font-display text-lg font-bold`}
        />
      </label>
      <p className="text-xs text-mbtDark">
        Currently {formatRand(fuel.price)} · last updated {formatDate(fuel.updated_at)}
      </p>
      <SubmitRow pending={pending} label="Save Price" />
    </form>
  );
}

function BannerForm({
  banner,
  onSave,
}: {
  banner: StatusBanner;
  onSave: (isActive: boolean, message: string) => Promise<string | null>;
}) {
  const [isActive, setIsActive] = useState(banner.is_active);
  const [message, setMessage] = useState(banner.message);
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const err = await onSave(isActive, message.trim());
        setPending(false);
        if (err) alert("Save failed: " + err);
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between rounded-xl border border-mbtDark/5 bg-mbtGray/50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-mbtDark">Show banner on the website</p>
          <p className="text-xs text-mbtDark">
            {isActive ? "Visible to all visitors" : "Hidden"}
          </p>
        </div>
        <Toggle on={isActive} onChange={() => setIsActive((v) => !v)} />
      </div>
      <label className="block">
        <span className={labelClass}>Banner message</span>
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. We're on generator power — pumps and café fully operational."
          className={inputClass}
        />
      </label>
      <SubmitRow pending={pending} label="Save Banner" />
    </form>
  );
}

function ProductForm({
  product,
  onDone,
}: {
  product: CafeProduct | null;
  onDone: (saved: CafeProduct, isNew: boolean) => void;
}) {
  const [category, setCategory] = useState<CafeCategory>(product?.category ?? "fresh_bakery");
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [status, setStatus] = useState<CafeProductStatus>(product?.status ?? "available");
  const [isBestPrice, setIsBestPrice] = useState(product?.is_best_price ?? false);
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  const isNew = product === null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const fields: Record<string, string | File> = {
          category,
          name: name.trim(),
          description: description.trim(),
          sort_order: String(product?.sort_order ?? 0),
        };
        if (file) fields.image = file;
        if (isBestPrice) fields.is_best_price = "on";

        let res: ActionResult;
        if (isNew) {
          res = await runAction(addCafeProductAction, fields);
        } else {
          fields.id = product.id;
          fields.status = status;
          fields.current_image = product.image_filename ?? "";
          res = await runAction(updateCafeProductAction, fields);
        }
        setPending(false);
        if (!res.success) {
          alert("Save failed: " + res.message);
          return;
        }

        if (isNew) {
          const row = res.row as unknown as CafeProduct | undefined;
          if (row) onDone(row, true);
        } else {
          onDone(
            {
              ...product,
              category,
              name: name.trim(),
              description: description.trim(),
              status,
              is_best_price: isBestPrice,
              // if a new file was uploaded the exact filename is generated
              // server-side; props re-sync will correct it moments later
              image_filename: product.image_filename,
            },
            false
          );
        }
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className={labelClass}>Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CafeCategory)}
          className={inputClass}
        >
          {(Object.keys(CATEGORY_META) as CafeCategory[]).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_META[c].icon} {CATEGORY_META[c].label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>Product name</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Fresh Farm Bread"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Description</span>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description shown under the name"
          className={inputClass}
        />
      </label>

      {!isNew && (
        <label className="block">
          <span className={labelClass}>Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CafeProductStatus)}
            className={inputClass}
          >
            {(Object.keys(STATUS_META) as CafeProductStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="flex items-center gap-2 text-sm text-mbtDark">
        <input
          type="checkbox"
          checked={isBestPrice}
          onChange={(e) => setIsBestPrice(e.target.checked)}
          className="h-4 w-4 accent-mbtYellow"
        />
        ★ Best price in town
      </label>

      <label className="block">
        <span className={labelClass}>{isNew ? "Photo (optional)" : "Replace photo (optional)"}</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-mbtYellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-mbtDark`}
        />
        {!isNew && product.image_filename && !file && (
          <span className="mt-1 block text-[11px] text-mbtDark">
            Keeping the current photo unless you choose a new one.
          </span>
        )}
      </label>

      <SubmitRow pending={pending} label={isNew ? "Add Product" : "Save Changes"} />
    </form>
  );
}

function SpecialForm({
  special,
  nextSortOrder,
  onDone,
}: {
  special: Special | null;
  nextSortOrder: number;
  onDone: (saved: Special, isNew: boolean) => void;
}) {
  const [title, setTitle] = useState(special?.title ?? "");
  const [description, setDescription] = useState(special?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);

  const isNew = special === null;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const fields: Record<string, string | File> = {
          title: title.trim(),
          description: description.trim(),
        };
        if (file) fields.image = file;

        let res: ActionResult;
        if (isNew) {
          fields.sort_order = String(nextSortOrder);
          res = await runAction(addSpecialAction, fields);
        } else {
          fields.id = special.id;
          fields.current_image = special.image_filename ?? "";
          res = await runAction(updateSpecialAction, fields);
        }
        setPending(false);
        if (!res.success) {
          alert("Save failed: " + res.message);
          return;
        }

        if (isNew) {
          const row = res.row as unknown as Special | undefined;
          if (row) onDone(row, true);
        } else {
          onDone(
            {
              ...special,
              title: title.trim(),
              description: description.trim(),
              updated_at: new Date().toISOString(),
            },
            false
          );
        }
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className={labelClass}>Title</span>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Weekend Braai Pack Deal"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Description</span>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's the deal?"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>{isNew ? "Image (optional)" : "Replace image (optional)"}</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-mbtYellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-mbtDark`}
        />
      </label>

      <SubmitRow pending={pending} label={isNew ? "Add Special" : "Save Changes"} />
    </form>
  );
}

function PhotoAddForm({
  nextSortOrder,
  onDone,
}: {
  nextSortOrder: number;
  onDone: (saved: GalleryImage) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!file) {
          alert("Please choose a photo to upload.");
          return;
        }
        setPending(true);
        const res = await runAction(addGalleryImageAction, {
          file,
          alt_text: altText.trim(),
          caption: caption.trim(),
          sort_order: String(nextSortOrder),
        });
        setPending(false);
        if (!res.success) {
          alert("Upload failed: " + res.message);
          return;
        }
        const row = res.row as unknown as GalleryImage | undefined;
        if (row) onDone(row);
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className={labelClass}>Photo</span>
        <input
          type="file"
          required
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-mbtYellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-mbtDark`}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Alt text (for SEO & accessibility)</span>
        <input
          type="text"
          required
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="e.g. Forecourt at night with LED canopy"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Caption (optional)</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Shown under the photo"
          className={inputClass}
        />
      </label>
      <SubmitRow pending={pending} label="Upload Photo" />
    </form>
  );
}

function PhotoEditForm({
  image,
  onDone,
}: {
  image: GalleryImage;
  onDone: (saved: GalleryImage) => void;
}) {
  const [altText, setAltText] = useState(image.alt_text);
  const [caption, setCaption] = useState(image.caption);
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const res = await runAction(updateGalleryImageAction, {
          id: image.id,
          alt_text: altText.trim(),
          caption: caption.trim(),
          sort_order: String(image.sort_order),
        });
        setPending(false);
        if (!res.success) {
          alert("Save failed: " + res.message);
          return;
        }
        onDone({ ...image, alt_text: altText.trim(), caption: caption.trim() });
      }}
      className="space-y-4"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getStoragePhotoUrl(image.filename)}
        alt={image.alt_text}
        className="h-36 w-full rounded-xl object-cover"
      />
      <label className="block">
        <span className={labelClass}>Alt text</span>
        <input
          type="text"
          required
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>Caption</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={inputClass}
        />
      </label>
      <SubmitRow pending={pending} label="Save Changes" />
    </form>
  );
}

function AnnouncementComposer({ onPosted }: { onPosted: (row: FuelAnnouncement) => void }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setPending(true);
        const res = await runAction(addFuelAnnouncementAction, { message: message.trim() });
        setPending(false);
        if (!res.success) {
          alert("Post failed: " + res.message);
          return;
        }
        const row = res.row as unknown as FuelAnnouncement | undefined;
        if (row) {
          onPosted(row);
          setMessage("");
        }
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="e.g. Diesel price drops 40c/litre on Wednesday…"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={pending || !message.trim()}
        className="flex-shrink-0 rounded-xl bg-mbtYellow px-5 font-display text-xs font-bold uppercase tracking-wide text-mbtDark transition hover:brightness-95 disabled:opacity-50"
      >
        {pending ? "…" : "Post"}
      </button>
    </form>
  );
}

function AnnouncementEditForm({
  announcement,
  onDone,
}: {
  announcement: FuelAnnouncement;
  onDone: (saved: FuelAnnouncement) => void;
}) {
  const [message, setMessage] = useState(announcement.message);
  const [pending, setPending] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        const res = await runAction(updateFuelAnnouncementAction, {
          id: announcement.id,
          message: message.trim(),
        });
        setPending(false);
        if (!res.success) {
          alert("Save failed: " + res.message);
          return;
        }
        onDone({ ...announcement, message: message.trim() });
      }}
      className="space-y-4"
    >
      <label className="block">
        <span className={labelClass}>Message</span>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
      </label>
      <SubmitRow pending={pending} label="Save Changes" />
    </form>
  );
}
