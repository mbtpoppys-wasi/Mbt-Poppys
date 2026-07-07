"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClickableImage({
  src,
  alt,
  sizes,
  priority = false,
  caption,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger image: ${alt}`}
        className="group relative block h-full w-full cursor-zoom-in overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-8 w-8 scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
          >
            <circle cx="11" cy="11" r="7" strokeWidth={1.8} />
            <path strokeLinecap="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </span>
        {caption && (
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-left text-xs font-semibold text-white">
            {caption}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close image"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-full max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
