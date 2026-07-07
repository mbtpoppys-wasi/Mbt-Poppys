# MBT Poppys Ventersdorp

Next.js 14 (App Router) + Tailwind CSS site for **MBT Poppys Ventersdorp**, a 24-hour
fuel station and BUZZ Café convenience store at 38 Hendrik Potgieter Street, Ventersdorp,
South Africa.

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS, Orbitron + Plus Jakarta Sans via `next/font`
- **Database / Storage:** Supabase (Postgres + Storage)
- **Hosting:** Vercel
- **Repo:** GitHub

---

## 1. Where to put your photos

Drop your files in these two places, then use the exact naming pattern shown.

### Hero background (one file, checked into the repo)

Put your canopy photo here, named exactly:

```
public/images/hero-canopy.jpg
```

This is the full-bleed hero background and the Open Graph / Twitter share image.
Use a wide, high-resolution landscape shot (at least 1920×1080) so it doesn't look
stretched or pixelated on large monitors.

### Gallery photos (6–10 files, uploaded through /admin — not committed to git)

Gallery photos are **not** dragged into the repo. They live in Supabase Storage and
are managed from the `/admin` → "Photo Gallery" panel (upload a file, write alt text
and a caption, hit upload). If you'd rather add them directly in Supabase for the
first batch, upload to the `station-photos` bucket and insert a matching row in
`gallery_images` (see migration `003_gallery_images.sql`).

Name every gallery file lowercase, hyphen-separated, always including
"ventersdorp" and a real descriptive term, for example:

```
mbt-poppys-ventersdorp-fuel-station-canopy.jpg
mbt-poppys-ventersdorp-led-pylon-sign.jpg
buzz-cafe-ventersdorp-convenience-store.jpg
mbt-poppys-ventersdorp-forecourt-daytime.jpg
mbt-poppys-ventersdorp-drive-thru-deli.jpg
```

The alt text you type in `/admin` should also be descriptive and keyword-rich
(e.g. "MBT Poppys Ventersdorp fuel station canopy lit up at night") — never generic
text like "photo1".

---

## 2. Supabase setup

### 2.1 Create the tables

In your Supabase project, open **SQL Editor** and run each file in
`supabase/migrations/` in order (or paste them all into one query and run once):

| File | Table |
|---|---|
| `001_fuel_prices.sql` | `fuel_prices` |
| `002_cafe_products.sql` | `cafe_products` |
| `003_gallery_images.sql` | `gallery_images` |
| `004_notification_signups.sql` | `notification_signups` |
| `005_status_banner.sql` | `status_banner` |
| `006_storage_bucket.sql` | `station-photos` storage bucket + policy |

Each migration also enables Row Level Security and adds a public **read-only**
policy where the table is shown on the public site. There are no public
insert/update/delete policies (except the notification signup form, which allows
public insert only) — all admin writes go through the server-side service role key,
never through the browser.

### 2.2 Create the storage bucket

`006_storage_bucket.sql` creates the bucket via SQL. If you'd rather do it by hand:

