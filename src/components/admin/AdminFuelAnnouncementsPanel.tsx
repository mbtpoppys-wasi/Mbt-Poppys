"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addFuelAnnouncementAction,
  deleteFuelAnnouncementAction,
  toggleFuelAnnouncementAction,
  type ActionResult,
} from "@/lib/actions";
import type { FuelAnnouncement } from "@/lib/types";

const initialState: ActionResult = { success: false, message: "" };

function AddSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Posting…" : "Post Announcement"}
    </button>
  );
}

function ToggleButton({ active }: { active: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition disabled:opacity-60 ${
        active
          ? "border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10"
          : "border-white/20 text-white/50 hover:bg-white/10"
      }`}
    >
      {pending ? "…" : active ? "Active" : "Inactive"}
    </button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-red-400/40 px-3 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-400/10 disabled:opacity-60"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}

function ToggleAnnouncementForm({ id, active }: { id: string; active: boolean }) {
  const [, formAction] = useFormState(toggleFuelAnnouncementAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="is_active" value={String(active)} />
      <ToggleButton active={active} />
    </form>
  );
}

function DeleteAnnouncementForm({ id }: { id: string }) {
  const [, formAction] = useFormState(deleteFuelAnnouncementAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}

export default function AdminFuelAnnouncementsPanel({
  announcements,
}: {
  announcements: FuelAnnouncement[];
}) {
  const [state, formAction] = useFormState(addFuelAnnouncementAction, initialState);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        className="flex flex-col gap-3 rounded-xl border border-white/10 bg-charcoal p-5"
      >
        <textarea
          name="message"
          required
          rows={2}
          placeholder="e.g. Fuel prices will increase this Wednesday, 07/08/2026."
          className="w-full rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <AddSubmitButton />
          {state.message && (
            <span className={`text-xs ${state.success ? "text-mbt-yellow" : "text-red-400"}`}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      <div className="space-y-2">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-charcoal p-4"
          >
            <div>
              <p className="text-white">{announcement.message}</p>
              <p className="mt-1 text-xs text-white/40">
                {new Date(announcement.created_at).toLocaleDateString("en-ZA", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <ToggleAnnouncementForm id={announcement.id} active={announcement.is_active} />
              <DeleteAnnouncementForm id={announcement.id} />
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <p className="text-sm text-white/40">No announcements yet — post one above.</p>
        )}
      </div>
    </div>
  );
}
