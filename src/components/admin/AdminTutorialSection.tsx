"use client";

import {
  AlertTriangle,
  ArrowUpDown,
  BadgePercent,
  Bell,
  BookOpen,
  Coffee,
  Copy,
  ExternalLink,
  Fuel,
  Images,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Smartphone,
  Wand2,
} from "lucide-react";
import { TOTAL_PROMPTS } from "@/lib/image-prompts";
import { IMAGE_SIZE_RULE, SectionCard } from "@/components/admin/AdminDashboard";

const CHATGPT_URL = "https://chatgpt.com/";

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-mbtYellow text-[11px] font-bold text-mbtDark">
        {n}
      </span>
      <span className="pt-0.5 text-sm leading-relaxed text-mbtDark">{children}</span>
    </li>
  );
}

function Guide({
  icon: Icon,
  title,
  livesOn,
  children,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  livesOn?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-mbtDark bg-mbtGray/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-mbtYellow/15 text-mbtDark">
          <Icon size={14} />
        </span>
        <p className="text-sm font-bold text-mbtDark">{title}</p>
        {livesOn && (
          <span className="ml-auto rounded-full bg-mbtDark/5 px-2 py-0.5 text-[10px] font-semibold text-mbtDark">
            {livesOn}
          </span>
        )}
      </div>
      <ol className="space-y-2 pl-1">{children}</ol>
    </div>
  );
}

