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
    })),
  ];

  if (photos.length === 0) return null;

  return (
    <section id="gallery" className="bg-mbtDark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-wide text-white sm:text-4xl">
            Around The <span className="text-mbtYellow">Station</span>
          </h2>
          <p className="mt-3 text-white/60">
            A look at the forecourt, canopy, and BUZZ Café in Ventersdorp.
          </p>
        </div>

        {/* Mobile: horizontal scroll-snap carousel. Desktop: grid. */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className="group relative aspect-[4/3] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 sm:w-auto sm:flex-shrink"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 py-4 text-sm text-white opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
