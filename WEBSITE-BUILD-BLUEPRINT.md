# Business Website + Live Admin Portal — Build Blueprint

**How to use this file:** Paste this entire document to Claude as your first message for a new client project. Fill in the `[BRACKETED]` placeholders with the new client's details (or just tell Claude the details separately and let it fill them in). Everything else — architecture, security model, admin portal behaviour, database pattern — should be built exactly as specified. Once Claude has built it, you handle colours, fonts, copy, photos, and layout polish yourself.

This is not a generic idea — it is the exact, working architecture of a real production site (fuel station + convenience store, live pump prices, live product catalogue, hidden owner admin portal), battle-tested including a real security incident and fix. Follow it precisely rather than improvising a "similar" structure.

---

## 0. Client fill-ins

- Business name: `[BUSINESS NAME]`
- What the business sells / does: `[BUSINESS DESCRIPTION]`
- Domain: `[DOMAIN]`
- Brand colours (primary accent + background + text): `[COLOR 1]`, `[COLOR 2]`, `[COLOR 3]`
- Content entities the owner needs to manage (adapt the "cafe products / specials" pattern below to these): `[LIST — e.g. menu items, services, room types, event listings, price lists]`
- Admin login email: `[ADMIN EMAIL]`

---

## 1. Tech stack (do not substitute)

