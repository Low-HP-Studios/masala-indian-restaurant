"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import MotionPressable from "./MotionPressable";
import RouteTransitionLink from "./RouteTransitionLink";
import { localizePath, type Locale, type SiteDictionary } from "@/lib/i18n";

type Props = {
  locale: Locale;
  copy: SiteDictionary["hero"];
};

const slides = [
  { src: "/images/hero-banner/signature-dish.png", alt: "Signature Indian dish", position: "center 48%", accent: "#f08a0a" },
  { src: "/images/hero-banner/chicken-wings.png", alt: "Masala main course", position: "center 42%", accent: "#d6a73f" },
  { src: "/images/hero-banner/tandoor-skewers.png", alt: "Tandoori sizzler platter", position: "center 52%", accent: "#c93d24" },
  { src: "/images/hero-banner/restaurant-ambiance.jpg", alt: "Masala restaurant ambiance", position: "center 58%", accent: "#91a957" },
  { src: "/images/hero-banner/curry-karahi.png", alt: "Aromatic Indian curry", position: "center 46%", accent: "#e0b55c" },
];

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.26,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: [0.2, 0.82, 0.22, 1] as const },
  },
};

export default function Hero({ locale, copy }: Props) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % slides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    document.documentElement.style.setProperty("--ambient-accent", slides[current].accent);
  }, [current]);

  return (
    <section
      id="home"
      className="relative flex min-h-[680px] min-h-svh flex-col overflow-hidden bg-dark"
      style={{ "--hero-accent": slides[current].accent } as CSSProperties}
    >
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: reducedMotion ? 1 : i === current ? 1.085 : 1.035,
          }}
          transition={{
            opacity: { duration: 1.05, ease: "easeInOut" },
            scale: { duration: 6.2, ease: "easeOut" },
          }}
          style={{
            zIndex: i === current ? 1 : i === prev ? 0 : -1,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{ objectPosition: slide.position }}
            sizes="100vw"
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.56)_52%,rgba(0,0,0,0.86)_100%)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/45 to-black/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-transparent to-black/30" />

      <div className="relative z-30 flex min-h-0 w-full flex-1 flex-col">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-6 pt-28 text-center md:pt-40"
        >
        <motion.p variants={heroItem} className="section-label mb-5 text-[var(--hero-accent)]">
          {copy.eyebrow}
        </motion.p>

        <motion.div variants={heroItem} className="mb-8 flex items-center justify-center gap-4">
          <motion.span
            className="block h-px w-16 origin-right bg-gold/75"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.72, ease: [0.2, 0.82, 0.22, 1], delay: 0.46 }}
          />
          <motion.span
            className="text-base text-[var(--hero-accent)]"
            animate={reducedMotion ? undefined : { rotate: [0, 18, -12, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 1.5, delay: 0.58, ease: "easeOut" }}
          >
            ✦
          </motion.span>
          <motion.span
            className="block h-px w-16 origin-left bg-gold/75"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.72, ease: [0.2, 0.82, 0.22, 1], delay: 0.46 }}
          />
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="font-heading mb-6 text-cream"
          style={{
            fontSize: "clamp(3.4rem, 8vw, 7.4rem)",
            lineHeight: 0.98,
            textShadow: "0 8px 44px rgba(0,0,0,0.78)",
          }}
        >
          {copy.titleTop}
          <br />
          <em className="not-italic text-[var(--hero-accent)]">{copy.titleAccent}</em>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-8 text-cream/92"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.82)" }}
        >
          {copy.body}
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MotionPressable>
            <RouteTransitionLink
              href={localizePath(locale, "/menu")}
              className="masala-btn masala-btn-filled min-w-48 px-8 py-3.5 text-center text-sm font-semibold text-cream focus:outline-none focus:ring-2 focus:ring-[var(--hero-accent)]/70"
              style={{ "--button-fill": "var(--hero-accent)" } as CSSProperties}
            >
              {copy.primary}
            </RouteTransitionLink>
          </MotionPressable>
          <MotionPressable>
            <a
              href="tel:+34631751388"
              className="masala-btn min-w-48 bg-black/35 px-8 py-3.5 text-center text-sm font-semibold text-cream backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[var(--hero-accent)]/70"
              style={{ "--button-fill": "var(--hero-accent)" } as CSSProperties}
            >
              {copy.secondary}
            </a>
          </MotionPressable>
        </motion.div>
        </motion.div>

        <div
          className="flex w-full shrink-0 items-center justify-start gap-2 px-4 py-3 sm:px-8 md:px-10"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          role="group"
        >
          {slides.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => {
                setPrev(current);
                setCurrent(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              whileHover={{ scaleY: 1.4 }}
              whileTap={{ scale: 0.9 }}
              className={`h-1 shrink-0 rounded-full transition-all duration-500 ${
                i === current ? "w-9 bg-[var(--hero-accent)]" : "w-4 bg-cream/35 hover:bg-cream/65"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
