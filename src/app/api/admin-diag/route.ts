import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

/**
 * TEMPORARY diagnostic endpoint for the admin-login "config" error.
 * Reports only presence/shape of env vars and query outcomes — never
 * secret values. Delete this file once login works.
 */
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("key") !== "mbt-diag-7391") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const report: Record<string, unknown> = {
    hasSupabaseUrl: Boolean(url),
    supabaseUrlHost: url ? new URL(url).host : null,
    hasServiceRoleKey: Boolean(serviceKey),
    serviceRoleKeyPrefix: serviceKey ? serviceKey.slice(0, 10) : null,
    serviceRoleKeyLength: serviceKey ? serviceKey.length : 0,
  };

  if (url && serviceKey) {
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data, error } = await supabase
      .from("admin_credentials")
      .select("email, password_hash")
      .eq("email", "mbtpoppys@gmail.com")
      .maybeSingle();

    report.queryError = error ? error.message : null;
    report.rowFound = Boolean(data);
    report.hashLooksLikeBcrypt = data ? data.password_hash.startsWith("$2") : null;
  }

  return NextResponse.json(report);
}