- **Next.js 14 (App Router)**, TypeScript, React Server Components by default
- **Tailwind CSS** for styling
- **Framer Motion** for modal/toast/entrance animations
- **lucide-react** for icons
- **@supabase/supabase-js** — Postgres database, Storage (file uploads), Realtime (websockets). The only external backend service.
- **bcryptjs** — password hashing for the admin login
- **sharp** — Next.js image optimization (installed automatically as a peer, don't skip it)
- Hosting: **Vercel** (push to `main` = production deploy). No separate backend server — everything is Next.js server components, server actions, and Supabase.

---

## 2. Architecture overview — the data flow to reproduce

```
Admin browser                    Supabase                       Visitor browsers
─────────────                    ────────                       ────────────────
Admin edits a form → submits    Server action runs with          useLiveRefresh-style
a Next.js Server Action          the SERVICE-ROLE key (bypasses   component holds an open
(NOT a client-side Supabase      RLS) → writes to Postgres        Supabase Realtime
call, NOT Supabase Auth)                                          websocket subscription
                                        ↓                          on every content table
On success: update local         Postgres WAL feeds the                  ↓
React state + flash "✓ Saved"    Realtime engine → broadcasts     ANY insert/update/delete
                                  the change                       → debounced
                                                                    router.refresh()
                                                                    → server components
                                                                    re-fetch → page updates,
                                                                    no reload, ~1 second
```

Key architectural decision, and the reason it differs from a "standard" Supabase-Auth tutorial: **the admin portal does NOT use Supabase Auth.** It uses a custom `admin_credentials` table (bcrypt hash) + a signed HTTP-only session cookie, and every write goes through a **Next.js Server Action** using the Supabase **service-role key** (server-only, bypasses Row Level Security entirely). The browser — including the admin's browser — never holds a privileged Supabase key. This is a stronger security posture than shipping RLS policies keyed to `auth.email()`, because there is no client-side credential that can leak.

The public site is 100% server-rendered (fetches happen in `async` Server Components using the **anon key**, which is safe to ship to the browser because RLS only grants it `SELECT`).

---

## 3. Database & Row Level Security pattern

One migration file per feature, sequentially numbered (`001_x.sql`, `002_y.sql`, ...), plain SQL, run manually in the Supabase SQL Editor (no migration-runner tooling). Never edit an old migration file once it has shipped — add a new one.

For **every** content table:

```sql
create table if not exists public.[table_name] (
  id          uuid primary key default gen_random_uuid(),
  -- ...columns specific to this entity...
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.[table_name] enable row level security;

-- Public read: safe because RLS restricts this to SELECT only
create policy "Public read [table_name]" on public.[table_name]
  for select using (true);

-- Deliberately NO insert/update/delete policy for anon/authenticated.
-- All writes happen via the service-role client in server actions, which
-- bypasses RLS entirely and is never reachable from the browser.
```

The **one** table pattern that breaks this rule on purpose: `admin_credentials` (and any other purely-internal table, e.g. a login-rate-limit table) — RLS enabled, **zero policies at all**, so it's unreachable by anon/authenticated roles and only touchable by the service-role client.

If a public-facing write is genuinely needed (e.g. a newsletter/notification signup form on the public site), that is the **one** exception: a narrow `for insert` policy scoped to just that table, documented clearly as intentional. Never add a public `update` or `delete` policy.

Before shipping, audit every migration for accidental public write access:
```bash
grep -rn "for insert\|for update\|for delete\|for all" supabase/migrations/*.sql -i | grep -vi "service_role"
```
Anything that shows up here other than the one deliberate exception is a bug.

---

## 4. Auth & session model

`lib/auth.ts`:
- `admin_credentials` table: `email text`, `password_hash text` (bcrypt, cost 10+), `updated_at`. One row, created once via SQL Editor — never via a web form, never via an API route.
- Session: an HMAC-SHA256-signed token (`payload.signature`, payload = expiry timestamp), verified with `crypto.timingSafeEqual` (not `===`, to avoid timing attacks), stored in an **httpOnly, secure, sameSite=lax** cookie with an 8-hour TTL. Signed with a long random `ADMIN_SESSION_SECRET` env var.
- `isAdminAuthenticated()` — called at the top of the `/admin` page (a Server Component) to decide whether to render the login screen or the dashboard.
- `requireAdmin()` — called at the top of **every single server action** that writes data. Throws if not authenticated. Never trust the client to only call an action when logged in.

**Server-side login rate limiting (not just client-side!):** a `login_attempts` table (`identifier text primary key` = normalized email, `failed_count int`, `locked_until timestamptz`). On each login attempt: check if locked → if so reject with remaining seconds; on wrong password, increment and lock after 5 failures for 5 minutes; on success, delete the row. This **must** live server-side. A client-only localStorage lockout (nice for UX — show a countdown — but add it *in addition to*, never *instead of*, the server-side one) is trivially bypassed by clearing storage or calling the server action directly.

**Never** ship a "temporary diagnostic" or "repair" API route with a hardcoded secret key, even for debugging. One shipped on this project once (a `/api/admin-diag` route with a static key that could reset the admin password to a hardcoded hash) and sat live in production for weeks before being caught and deleted — that class of mistake is the single most dangerous thing you can do to a client's site. If you need to debug env vars or repair a row, do it directly in the Supabase SQL Editor / Vercel dashboard and never commit the tool that did it.

---

## 5. Server actions — the only way data changes

One file, `lib/actions.ts`, `"use server"` at the top. Every mutating function follows this exact shape:

```ts
export async function addXAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  // 1. Extract + validate every field from formData (allowlist enums, trim strings,
  //    parse numbers defensively — never trust the client).
  // 2. If a file was uploaded: validate it (see §7) before touching storage.
  // 3. const supabase = createServiceRoleClient();
  // 4. Write. On error, return { success: false, message: error.message }.
  // 5. revalidatePath() every public route that shows this data, + "/admin".
  // 6. Return { success: true, message: "...", row: data } — `row` matters for
  //    "add" actions so the admin UI can append the real DB-generated id/fields
  //    to local state without a full refetch.
}
```

`ActionResult` type: `{ success: boolean; message: string; ts?: number; row?: Record<string, unknown> }`.

The admin dashboard (a client component) calls these actions directly via a shared `runAction()` helper, and follows an **optimistic-after-confirm** pattern everywhere: `await` the server action, on failure `alert(message)` and stop, on success update local React state and flash a "✓ Saved" toast. Never update the UI before the server confirms.

---

## 6. Live realtime updates on the public site

One client component (`LiveRefresh.tsx`), mounted once in the root layout:

```ts
"use client";
// Subscribes to postgres_changes on every public content table via a single
// Supabase Realtime channel. On ANY event, debounce ~400ms then call
// router.refresh(). Don't try to patch state from the realtime payload —
// a full server-component refetch is simpler and bulletproof at this scale.
```

**Manual step that's easy to forget:** Supabase Dashboard → Database → Replication → enable Realtime on every content table (or run `alter publication supabase_realtime add table public.[table]` in a migration). Nothing breaks silently if you skip this — realtime just never fires and you won't notice until a client asks why their edit didn't show up.

Uses a plain browser Supabase client with the **anon key only** (`lib/supabase/client.ts`) — this client is used exclusively for the realtime subscription, never for reads or writes. All actual reads happen server-side; all writes go through server actions.

---

## 7. Image / file uploads

Every upload goes through Supabase Storage (one public bucket, e.g. `station-photos`), and **must** be validated server-side before it touches storage — the browser's declared `file.type` is not trustworthy on its own:

```ts
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8MB

function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return "Please upload a JPEG, PNG, WEBP or GIF image.";
  if (file.size > MAX_IMAGE_BYTES) return "Image is too large — please keep uploads under 8MB.";
  return null;
}
```

Public-facing card/grid images are locked to a fixed aspect ratio in CSS (e.g. `aspect-video` / 16:9) so that **any** correctly-sized upload displays edge-to-edge with zero cropping on every screen — never use a fixed-height box whose crop ratio changes with viewport width, that guarantees no upload size will ever fit correctly.

The admin's add/edit image forms show a mandatory size-requirement notice ("Required image size: 1920×1080 (16:9)") with an "I have read this" checkbox that **disables the Save button** until ticked, whenever a file is selected — this is the single control point that keeps every uploaded image consistent with the card frame it'll render in.

---

## 8. Admin portal — full UI spec

Single hidden route, `/admin` — never linked in navigation, `Disallow: /admin` in `robots.ts`.

### Login screen
- Split layout: ~50% branded panel (logo, dot-grid background, accent glow blobs) on desktop, hidden below `lg:`; compact logo header on mobile.
- Email + password, password show/hide toggle.
- Client-side lockout (localStorage, 5 attempts / 5-min countdown) **layered on top of** the server-side one (§4) — client one is instant UX feedback, server one is the real enforcement.
- No session persistence choice needed either way — decide with the client, but 8h server-side TTL either way.

### Dashboard shell
- Full-viewport (`h-[100dvh] flex flex-col overflow-hidden`), rendered **outside** the public site's Header/Footer.
- Top bar: hamburger (mobile), logo, title, pulsing "LIVE" pill, transient "✓ Saved" flash (auto-hides ~2s), primary "Add" button (context-aware — points at whichever section is open), "Sign Out".
- Sidebar: one entry per content section with a live item count, "Overview" as the default/landing view. Mobile: slide-in drawer with backdrop. Desktop: static.
- **Overview-only content:** welcome banner + stat cards + search bar belong on the Overview section *only* — other sections show just their own content, not the whole dashboard's furniture repeated everywhere.
- Search: live-filters whichever section is open, with a result count and clear button.
- Every list row: edit (round pencil) + delete. Delete swaps in-place to inline "Yes / No" — never use `window.confirm()`.
- 30-minute inactivity auto-logout (`mousedown`/`keydown`/`touchstart` reset a timer).
- Modals: bottom-sheet on mobile (slide up from `y: '100%'`), centered card on desktop, spring transition, dark backdrop closes on click.

### Per-entity "status" pattern (reusable for any content type)
Give status-bearing entities (products, listings, etc.) **both** a fixed enum (`available` / `out_of_stock` / `coming_soon` / `custom`, adapt to the domain) **and** a free-text `status_text` column that overrides the default label whenever it's set. This lets the owner write anything ("Fresh Daily", "Back in stock Friday", "Never returning") instead of being boxed into 3-4 fixed options, while everything still degrades gracefully to sensible defaults when left blank. Apply the same idea to anything with an active/inactive toggle (e.g. promotions/specials): let `status_text` keep an inactive item **visible but dimmed** with an explanatory message, instead of just vanishing — much better UX than a hard on/off switch for anything time-limited.

### "Image Prompts" admin page (optional but valuable — client differentiator)
A built-in library of ready-to-copy ChatGPT image-generation prompts, so the owner can produce their own on-brand marketing images without a designer. One master fill-in-the-blank prompt + dozens of category-specific ones. Every single prompt must enforce, without exception:
- The exact brand colour scheme for the ad's background/text/badges — but the **product/subject keeps its own real packaging colours**, only the ad chrome uses brand colours.
- No price digits and no business name rendered as text on the image, unless the client specifically wants that.
- Mandatory exact output size matching the site's card aspect ratio (e.g. "1920×1080, 16:9, 4K quality, full-bleed, no watermarks") — this is what makes the generated images actually fit the site without cropping.
- One-tap copy buttons in the admin UI, with an expandable preview.

---

## 9. Public site structure

- `Header` (sticky, mobile hamburger menu) — nav links should **scroll to top / scroll to their target anchor even when already on that page**, not just navigate. Next.js only auto-scrolls on an actual route or hash change; clicking a nav link for the page you're already on (at any scroll position) does nothing by default, which reads as a broken link. Fix with an `onClick` handler that checks `usePathname()` against the link's target and manually `scrollIntoView`/`scrollTo({top:0})` when they match.
- `Footer` — business contact info, and a small "Built by [YOUR AGENCY NAME]" credit linking to your own site, on every page.
- Content sections are `async` Server Components that fetch their own data directly (no prop-drilling from the page), wrapped in a scroll-reveal component (IntersectionObserver-based fade/slide-in).
- Any filterable list (category tabs + search) — **do not** force-remount the results grid with a `key` that changes on every filter click if list items already have stable individual keys. A forced remount restarts CSS entrance animations on the whole grid, which on mobile WebKit/Chrome can stall mid-paint during the touch event itself — this is the actual root cause of the classic "have to tap the filter twice on mobile" bug. Let React reconcile in place.
- Global CSS: `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` on all interactive elements (buttons, links) — removes the ~300ms tap delay / double-tap-to-zoom ambiguity on touch devices, a real and easy-to-miss cross-device polish item.
- Absolutely-positioned decorative badges that float **outside** a card's own box (e.g. a "Featured" ribbon poking above the top border) will get silently clipped to a sliver if that card also has `overflow-hidden` set (commonly added to clip an accent bar to the card's rounded corners) — keep such badges inside the card's normal padded content flow instead of floating them outside the box, it's the only version that can't be clipped on any device.

