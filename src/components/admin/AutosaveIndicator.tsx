"use client";

export default function AutosaveIndicator({
  pending,
  success,
  message,
}: {
  pending: boolean;
  success: boolean;
  message: string;
}) {
  if (pending) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mbt-yellow" />
        Saving…
      </span>
    );
  }

  if (!message) return null;

  return (
    <span className={`text-xs ${success ? "text-emerald-400" : "text-red-400"}`}>
      {success ? "✓ Saved" : message}
    </span>
  );
}
