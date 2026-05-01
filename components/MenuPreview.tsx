import { SkeletonImage } from "@/components/SkeletonImage";
import MotionLift from "./MotionLift";
import MotionPressable from "./MotionPressable";
import RevealOnScroll from "./RevealOnScroll";
import RouteTransitionLink from "./RouteTransitionLink";
import type { SiteDictionary } from "@/lib/i18n";
import { type Locale, localizePath } from "@/lib/locales";

type Props = {
  locale: Locale;
  copy: SiteDictionary["menuPreview"];
};

export default function MenuPreview({ locale, copy }: Props) {
  return (
    <section className="bg-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealOnScroll className="text-center mb-16">
          <p className="section-label text-saffron mb-4">{copy.eyebrow}</p>
          <h2
            className="font-heading text-cream leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {copy.title} <em className="text-gold not-italic">{copy.accent}</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-12 bg-gold/40" />
            <span className="text-gold text-sm">✦</span>
            <span className="block h-px w-12 bg-gold/40" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {copy.categories.map((cat, i) => (
            <RevealOnScroll key={cat.id} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <MotionLift>
                <RouteTransitionLink
                  href={localizePath(locale, `/menu#${cat.id}`)}
                  className="group relative block w-full aspect-3/4 overflow-hidden"
                >
                  <SkeletonImage
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    skeletonClassName="bg-zinc-800"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent transition-opacity duration-300 group-hover:from-maroon/80" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-saffron-light text-xs font-semibold font-body mb-1">
                      {cat.tagline}
                    </p>
                    <h3 className="font-heading text-cream text-xl font-semibold mb-3">
                      {cat.label}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-cream/70 text-xs font-semibold font-body group-hover:text-gold transition-colors duration-300">
                      {copy.viewMenu}
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
                </RouteTransitionLink>
              </MotionLift>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="text-center mt-12">
          <MotionPressable>
            <RouteTransitionLink
              href={localizePath(locale, "/menu")}
              className="masala-btn px-10 py-4 text-sm font-semibold font-body text-cream"
            >
              {copy.viewFull}
            </RouteTransitionLink>
          </MotionPressable>
        </RevealOnScroll>
      </div>
    </section>
  );
}