---

## 10. Performance target — Lighthouse 95+ across the board

This exact architecture, built as specified, scores **95+ in every Lighthouse category** (Performance, Accessibility, Best Practices, SEO) on the live production site — that is the bar for any project built from this blueprint, not an aspirational target. Run Lighthouse against the real deployed URL (not `localhost`, and not an unthrottled run) before calling a build done. The specific practices in this blueprint that get you there — don't skip them:

**Performance:**
- `next/image` for every public-facing photo (automatic WebP conversion, responsive `sizes`, lazy loading below the fold) — the admin dashboard's plain `<img>` tags are fine since admin isn't a page Lighthouse or a visitor ever scores.
- `next/font` for all custom fonts — self-hosted at build time, zero external font requests, no render-blocking `@import`, automatic `font-display: swap`.
- Server Components by default; client components (`"use client"`) only where actual interactivity is needed (nav menu toggle, filter/search state, the realtime subscription, the admin dashboard). Keeps shipped JS small.
- Static rendering (○) wherever the content doesn't need to be live per-request; reserve `force-dynamic` (ƒ) for routes that genuinely read fresh DB state on every visit (e.g. a page showing live admin-edited content). Check the build output table (`next build` prints ○ vs ƒ per route) and be able to justify every ƒ.
- Realtime refresh is debounced and event-driven (websocket push → refetch), never polling on an interval.
- Fixed aspect-ratio containers (`aspect-video`, etc.) on every image slot — this is also what prevents Cumulative Layout Shift, one of Lighthouse's heavier-weighted Performance metrics.

