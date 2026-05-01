import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "./RevealOnScroll";
import type { SiteDictionary } from "@/lib/i18n";

type Props = {
  copy: SiteDictionary["gallery"];
  images: Array<{
    src: string;
    label: string;
    sub: string;
    featured?: boolean;
  }>;
};

export default function Gallery({ copy, images }: Props) {
  return (
    <section id="preview" className="bg-page py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <p className="section-label mb-4">{copy.eyebrow}</p>
          <h2
            className="font-heading text-ink leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {copy.title}{" "}
            <em className="text-maroon not-italic">{copy.accent}</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-16 bg-gold/50" />
            <span className="text-gold text-base">✦</span>
            <span className="block h-px w-16 bg-gold/50" />
          </div>
        </RevealOnScroll>

        {/* Bento grid — featured 2×2 top-left, 2 stacked right, 3 equal bottom row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3"
          style={{ gridAutoRows: "220px" }}
        >
          {images.map((img, i) => (
            <RevealOnScroll
              key={img.src}
              delay={(i % 3) as 0 | 1 | 2 | 3 | 4}
              className={`group relative overflow-hidden${
                img.featured
                  ? " col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  img.featured
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 1024px) 50vw, 33vw"
                }
              />

              {/* Always-on soft vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />

              {/* Hover: rich overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/85 via-maroon/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Label — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="h-px w-6 bg-gold mb-2" />
                <p
                  className="font-heading text-cream leading-snug"
                  style={{ fontSize: img.featured ? "1.25rem" : "0.875rem" }}
                >
                  {img.label}
                </p>
                <p className="text-cream/70 text-xs mt-0.5 tracking-wide">{img.sub}</p>
              </div>

              {/* Gold inset border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-gold/50 transition-all duration-500" />
            </RevealOnScroll>
          ))}
        </div>

        {/* Pull quote + CTA */}
        <RevealOnScroll className="mt-16 lg:mt-20 text-center">
          <div className="flex items-center justify-center gap-5 mb-6">
            <span className="block h-px w-12 bg-gold/40" />
            <span className="text-gold/50 text-xs">✦</span>
            <span className="block h-px w-12 bg-gold/40" />
          </div>
          <blockquote
            className="font-heading text-ink-muted italic mx-auto max-w-xl"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.35rem)" }}
          >
            &quot;Every table holds a story. Every dish, a memory.&quot;
          </blockquote>
          <div className="mt-8">
            <Link href="/en/menu" className="masala-btn masala-btn-filled px-8 py-3">
              Explore Our Menu
            </Link>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
