"use client";

import { useEffect } from "react";

export default function AdminPwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/admin-sw.js", { scope: "/admin" }).catch(() => {
      // Installability is a nice-to-have here, not a hard requirement.
    });
  }, []);

  return null;
}
