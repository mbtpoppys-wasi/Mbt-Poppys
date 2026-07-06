"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  addGalleryImageAction,
  deleteGalleryImageAction,
  type ActionResult,
} from "@/lib/actions";
import type { GalleryImage } from "@/lib/types";
import { getGalleryImageUrl } from "@/lib/data";

const initialState: ActionResult = { success: false, message: "" };

function UploadButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-mbt-yellow px-5 py-2 font-display text-xs font-bold uppercase tracking-wide text-charcoal transition hover:brightness-95 disabled:opacity-60"
    >
      {pending ? "Uploading…" : "Upload Photo"}
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

function DeleteImageForm({ id, filename }: { id: string; filename: string }) {
  const [, formAction] = useFormState(deleteGalleryImageAction, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="filename" value={filename} />
      <DeleteButton />
    </form>
  );
}

export default function AdminGalleryPanel({ images }: { images: GalleryImage[] }) {
  const [state, formAction] = useFormState(addGalleryImageAction, initialState);

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-charcoal p-5 sm:grid-cols-2"
      >
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white file:mr-3 file:rounded-full file:border-0 file:bg-mbt-yellow file:px-3 file:py-1 file:text-xs file:font-bold file:text-charcoal sm:col-span-2"
        />
        <input
          type="text"
          name="alt_text"
          required
          placeholder="Descriptive alt text, e.g. MBT Poppys Ventersdorp fuel station canopy at night"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none sm:col-span-2"
        />
        <input
          type="text"
          name="caption"
          placeholder="Caption shown on the site (optional)"
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
        />
        <input
          type="number"
          name="sort_order"
          placeholder="Sort order"
          defaultValue={0}
          className="rounded-lg border border-white/15 bg-charcoal-card px-3 py-2 text-white placeholder:text-white/40 focus:border-mbt-yellow focus:outline-none"
        />
        <div className="flex items-center gap-3 sm:col-span-2">
          <UploadButton />
          {state.message && (
            <span className={`text-xs ${state.success ? "text-mbt-yellow" : "text-red-400"}`}>
              {state.message}
            </span>
          )}
        </div>
      </form>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image) => (
          <div key={image.id} className="space-y-2 rounded-xl border border-white/10 bg-charcoal p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getGalleryImageUrl(image.filename)}
              alt={image.alt_text}
              className="h-24 w-full rounded-lg object-cover"
            />
            <p className="truncate text-xs text-white/50">{image.alt_text}</p>
            <DeleteImageForm id={image.id} filename={image.filename} />
          </div>
        ))}
        {images.length === 0 && (
          <p className="col-span-full text-sm text-white/40">No photos yet — upload one above.</p>
        )}
      </div>
    </div>
  );
}
