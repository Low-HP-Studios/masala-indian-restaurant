import { SkeletonImage } from "@/components/SkeletonImage";
import type { CSSProperties } from "react";
import MotionPressable from "./MotionPressable";
import RevealOnScroll from "./RevealOnScroll";
import RouteTransitionLink from "./RouteTransitionLink";
import type { SiteDictionary } from "@/lib/i18n";
import { type Locale, localizePath } from "@/lib/locales";

type Props = {
  locale: Locale;
  copy: SiteDictionary["story"];
  image: {
    src: string;
    alt: string;
  };
};

export default function Story({ locale, copy, image }: Props) {
  return (
    <section id="about" className="bg-page py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <RevealOnScroll>
            <p className="section-label mb-6">{copy.eyebrow}</p>
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-12 bg-gold" />
              <span className="text-gold">✦</span>
            </div>
            <h2
              className="font-heading text-ink leading-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              {copy.title}
              <br />
              <em className="text-maroon not-italic">{copy.accent}</em>
            </h2>
            <p className="text-ink-muted font-body leading-relaxed mb-6 text-lg">
              {copy.body1}
            </p>
            <p className="text-ink-muted font-body leading-relaxed mb-10">
              {copy.body2}
            </p>

            <div className="flex items-center gap-6">
              <MotionPressable>
                <a
                  href="tel:+34631751388"
                  className="masala-btn masala-btn-filled px-7 py-3.5 text-sm font-semibold font-body text-cream"
                  style={{ "--button-fill": "var(--maroon)" } as CSSProperties}
                >
                  {copy.primary}
                </a>
              </MotionPressable>
              <MotionPressable>
                <RouteTransitionLink
                  href={localizePath(locale, "/menu")}
                  className="text-sm font-semibold font-body text-maroon border-b border-maroon/40 hover:border-maroon transition-colors duration-300 pb-0.5"
                >
                  {copy.secondary} →
                </RouteTransitionLink>
              </MotionPressable>
            </div>
          </RevealOnScroll>

          {/* Image grid */}
          <RevealOnScroll delay={2} className="relative">
            {/* Main image */}
            <div className="relative aspect-4/5 rounded-sm overflow-hidden shadow-2xl">
              <SkeletonImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                skeletonClassName="bg-line/50"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-saffron/5" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-maroon text-cream p-6 shadow-xl hidden lg:block">
              <p className="font-heading text-4xl font-semibold text-gold">
                €19.95
              </p>
              <p className="text-sm text-cream/80 font-semibold font-body mt-1">
                {copy.stat}
              </p>
            </div>

            {/* Gold border accent */}
            <div
              className="absolute -top-4 -right-4 w-full h-full border border-gold/30 rounded-sm pointer-events-none hidden lg:block"
              style={{ transform: "translate(8px, 8px)" }}
              aria-hidden="true"
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