export default function AdminTutorialSection() {
  return (
    <div className="space-y-6">
      <SectionCard icon={BookOpen} title="Tutorial" subtitle="How to use every part of this admin portal">
        <p className="text-sm leading-relaxed text-mbtDark">
          Everything you change in this portal goes live on the website within seconds — there&apos;s
          no separate &quot;publish&quot; step. Use the menu on the left (or the ☰ button on
          mobile) to jump straight to any section below.
        </p>
      </SectionCard>

      <SectionCard icon={LayoutDashboard} title="Overview & the basics" subtitle="First page you see">
        <div className="space-y-3">
          <Guide icon={LayoutDashboard} title="The stat tiles">
            <Step n={1}>
              The Overview page shows four quick numbers: today&apos;s Petrol 95 price, how many
              Café products you have, how many Specials are currently active, and how many Fuel
              Updates exist.
            </Step>
            <Step n={2}>
              These are read-only shortcuts to help you see the state of the site at a glance —
              tap the matching menu item to actually edit any of them.
            </Step>
          </Guide>

          <Guide icon={Search} title="The search bar">
            <Step n={1}>
              Visible on Overview, BUZZ Café, Specials and Fuel Updates. Type to instantly filter
              products, specials or announcements by name/message.
            </Step>
            <Step n={2}>Tap the ✕ on the right of the search box to clear it.</Step>
          </Guide>

          <Guide icon={Plus} title="The + Add button (top right)">
            <Step n={1}>
              Opens a form to create something new for whichever section you&apos;re currently
              viewing — a café product, a special, or a café photo.
            </Step>
          </Guide>

          <Guide icon={LogOut} title="Signing out & session timeout">
            <Step n={1}>
              Tap <strong>Sign Out</strong> (top right) any time to log out immediately.
            </Step>
            <Step n={2}>
              For security, you&apos;ll also be signed out automatically after 30 minutes of no
              activity.
            </Step>
          </Guide>

          <Guide icon={Smartphone} title="Installing this as an app on your phone">
            <Step n={1}>
              When you open this admin page on your phone, a black banner appears at the top
              offering to install it to your home screen.
            </Step>
            <Step n={2}>
              On iPhone it shows you the manual steps (Share → Add to Home Screen) since Apple
              doesn&apos;t allow one-tap installs. On Android/Chrome, tap{" "}
              <strong>Install App</strong> and confirm.
            </Step>
            <Step n={3}>
              Once installed, it opens full-screen like a real app — no browser bar, with the
              round MBT logo as its icon.
            </Step>
          </Guide>
        </div>
      </SectionCard>

      <SectionCard icon={Fuel} title="Fuel Prices" subtitle="Shown on the homepage">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            There are four fixed fuel types: Petrol 95, Petrol 93, Diesel 50ppm, and Diesel
            10ppm — you can&apos;t add or remove fuel types, only update their prices.
          </Step>
          <Step n={2}>
            Tap the pencil icon next to any fuel type, enter the new price, and save. It updates
            the homepage immediately.
          </Step>
        </ol>
      </SectionCard>

      <SectionCard icon={AlertTriangle} title="Status Banner" subtitle="Top of every page on the site">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            This is the notice strip at the very top of the website — normally used for things
            like &quot;We&apos;re on generator power, pumps and café fully operational.&quot;
          </Step>
          <Step n={2}>
            Flip the toggle to show or hide it, type your message, and tap{" "}
            <strong>Save Banner</strong>. Turn it off when there&apos;s nothing to announce.
          </Step>
        </ol>
      </SectionCard>

      <SectionCard icon={Coffee} title="BUZZ Café Products" subtitle="/buzz-cafe">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            Tap <strong>+ Add</strong> to create a product, or the pencil icon on an existing one
            to edit it.
          </Step>
          <Step n={2}>
            Fields: <strong>Category</strong> (Fresh Bakery, Cold Drinks, Travel Snacks, Tobacco
            &amp; Vapes, Braai &amp; Outdoor, or Essentials), <strong>name</strong>,{" "}
            <strong>description</strong>, and an optional <strong>price</strong>.
          </Step>
          <Step n={3}>
            <strong>Status</strong> controls the badge shown on the product: Available, Out of
            Stock, Coming Soon, Removed, or Custom (type your own status text, e.g. &quot;Back
            Friday&quot;).
          </Step>
          <Step n={4}>
            Tick <strong>Best Price</strong> to add a gold ★ badge highlighting it as a standout
            deal.
          </Step>
          <Step n={5}>
            If you upload a photo, it must be exactly <strong>{IMAGE_SIZE_RULE}</strong> or it
            will be cropped to fit — tick the confirmation checkbox once you&apos;ve checked this.
          </Step>
          <Step n={6}>
            Use the trash icon to delete a product (tap once, then confirm with Yes/No).
          </Step>
        </ol>
      </SectionCard>

      <SectionCard icon={Images} title="Café Photos" subtitle="Gallery at the top of /buzz-cafe">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            These are the shelf/store photos shown in the gallery strip at the top of the BUZZ
            Café page — separate from individual product photos.
          </Step>
          <Step n={2}>
            Tap <strong>+ Add</strong>, upload a photo ({IMAGE_SIZE_RULE}) and an optional
            caption.
          </Step>
          <Step n={3}>
            Use the ▲▼ arrows next to each photo to reorder how they appear on the website.
          </Step>
        </ol>
      </SectionCard>

      <SectionCard icon={BadgePercent} title="Specials" subtitle="/specials">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            Tap <strong>+ Add</strong> for a new special, with a title, description, optional
            photo ({IMAGE_SIZE_RULE}), and an optional status badge (e.g. &quot;This week
            only&quot;).
          </Step>
          <Step n={2}>
            Flip the green toggle to make a special active/inactive — inactive specials stay
            saved here but disappear from the live site.
          </Step>
          <Step n={3}>
            Use the ▲▼ arrows to reorder which special shows first on the /specials page.
          </Step>
        </ol>
      </SectionCard>

      <SectionCard icon={Bell} title="Fuel Updates" subtitle="/fuel-updates">
        <ol className="space-y-2 pl-1">
          <Step n={1}>
            Short announcements — price changes, stock news, temporary closures — shown on the
            Fuel Updates page.
          </Step>
          <Step n={2}>
            Type your message in the composer at the top of this page and post it directly, no
            need to tap Add first.
          </Step>
          <Step n={3}>
            Toggle an update active/inactive, edit its text, or delete it with the trash icon.
          </Step>
        </ol>
      </SectionCard>

      {/* ── Image Prompts — the emphasised section ── */}
      <SectionCard
        icon={Wand2}
        title="Image Prompts (in depth)"
        subtitle={`${TOTAL_PROMPTS} ready-made ChatGPT prompts for your advert images`}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-mbtDark">
            This page exists so you never have to design an advert image yourself, or hire
            someone to. Every prompt is pre-written to force the exact MBT look (yellow
            headlines, white supporting text, deep black background, no price or station name
            printed on the image) and the exact size the website needs.
          </p>

          <a
            href={CHATGPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-mbtYellow px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-mbtDark shadow-lg shadow-mbtYellow/25 transition hover:brightness-95 active:scale-[0.99]"
          >
            Open ChatGPT
            <ExternalLink size={15} />
          </a>

          <Guide icon={Copy} title="Step by step, from start to finish">
            <Step n={1}>
              Go to the <strong>Image Prompts</strong> page in the menu on the left.
            </Step>
            <Step n={2}>
              For a normal special or product ad, tap <strong>Copy</strong> on the yellow{" "}
              <strong>&quot;Start here — the master prompt&quot;</strong> box at the top. For a
              specific style (explosion, neon, cinematic spotlight, etc.), scroll down to a
              category and copy that prompt instead — all {TOTAL_PROMPTS} work the same way.
            </Step>
            <Step n={3}>
              Tap the <strong>Open ChatGPT</strong> button above (or go to{" "}
              <a
                href={CHATGPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-mbtDark underline underline-offset-2"
              >
                chatgpt.com
              </a>{" "}
              yourself) and log in or create a free account if you don&apos;t have one already.
            </Step>
            <Step n={4}>Paste the copied prompt into the ChatGPT message box.</Step>
            <Step n={5}>
              Before sending, replace every <strong>[BRACKETED]</strong> part with your real
              details — the product name, the offer, the price, the dates. For example{" "}
              <span className="italic">
                &quot;[DESCRIBE IT]&quot;
              </span>{" "}
              might become{" "}
              <span className="italic">
                &quot;2 x Redbull cans for R35, this weekend only&quot;
              </span>
              .
            </Step>
            <Step n={6}>
              Send the message. ChatGPT will generate the image — it comes out at exactly 1920 ×
              1080 (16:9), 4K quality, already in MBT&apos;s yellow/white/black branding, with no
              price or station name baked into the image (so it always looks right in the
              website&apos;s image frames).
            </Step>
            <Step n={7}>
              Download the image from ChatGPT, then upload it wherever you&apos;re adding the
              product/special/photo in this portal (BUZZ Café, Specials, or Café Photos).
            </Step>
            <Step n={8}>
              Not happy with the result? Ask ChatGPT directly in the same chat to tweak it
              (&quot;make the headline bigger&quot;, &quot;try a different background&quot;) —
              or go back and copy a different prompt style for a completely different look.
            </Step>
          </Guide>

          <div className="rounded-xl border border-mbtDark bg-mbtYellow/15 p-4">
            <p className="text-xs font-bold text-mbtDark">Good to know</p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-mbtDark">
              <li>
                Every prompt already bans prices and the MBT name from appearing as text on the
                image — that&apos;s deliberate, so the image can be reused even if the price
                changes.
              </li>
              <li>
                The product itself (e.g. a Coca-Cola can or an Energade bottle) keeps its own
                real packaging colours — only the background and headline text follow the MBT
                yellow/white/black theme.
              </li>
              <li>
                Tap a prompt&apos;s title to expand and read its exact wording before copying, if
                you want to check it first.
              </li>
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={ArrowUpDown} title="Quick reference">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["Fuel Prices", "Edit only — 4 fixed types"],
            ["Status Banner", "One toggle + one message"],
            ["BUZZ Café", "Add / edit / delete, by category"],
            ["Café Photos", "Add / reorder / delete"],
            ["Specials", "Add / edit / toggle / reorder / delete"],
            ["Fuel Updates", "Post / toggle / edit / delete"],
            ["Image Prompts", "Copy → ChatGPT → fill in → download"],
          ].map(([label, hint]) => (
            <div
              key={label}
              className="rounded-xl border border-mbtDark bg-mbtGray/40 px-3 py-2.5"
            >
              <p className="text-xs font-bold text-mbtDark">{label}</p>
              <p className="mt-0.5 text-[11px] text-mbtDark">{hint}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