**Accessibility:**
- `alt` text required (form-validated, not optional) on every uploadable image.
- Visible focus states on every interactive element (`focus:ring` / `focus:border`, never `focus:outline-none` alone with nothing replacing it).
- `aria-label` on every icon-only button (menu toggles, up/down reorder arrows, close buttons).
- Colour contrast checked both ways: light text on the dark public site, and — easy to get wrong — solid dark text on light admin surfaces (low-opacity grey-on-white/yellow reads as invisible; verify with an actual contrast checker, not by eye).
- One `<h1>` per page, logical heading hierarchy down through sections.

**Best Practices:**
- HTTPS everywhere (Vercel + the custom domain's SSL, automatic).
- The full security header set from §11, including CSP — Lighthouse's Best Practices audit specifically checks for these.
- No console errors on load, no deprecated APIs, no layout-shift-causing unsized images (same aspect-ratio discipline as above).

**SEO:**
- Per-page `<title>` + meta description via the Next.js Metadata API, a title template in the root layout.
- `sitemap.ts` and `robots.ts` (App Router route handlers, not static files) — every real public route listed, `/admin` disallowed.
- `NEXT_PUBLIC_SITE_URL` drives canonical URLs and Open Graph tags from one source of truth (§12) — a wrong or missing canonical is a common silent SEO scoring loss.
- Structured data (JSON-LD) matching the business type (e.g. `LocalBusiness`/a more specific subtype) in the root layout.
- Mobile-friendly by construction: responsive Tailwind breakpoints throughout, real viewport meta, touch targets sized generously (buttons at minimum ~40px tap height).

---

## 11. HTTP security headers

In `next.config.mjs`, applied to every route via `headers()`:

```js
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",   // no nonce middleware — needed for hydration + any inline JSON-LD
  "style-src 'self' 'unsafe-inline'",     // needed for inline style={{}} usage
  "img-src 'self' data: blob: https://*.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src https://www.google.com",     // only if embedding a Google Maps iframe
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");
```
Plus: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (deny camera/mic/geolocation/payment/usb by default), `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

After adding these, actually run `next build && next start` locally and `curl -I` a few routes to confirm the headers are present and pages still render — a misconfigured CSP is a common way to silently break a production Next.js app.

---

## 12. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=            # Supabase → Project Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # safe to ship to the browser (RLS-gated)
SUPABASE_SERVICE_ROLE_KEY=           # SERVER ONLY. Never NEXT_PUBLIC_. Bypasses RLS.
ADMIN_SESSION_SECRET=                # openssl rand -hex 32
NEXT_PUBLIC_SITE_URL=                # https://the-real-domain.com — every canonical/OG/sitemap URL reads from this one value
```
Add any third-party API keys the client's site needs (maps, ratings, etc.), always server-only unless the key is explicitly safe to expose (check the provider's docs) and restricted by referrer/API in that provider's own console.

