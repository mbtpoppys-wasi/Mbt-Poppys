import ClickableImage from "@/components/ClickableImage";
import Reveal from "@/components/Reveal";

export default function ImageFeatureRow({
  src,
  alt,
  label,
  title,
  highlight,
  description,
  reverse = false,
  tint = "bg-mbtDark",
}: {
  src: string;
  alt: string;
  label: string;
  title: string;
  highlight?: string;
  description: string;
  reverse?: boolean;
  tint?: string;
}) {
  return (
    <section className={`flex flex-col border-b border-white/10 sm:flex-row ${tint}`}>
      <div className={`relative h-64 w-full sm:h-[420px] sm:w-1/2 ${reverse ? "sm:order-2" : ""}`}>
        <ClickableImage src={src} alt={alt} sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
      <Reveal
        className={`flex w-full flex-col justify-center px-6 py-12 sm:w-1/2 sm:px-12 lg:px-16 ${
          reverse ? "sm:order-1" : ""
        }`}
      >
        <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mbtYellow">
          {label}
        </span>
        <h3 className="font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          {title} {highlight && <span className="text-mbtYellow text-shadow-led">{highlight}</span>}
        </h3>
        <p className="mt-4 max-w-md text-sm text-white/60 sm:text-base">{description}</p>
      </Reveal>
    </section>
  );
}
