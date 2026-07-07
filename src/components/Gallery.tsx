import { getGalleryImages, getGalleryImageUrl } from "@/lib/data";
import ClickableImage from "@/components/ClickableImage";
import Reveal from "@/components/Reveal";

// Renders only photos the owner has uploaded via /admin (Supabase-backed).
// The launch photo set now lives contextually across the site instead
// (hero, the night showcase banner, and the BUZZ Cafe feature rows)
// rather than bunched into one gallery grid.
export default async function Gallery() {
  const dbImages = await getGalleryImages();

  if (dbImages.length === 0) return null;

  return (
    <section id="gallery" className="border-b border-white/10 bg-mbtDark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-white sm:text-4xl">
            More <span className="text-mbtYellow">Photos</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-mbtYellow" />
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {dbImages.map((image, index) => (
            <Reveal
              key={image.id}
              delay={index * 60}
              className="relative aspect-[4/3] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:w-auto sm:flex-shrink"
            >
              <ClickableImage
                src={getGalleryImageUrl(image.filename)}
                alt={image.alt_text}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                caption={image.caption}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
