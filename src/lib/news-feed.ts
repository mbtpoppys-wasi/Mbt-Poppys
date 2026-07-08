import { XMLParser } from "fast-xml-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

// News24's feeds return 403 to server-side/bot requests, so this pulls from
// two SA outlets' dedicated "fuel-price" tag feeds instead. MyBroadband's
// tag feed tested cleanly on-topic, so it's trusted as-is; Moneyweb's tag
// feed mixes in unrelated finance stories, so it still gets the keyword
// filter as a safety net.
const FEEDS: { url: string; source: string; trusted: boolean }[] = [
  { url: "https://mybroadband.co.za/news/tag/fuel-price/feed", source: "MyBroadband", trusted: true },
  { url: "https://www.moneyweb.co.za/tag/fuel-price/feed/", source: "Moneyweb", trusted: false },
];

// English + Afrikaans (Moneyweb publishes bilingual content) — kept narrow
// on purpose. Broader macro-econ terms (SARB, ZAR/USD, oil price, brent
// crude) matched way too much unrelated finance news in testing.
const FUEL_KEYWORDS = ["fuel", "petrol", "diesel", "brandstof"];

function isFuelRelated(title: string): boolean {
  const haystack = title.toLowerCase();
  return FUEL_KEYWORDS.some((kw) => haystack.includes(kw));
}

const parser = new XMLParser({ ignoreAttributes: false, cdataPropName: "__cdata" });

function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "__cdata" in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>).__cdata);
  }
  return "";
}

async function fetchFeed(url: string, source: string, trusted: boolean): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MBTPoppysBot/1.0)" },
      next: { revalidate: 60 * 60 * 6 }, // 6h
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const parsed = parser.parse(xml);
    const items = parsed?.rss?.channel?.item;
    const list = Array.isArray(items) ? items : items ? [items] : [];

    return list
      .map((item: Record<string, unknown>) => ({
        title: textOf(item.title),
        link: textOf(item.link) || String(item.link ?? ""),
        pubDate: textOf(item.pubDate) || String(item.pubDate ?? ""),
        source,
      }))
      .filter((item) => item.title && item.link && (trusted || isFuelRelated(item.title)));
  } catch {
    return [];
  }
}

export async function getFuelNews(): Promise<NewsItem[]> {
  const results = await Promise.all(FEEDS.map((feed) => fetchFeed(feed.url, feed.source, feed.trusted)));
  const merged = results.flat();

  merged.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return merged.slice(0, 8);
}
