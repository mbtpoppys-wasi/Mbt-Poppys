"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateStatusBannerAction, type ActionResult } from "@/lib/actions";
import type { StatusBanner } from "@/lib/types";

const initialState: ActionResult = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save Banner"}
    </button>
  );
}

export default function AdminStatusBannerForm({ banner }: { banner: StatusBanner }) {
  const [state, formAction] = useFormState(updateStatusBannerAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-charcoal p-5"
    >
      <input type="hidden" name="id" value={banner.id} />

      <label className="flex items-center gap-3 text-sm text-white">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={banner.is_active}
          className="h-4 w-4 accent-mbt-yellow"
        />
        Banner is active (visible on the site)
      </label>

      <textarea
        name="message"
        defaultValue={banner.message}
        rows={2}
        placeholder="e.g. Generator active — all pumps operational"
        className="w-full rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        {state.message && (
          <span className={`text-xs ${state.success ? "text-mbt-yellow" : "text-red-400"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
