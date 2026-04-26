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

const VARIANT_FRAME_CLASS: Record<SectionVariant, string> = {
  default: "",
  special: "",
  chef: "parchment-dark section-frame--chef",
  tandoori: "",
  biryani: "",
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
  const isChef = variant === "chef";
  const isSpecial = variant === "special";
  const isTandoori = variant === "tandoori";
  const isBiryani = variant === "biryani";

  const frameClass = VARIANT_FRAME_CLASS[variant];
  const titleColor = isChef
    ? "text-cream"
    : isTandoori
      ? "text-maroon"
      : "text-ink";
  const descColor = isChef ? "text-cream/75" : "text-ink-muted";
  const eyebrowColor = isChef ? "text-gold-light" : "text-saffron";

  return (
    <section
      id={id}
      ref={(el) => sectionRef?.(el)}
      className={`relative ${frameClass} ${isChef ? "px-6 py-10 md:px-12 md:py-14" : "py-2"}`}
    >
      {bannerImage && (
        <div
          className={`relative overflow-hidden mb-6 ${isSpecial ? "aspect-[21/8]" : "aspect-[21/9]"}`}
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
          <p className={`${descColor} font-body text-sm mt-2 italic`}>{description}</p>
        )}
        <span className="block mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      <div className={isChef ? "text-cream" : ""}>{children}</div>
    </section>
  );
}
