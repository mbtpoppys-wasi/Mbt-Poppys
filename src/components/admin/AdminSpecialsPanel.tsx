"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addSpecialAction,
  deleteSpecialAction,
  toggleSpecialAction,
  type ActionResult,
} from "@/lib/actions";
import type { Special } from "@/lib/types";

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

function DeleteSpecialForm({ id }: { id: string }) {
  const [, formAction] = useFormState(deleteSpecialAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  );
}

export default function AdminSpecialsPanel({ specials }: { specials: Special[] }) {
  const [state, formAction] = useFormState(addSpecialAction, initialState);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
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
        {specials.map((special) => (
          <div
            key={special.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-charcoal p-4"
          >
            <div>
              <p className="font-semibold text-white">{special.title}</p>
              {special.description && (
                <p className="text-sm text-white/50">{special.description}</p>
              )}
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <ToggleSpecialForm id={special.id} active={special.is_active} />
              <DeleteSpecialForm id={special.id} />
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
