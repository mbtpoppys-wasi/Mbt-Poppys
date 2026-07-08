"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addSpecialAction,
  deleteSpecialAction,
  moveSpecialAction,
  toggleSpecialAction,
  type ActionResult,
} from "@/lib/actions";
import type { Special } from "@/lib/types";
import { getStoragePhotoUrl } from "@/lib/storage-url";

const initialState: ActionResult = { success: false, message: "" };

function AddSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Adding…" : "Add Special"}
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

function MoveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/60 transition hover:bg-white/10 disabled:opacity-40"
    >
      {label}
    </button>
  );
}

function ToggleSpecialForm({ id, active }: { id: string; active: boolean }) {
  const [, formAction] = useFormState(toggleSpecialAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="is_active" value={String(active)} />
      <ToggleButton active={active} />
    </form>
  );
}

function DeleteSpecialForm({ id, imageFilename }: { id: string; imageFilename: string | null }) {
  const [, formAction] = useFormState(deleteSpecialAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="image_filename" value={imageFilename ?? ""} />
      <DeleteButton />
    </form>
  );
}

function MoveSpecialForm({ id, direction }: { id: string; direction: "up" | "down" }) {
  const [, formAction] = useFormState(moveSpecialAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <MoveButton label={direction === "up" ? "↑" : "↓"} />
    </form>
  );
}

export default function AdminSpecialsPanel({ specials }: { specials: Special[] }) {
  const [state, formAction] = useFormState(addSpecialAction, initialState);
  const sorted = [...specials].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        encType="multipart/form-data"
        className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-charcoal p-5 sm:grid-cols-2"
      >
        <input
          type="text"
          name="title"
          required
          placeholder="Special title"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none sm:col-span-2"
        />
        <textarea
          name="description"
          placeholder="Short description"
          rows={2}
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none sm:col-span-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white file:mr-3 file:rounded-full file:border-0 file:bg-mbt-yellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-charcoal sm:col-span-2"
        />
        <input
          type="number"
          name="sort_order"
          placeholder="Sort order (optional)"
          defaultValue={0}
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
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
        {sorted.map((special) => (
          <div
            key={special.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-charcoal p-4"
          >
            <div className="flex items-center gap-3">
              {special.image_filename && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getStoragePhotoUrl(special.image_filename)}
                  alt={special.title}
                  className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-white">{special.title}</p>
                {special.description && (
                  <p className="text-sm text-white/50">{special.description}</p>
                )}
              </div>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <MoveSpecialForm id={special.id} direction="up" />
              <MoveSpecialForm id={special.id} direction="down" />
              <ToggleSpecialForm id={special.id} active={special.is_active} />
              <DeleteSpecialForm id={special.id} imageFilename={special.image_filename} />
            </div>
          </div>
        ))}
        {specials.length === 0 && (
          <p className="text-sm text-white/40">No specials yet — add one above.</p>
        )}
      </div>
    </div>
  );
}
