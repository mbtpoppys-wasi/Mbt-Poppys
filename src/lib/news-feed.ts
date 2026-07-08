import { XMLParser } from "fast-xml-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

// News24's feeds return 403 to server-side/bot requests, so this pulls from
// two SA outlets that publish genuinely public RSS feeds instead, filtered
// down to fuel/petrol/diesel-related stories.
const FEEDS = [
  { url: "https://mybroadband.co.za/news/feed", source: "MyBroadband" },
  { url: "https://www.moneyweb.co.za/feed/", source: "Moneyweb" },
];

const FUEL_KEYWORDS = ["fuel", "petrol", "diesel", "fuel price", "fuel levy", "sarb", "zar/usd", "brent crude", "oil price"];

function isFuelRelated(title: string, categories: string[]): boolean {
  const haystack = `${title} ${categories.join(" ")}`.toLowerCase();
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

async function fetchFeed(url: string, source: string): Promise<NewsItem[]> {
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
      .map((item: Record<string, unknown>) => {
        const title = textOf(item.title);
        const rawCategory = item.category;
        const categories = Array.isArray(rawCategory)
          ? rawCategory.map(textOf)
          : rawCategory
            ? [textOf(rawCategory)]
            : [];
        return {
          title,
          link: textOf(item.link) || String(item.link ?? ""),
          pubDate: textOf(item.pubDate) || String(item.pubDate ?? ""),
          source,
          categories,
        };
      })
      .filter((item) => item.title && item.link && isFuelRelated(item.title, item.categories))
      .map(({ categories: _categories, ...rest }) => rest);
  } catch {
    return [];
  }
}

export async function getFuelNews(): Promise<NewsItem[]> {
  const results = await Promise.all(FEEDS.map((feed) => fetchFeed(feed.url, feed.source)));
  const merged = results.flat();

  merged.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return merged.slice(0, 8);
}