---

## 13. File structure

```
supabase/migrations/        Numbered .sql files, run manually in SQL Editor
src/
  app/
    page.tsx                 Public homepage, assembles section components
    layout.tsx                Root layout — fonts, metadata, mounts LiveRefresh
    robots.ts / sitemap.ts    Disallow /admin here
    admin/page.tsx             Server Component: isAdminAuthenticated() → LoginScreen or Dashboard
  components/
    [Section].tsx              One per public homepage section, async Server Components
    Header.tsx / Footer.tsx
    LiveRefresh.tsx             Realtime → router.refresh()
    admin/
      AdminLoginScreen.tsx
      AdminDashboard.tsx        Large single file is fine — sidebar, sections, modals, forms
  lib/
    supabase/server.ts          createServerClient() [anon] + createServiceRoleClient() [service-role]
    supabase/client.ts           Browser anon client, realtime-subscription use only
    auth.ts                      Session cookie + login rate limiting
    actions.ts                   ALL server actions, "use server"
    types.ts                     Every entity's TypeScript type
    data.ts                      Server-side read functions (with graceful fallback data)
    site-config.ts               Single source of truth for NAP/business facts
next.config.mjs                 Security headers + image remotePatterns
```

---

## 14. Deployment & domain

- Vercel project connected to the client's own GitHub account (never mix a client's production repo/credentials into your own personal account).
- Add the domain in Vercel → Domains. If DNS is staying with a third-party registrar: copy Vercel's given A/CNAME records into the registrar's DNS zone editor. **Simpler alternative** (recommended when the domain has no existing email hosting to preserve): click "Enable Vercel DNS" in Vercel, then change the domain's **nameservers** at the registrar to the two `ns1.vercel-dns.com` / `ns2.vercel-dns.com` Vercel provides — Vercel then manages all records automatically, no manual A/CNAME copying, and it auto-issues the SSL certificate once DNS propagates.
- After connecting the domain: explicitly **connect the apex domain** to the project (not just `www`) — Vercel treats them as separate connections; forgetting the apex leaves it showing a "Reserved for [domain]" placeholder even though `www` works.
- Update `NEXT_PUBLIC_SITE_URL` to the real domain in Vercel's environment variables and redeploy — everything else (sitemap, canonical tags, OG images) already reads from that one value.
- DNS/SSL propagation is not instant and not uniform — different resolvers around the world update at different speeds. A domain that works from the owner's own browser but not yet from your own machine/tools is normal, not broken; give it 15–60 minutes (up to a few hours for nameserver changes) before troubleshooting further.

