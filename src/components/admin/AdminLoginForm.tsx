"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type ActionResult } from "@/lib/actions";

const initialState: ActionResult = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-mbt-yellow px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Checking…" : "Log In"}
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto mt-24 max-w-sm rounded-2xl border border-white/10 bg-charcoal-card p-8"
    >
      <h1 className="font-display text-xl font-bold uppercase tracking-wide text-white">
        Owner Admin
      </h1>
      <p className="mt-1 text-sm text-white/50">Sign in with your admin email and password.</p>

      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        autoComplete="username"
        className="mt-6 w-full rounded-full border border-white/15 bg-charcoal px-5 py-3 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />

      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        autoComplete="current-password"
        className="mt-3 w-full rounded-full border border-white/15 bg-charcoal px-5 py-3 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
      />

      {state.message && <p className="mt-3 text-sm text-red-400">{state.message}</p>}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
