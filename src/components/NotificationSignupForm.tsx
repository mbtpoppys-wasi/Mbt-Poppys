"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitNotificationSignupAction, type ActionResult } from "@/lib/actions";

const initialState: ActionResult = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-charcoal shadow-led-glow transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Submitting…" : "Notify Me"}
    </button>
  );
}

export default function NotificationSignupForm() {
  const [state, formAction] = useFormState(submitNotificationSignupAction, initialState);

  return (
    <form action={formAction} className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
      <input
        type="text"
        name="name"
        required
        placeholder="Your name"
        className="w-full flex-1 rounded-full border border-white/15 bg-charcoal-card px-5 py-3 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="WhatsApp / SMS number"
        className="w-full flex-1 rounded-full border border-white/15 bg-charcoal-card px-5 py-3 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />
      <SubmitButton />
      {state.message && (
        <p
          role="status"
          className={`sm:basis-full ${state.success ? "text-mbt-yellow" : "text-red-400"} text-sm`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