---

## 15. Acceptance checklist

- [ ] `/admin` reachable only by URL, outside the public layout, disallowed in robots.txt
- [ ] Login checked against `admin_credentials` (bcrypt), never env vars or a hardcoded value
- [ ] 5 failed logins → 5-minute lockout enforced **server-side** (not just client-side)
- [ ] Every write goes through a server action calling `requireAdmin()` first, using the service-role client
- [ ] RLS: public SELECT-only on every content table, zero public write policies except one deliberate, documented exception if needed
- [ ] All file uploads validated server-side (MIME allowlist + size cap) before reaching storage
- [ ] Two browser windows open (admin + public page) — saving an edit in admin updates the public page within ~1s, no refresh
- [ ] Security headers present on every route (verify with `curl -I` against a real build)
- [ ] No diagnostic/repair API routes with hardcoded secrets anywhere in the codebase
- [ ] Filter/search UI works correctly on first tap on a real mobile device, not just desktop devtools emulation
- [ ] Nav links scroll to top/target even when already on that page
- [ ] Mobile-usable end to end: sidebar drawer, bottom-sheet modals, condensed tables
- [ ] `NEXT_PUBLIC_SITE_URL` matches the real production domain post-launch
- [ ] Lighthouse run against the live production URL scores 95+ in Performance, Accessibility, Best Practices, and SEO — this is the proven bar for this architecture (§10), not optional polish

---

## What to tell Claude for a new client

> Read the attached blueprint fully before writing any code — the security model, RLS pattern, and realtime chain are load-bearing and must be reproduced exactly; only branding, copy, and the specific content entities are adaptable. This is for [BUSINESS NAME], a [BUSINESS DESCRIPTION]. The content entities the owner needs to manage are: [LIST]. Brand colours are [COLORS]. Build the full structure end-to-end — I'll handle final UI polish and copy myself afterward.
