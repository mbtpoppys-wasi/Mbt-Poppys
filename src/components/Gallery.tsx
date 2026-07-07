import Image from "next/image";
import { getGalleryImages, getGalleryImageUrl } from "@/lib/data";
import { LOCAL_GALLERY_PHOTOS } from "@/lib/local-gallery";

export default async function Gallery() {
  const dbImages = await getGalleryImages();

  const photos = [
    ...LOCAL_GALLERY_PHOTOS,
    ...dbImages.map((image) => ({
      id: image.id,
      src: getGalleryImageUrl(image.filename),
      alt: image.alt_text,
      caption: image.caption,
      subtitle: undefined as string | undefined,
    })),
  ];

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="border-b border-white/10 bg-mbtDark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-white sm:text-4xl">
            Visit Our <span className="text-mbtYellow">Forecourt</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-mbtYellow" />
        </div>

        {/* Mobile: horizontal scroll-snap carousel. Desktop: grid. */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className="group relative aspect-[4/3] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:w-auto sm:flex-shrink"
            >
              <div className="absolute inset-0 z-10 bg-mbtYellow/20 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-100" />
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 to-transparent px-4 py-4 text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  <p className="font-display text-lg tracking-wide text-mbtYellow">{photo.caption}</p>
                  {photo.subtitle && (
                    <p className="text-xs font-medium text-gray-300">{photo.subtitle}</p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
