import { SkeletonImage } from "@/components/SkeletonImage";
import MotionPressable from "./MotionPressable";
import RevealOnScroll from "./RevealOnScroll";
import type { SiteDictionary } from "@/lib/i18n";

type Props = {
  copy: SiteDictionary["cta"];
  backgroundImage: {
    src: string;
    alt: string;
    position?: string;
  };
};

export default function CTASection({ copy, backgroundImage }: Props) {
  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          style={{ objectPosition: backgroundImage.position ?? "center" }}
          sizes="100vw"
          skeletonClassName="bg-maroon-dark/80"
        />
      </div>
      <div className="absolute inset-0 bg-maroon/85" />

      {/* Hindi watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading text-cream font-bold leading-none"
          style={{ fontSize: "clamp(6rem, 18vw, 20rem)", opacity: 0.05 }}
        >
          खाना
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <RevealOnScroll>
          <p className="section-label text-saffron-light mb-6">{copy.eyebrow}</p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-16 bg-gold/50" />
            <span className="text-gold">✦</span>
            <span className="block h-px w-16 bg-gold/50" />
          </div>

          <h2
            className="font-heading text-cream leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            {copy.title}
            <br />
            <em className="text-gold not-italic">{copy.accent}</em>
          </h2>

          <p className="text-cream/70 font-body text-lg mb-10 max-w-lg mx-auto">
            {copy.body}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MotionPressable>
              <a
                href="tel:+34631751388"
                className="masala-btn masala-btn-filled group flex items-center gap-3 px-8 py-4 text-sm font-semibold font-body text-cream"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +34 631 75 13 88
              </a>
            </MotionPressable>

            <div className="text-cream/50 text-sm font-body">
              {copy.hours}
            </div>
          </div>

          <p className="text-cream/40 text-sm font-body mt-8 tracking-wide">
            {copy.addressLine}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
