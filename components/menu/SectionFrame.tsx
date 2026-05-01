import Image from "next/image";
import type { ReactNode } from "react";
import type { SectionVariant } from "@/data/menu";

type Props = {
  id: string;
  label: string;
  description?: string;
  bannerImage?: string;
  variant?: SectionVariant;
  children: ReactNode;
  sectionRef?: (el: HTMLElement | null) => void;
};

type SkinKey = SectionVariant | "veg";

const SKIN_CLASS: Record<SkinKey, string> = {
  default: "section-skin section-skin--default",
  special: "section-skin section-skin--special",
  chef: "section-skin section-skin--chef",
  tandoori: "section-skin section-skin--tandoori",
  biryani: "section-skin section-skin--biryani",
  veg: "section-skin section-skin--veg",
};

export default function SectionFrame({
  id,
  label,
  description,
  bannerImage,
  variant = "default",
  children,
  sectionRef,
}: Props) {
  const skinKey: SkinKey = id === "vegetarian" ? "veg" : variant;
  const isSpecial = skinKey === "special";
  const isTandoori = skinKey === "tandoori";
  const isBiryani = skinKey === "biryani";

  const titleColor = isTandoori ? "text-maroon" : "text-ink";
  const descColor = "text-ink-muted";
  const eyebrowColor = "text-saffron";

  return (
    <section
      id={id}
      ref={(el) => sectionRef?.(el)}
      className="relative py-2"
    >
      <div className={SKIN_CLASS[skinKey]}>
        <div className="section-skin__bg" aria-hidden="true" />
        {bannerImage && (
          <div
            className={`menu-banner mb-2 ${
              isSpecial ? "aspect-[21/8]" : "aspect-[21/9]"
            }`}
          >
            <Image
              src={bannerImage}
              alt={label}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              loading="lazy"
            />
            {isTandoori && <span className="ember-glow" aria-hidden="true" />}
            {isBiryani && <span className="steam-overlay" aria-hidden="true" />}
          </div>
        )}

        <div className={`${isSpecial ? "text-center" : ""} mb-6`}>
          <p className={`section-label mb-2 ${eyebrowColor}`}>{label}</p>
          <h2
            className={`font-heading ${titleColor} ${isBiryani ? "saffron-flourish" : ""}`}
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
          >
            {label}
          </h2>
          {description && (
            <p className={`${descColor} font-body text-sm mt-2 italic`}>
              {description}
            </p>
          )}
          <span
            className={`block ${isSpecial ? "mx-auto" : ""} mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent`}
          />
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}
