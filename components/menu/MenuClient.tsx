"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { MenuCategory, SpiceLevel } from "@/data/menu";
import DishRow from "./DishCard";
import SectionFrame from "./SectionFrame";
import MenuLegendRow from "./MenuLegendRow";

type LegendProps = {
  vegetarian: string;
  spiceIndicator: string;
  priceNote: string;
};

type Props = {
  categories: MenuCategory[];
  initialCategory?: string;
  labels: {
    chefSpecial: string;
    proteins: Record<string, string>;
    spice: Record<SpiceLevel, string>;
  };
  legend: LegendProps;
};

export default function MenuClient({ categories, initialCategory, labels, legend }: Props) {
  const [activeId, setActiveId] = useState(initialCategory ?? categories[0].id);
  const [isStuck, setIsStuck] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stickyNavRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const clickScrollRef = useRef(false);

  const onScrollRaf = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const nav = stickyNavRef.current;
      if (nav) {
        const parsed = parseFloat(getComputedStyle(nav).top);
        const offsetPx = Number.isNaN(parsed) ? 80 : parsed;
        const t = nav.getBoundingClientRect().top;
        setIsStuck(Math.abs(t - offsetPx) < 3);
      }
      if (clickScrollRef.current) {
        return;
      }
      const navEl = stickyNavRef.current;
      if (!navEl) return;
      const lineY = navEl.getBoundingClientRect().bottom;
      let next = categories[0].id;
      for (const c of categories) {
        const el = sectionRefs.current.get(c.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= lineY + 2) {
          next = c.id;
        }
      }
      setActiveId((p) => (p === next ? p : next));
    });
  }, [categories]);

  useEffect(() => {
    onScrollRaf();
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onScrollRaf);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [onScrollRaf]);

  const headerScrollOffset = () => {
    if (typeof window === "undefined") return 148;
    if (window.matchMedia("(min-width: 768px)").matches) return 154;
    return 140;
  };

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const el = sectionRefs.current.get(id);
    if (el) {
      clickScrollRef.current = true;
      const top = el.getBoundingClientRect().top + window.scrollY - headerScrollOffset();
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(() => {
        clickScrollRef.current = false;
        onScrollRaf();
      }, 600);
    }
  };

  useEffect(() => {
    const tab = tabsRef.current?.querySelector(`[data-tab="${activeId}"]`);
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  return (
    <div>
      <MenuLegendRow
        vegetarian={legend.vegetarian}
        spiceIndicator={legend.spiceIndicator}
        priceNote={legend.priceNote}
      />
      <div
        ref={stickyNavRef}
        className={`menu-subnav sticky top-20 z-40 w-full border-y ${
          isStuck ? "border-cream/12" : "border-line/60"
        }`}
        data-stuck={isStuck ? "true" : "false"}
        style={{
          backgroundColor: isStuck ? "#0d0906" : "transparent",
          backgroundImage: "none",
          boxShadow: isStuck ? "0 2px 20px rgba(0, 0, 0, 0.4)" : "none",
        }}
      >
        <div
          ref={tabsRef}
          className="relative z-10 mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 scrollbar-none lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-tab={cat.id}
              type="button"
              onClick={() => scrollToSection(cat.id)}
              className={`relative shrink-0 px-3 py-3.5 text-xs font-semibold font-body uppercase tracking-wider whitespace-nowrap transition-colors duration-200 sm:px-4 sm:py-4 ${
                isStuck
                  ? activeId === cat.id
                    ? "text-saffron-light"
                    : "text-cream/72 hover:text-cream"
                  : activeId === cat.id
                    ? "text-saffron"
                    : "text-ink/55 hover:text-ink/90"
              }`}
            >
              {cat.label}
              {activeId === cat.id && (
                <motion.span
                  layoutId="menu-active-tab"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  transition={{ type: "spring", stiffness: 340, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="space-y-16">
          {categories.map((cat) => (
            <SectionFrame
              key={cat.id}
              id={cat.id}
              label={cat.label}
              description={cat.description}
              bannerImage={cat.bannerImage}
              variant={cat.variant ?? "default"}
              sectionRef={(el) => {
                if (el) {
                  sectionRefs.current.set(cat.id, el);
                } else {
                  sectionRefs.current.delete(cat.id);
                }
              }}
            >
              <div className="divide-y divide-dashed divide-line">
                {cat.items.map((item) => (
                  <DishRow
                    key={item.id}
                    item={item}
                    variant={cat.variant ?? "default"}
                    labels={labels}
                  />
                ))}
              </div>
            </SectionFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