1. Supabase Dashboard → **Storage** → **New bucket**
2. Name: `station-photos`
3. Public bucket: **ON**
4. Save, then still run the `storage.objects` policy statement from
   `006_storage_bucket.sql` in the SQL editor (bucket creation via the dashboard
   doesn't add the read policy for you).

---

## 3. Environment variables

Copy `.env.example` to `.env.local` for local dev, and add the same keys in Vercel
(Project Settings → Environment Variables) for Production, Preview, and Development.

| Variable | Where to get it | Exposed to browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon / `sb_publishable_...` key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role / `sb_secret_...` key | **No — server only** |
| `ADMIN_PASSWORD` | You choose | No |
| `ADMIN_SESSION_SECRET` | You generate, e.g. `openssl rand -hex 32` | No |
| `GOOGLE_PLACES_API_KEY` | Google Cloud Console → Credentials (restrict to Places API) | **No — server only** |
| `GOOGLE_PLACES_PLACE_ID` | [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id) | No |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | Google Cloud Console → Credentials (restrict to Maps Embed API + your domain) | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL | Yes |

Never commit `.env.local` or paste secret values (service role key, admin password,
API keys) into chat, issues, or commit messages — only the public/publishable ones
are safe to share.

---

## 4. Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values from section 3
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` for the
owner admin panel. Without Supabase configured yet, the homepage still renders using
built-in fallback fuel prices so you can preview styling immediately.

---

## 5. Git & GitHub

The repo has already been initialized locally with a `.gitignore` covering
`node_modules`, `.env*`, `.next`, etc. To push it to GitHub:

```bash
git add .
git commit -m "Initial commit: MBT Poppys Ventersdorp site"
git branch -M main
gh repo create mbt-poppys-ventersdorp --source=. --public --remote=origin
git push -u origin main
```

If you'd rather create the repo by hand on github.com instead of using `gh`:

```bash
git remote add origin https://github.com/<your-username>/mbt-poppys-ventersdorp.git
git push -u origin main
```

---

## 6. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and **Import** the GitHub repo
   (or run `vercel` from the project root with the Vercel CLI installed).
2. When prompted for environment variables, add every variable listed in section 3
   for all environments.
3. Deploy. Vercel auto-detects Next.js — no custom build settings needed.
4. The project will initially live at a `*.vercel.app` subdomain
   (e.g. `mbt-poppys-ventersdorp.vercel.app`). Update `NEXT_PUBLIC_SITE_URL` to match
   once you know the final URL, and redeploy.

### Attaching a custom `.co.za` domain later

Once you purchase a `.co.za` domain:

1. Vercel Dashboard → your project → **Settings → Domains** → **Add**.
2. Enter the domain (e.g. `mbtpoppysventersdorp.co.za`).
3. Vercel shows the DNS records to add (usually an `A` record or `CNAME`) — add
   those at your domain registrar.
4. Wait for DNS propagation and Vercel's automatic SSL certificate to issue.
5. Update `NEXT_PUBLIC_SITE_URL` in Vercel's env vars to the new domain and redeploy
   so canonical URLs, sitemap, and Open Graph tags all point to the final domain.

---

## 7. NAP consistency — read this before publishing

**Name, Address, and Phone number (NAP) must match character-for-character** across:

- This site (`src/lib/site-config.ts` — `businessName`, `address`, `phoneDisplay`)
- Your Google Business Profile listing
- Any directory listing (Bing Places, HERE Maps, Yelp, Brabys, Yellow Pages SA)

Inconsistent NAP is a real, measurable local-SEO ranking penalty. Before launch:

1. Open `src/lib/site-config.ts` and update `phoneDisplay`, `phoneE164`, and
   `geo.latitude` / `geo.longitude` to the exact values from your Google Business
   Profile (the placeholder phone number and coordinates in this repo are estimates
   for Ventersdorp and **must** be corrected).
2. Update `googleMapsDirectionsUrl`, `googleReviewUrl`, and `googleWriteAReviewUrl`
   once you have your Google Business Profile's real place ID / short link.
3. Cross-check the address formatting (abbreviations, punctuation, suite numbers)
   matches GBP exactly — "38 Hendrik Potgieter Street" vs "38 Hendrik Potgieter St" counts as a
   mismatch to some directories.

---

## 8. Google Business Profile checklist

- [ ] Primary category: **Gas Station**; secondary category: **Convenience Store**
- [ ] Upload 15–20+ real photos directly to GBP (forecourt, canopy, BUZZ Café,
      signage, staff) — separate from the gallery on this site
- [ ] Post a **Google Post** every 1–2 weeks (fuel price updates, promotions, news)
- [ ] Reply to **every** review, including old unanswered ones
- [ ] List the business with **identical NAP** (see section 7) on:
  - Bing Places
  - HERE Maps
  - Yelp
  - Brabys
  - Yellow Pages South Africa

---

## 9. SEO & performance notes

- Full `GasStation` + `LocalBusiness`-style JSON-LD is rendered server-side in
  `src/app/layout.tsx` via `src/lib/json-ld.ts`, including `aggregateRating` pulled
  live from the Google Places API (`src/lib/google-places.ts`, revalidated every 24h).
- `sitemap.xml` and `robots.txt` are generated by `src/app/sitemap.ts` and
  `src/app/robots.ts` (App Router built-ins — no extra package needed).
- All fonts load through `next/font/google` (no render-blocking `<link>` tags).
- All images use `next/image`; the hero uses `priority`, gallery images below the
  fold use `loading="lazy"`.
- Run `npm run build` and check the Lighthouse report (Chrome DevTools → Lighthouse)
  after adding real photos — performance and SEO should both score above 90 once the
  hero photo is reasonably compressed (aim under ~300KB for `hero-canopy.jpg`).

### Known dependency advisories

`npm audit` will show a handful of advisories against `next`/`glob`/`postcss` that
apply broadly across the Next.js 14.x/15.x/16.x canary range. `package.json` pins the
latest patched Next.js **14.2.x** release available at the time of writing
(`14.2.35`); fully clearing every advisory would require moving to Next 16, which is
a separate major-version upgrade outside this project's Next 14 scope. Re-run
`npm outdated` / `npm audit` periodically and take the newest 14.2.x patch as it
ships.

---

## 10. Project structure

```
src/
  app/
    page.tsx              Home page, assembles all sections
    layout.tsx             Fonts, metadata, JSON-LD
    sitemap.ts / robots.ts SEO routes
    admin/page.tsx          Password-gated owner dashboard
  components/               Section components (Hero, FuelPricesSection, etc.)
  components/admin/          Admin dashboard forms
  lib/
    supabase/server.ts       Anon + service-role Supabase clients
    data.ts                  Server-side data fetchers (with fallback data)
    actions.ts               Server actions (admin writes, notification signup)
    auth.ts                  Admin password check + signed session cookie
    site-config.ts           NAP + business facts (single source of truth)
    hours.ts                 Opening-hours table + isOpenNow() logic
    google-places.ts         Cached Google Places rating fetch
    json-ld.ts                Structured data builder
supabase/migrations/         SQL migrations, run in the Supabase SQL editor
```
