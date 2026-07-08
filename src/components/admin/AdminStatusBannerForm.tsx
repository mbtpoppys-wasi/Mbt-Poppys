"use client";

import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateStatusBannerAction, type ActionResult } from "@/lib/actions";
import type { StatusBanner } from "@/lib/types";
import AutosaveIndicator from "@/components/admin/AutosaveIndicator";

const initialState: ActionResult = { success: false, message: "" };

function StatusSlot({ success, message }: { success: boolean; message: string }) {
  const { pending } = useFormStatus();
  return <AutosaveIndicator pending={pending} success={success} message={message} />;
}

export default function AdminStatusBannerForm({ banner }: { banner: StatusBanner }) {
  const [state, formAction] = useFormState(updateStatusBannerAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSaved = useRef(banner.message);

  const autosaveText = () => {
    const textarea = formRef.current?.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (!textarea || textarea.value === lastSaved.current) return;
    lastSaved.current = textarea.value;
    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 rounded-xl border border-white/10 bg-charcoal p-5"
    >
      <input type="hidden" name="id" value={banner.id} />

      <label className="flex items-center gap-3 text-sm text-white">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={banner.is_active}
          onChange={() => formRef.current?.requestSubmit()}
          className="h-4 w-4 accent-mbt-yellow"
        />
        Banner is active (visible on the site)
      </label>

      <textarea
        name="message"
        defaultValue={banner.message}
        rows={2}
        placeholder="e.g. Generator active — all pumps operational"
        onBlur={autosaveText}
        className="w-full rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />

      <div className="flex items-center gap-3">
        <span className="text-xs text-white/30">Saves automatically</span>
        <StatusSlot success={state.success} message={state.message} />
      </div>
    </form>
  );
}
