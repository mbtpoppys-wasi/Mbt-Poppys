import { logoutAction } from "@/lib/actions";

export default function AdminLogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/60 transition hover:border-mbt-yellow/40 hover:text-white"
      >
        Log Out
      </button>
    </form>
  );
}
