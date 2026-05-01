import Image from "next/image";
import type { MenuItem, ProteinPrices, SectionVariant, SpiceLevel } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import SpiceIndicator from "./SpiceIndicator";
import VegMark from "./VegMark";

type Props = {
  item: MenuItem;
  variant?: SectionVariant;
  labels: {
    chefSpecial: string;
    proteins: Record<string, string>;
    spice: Record<SpiceLevel, string>;
  };
};

export default function DishRow({ item, variant = "default", labels }: Props) {
  const isProteinBased = typeof item.price === "object";

  const nameClass = "font-heading text-lg sm:text-xl font-semibold leading-tight text-ink";
  const priceClass = "font-heading text-lg sm:text-xl font-semibold whitespace-nowrap text-saffron-dark";
  const descClass = "font-body text-sm leading-snug italic text-ink-muted";
  const noteClass = "font-body text-xs text-ink-muted/70";
  const proteinRowClass = "flex items-baseline gap-2 text-ink/85";

  return (
    <article className="py-4 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        {item.image && (
          <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-sm border border-line shadow-sm">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="80px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="menu-leader">
            <span className="flex items-center gap-2 flex-wrap">
              <VegMark vegetarian={!!item.isVegetarian} />
              <h3 className={nameClass}>{item.name}</h3>
              {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                <SpiceIndicator level={item.spiceLevel} labels={labels.spice} />
              )}
              {item.isChefSpecial && variant !== "chef" && (
                <span className="text-[0.65rem] font-semibold font-body uppercase tracking-wider text-saffron-dark bg-saffron/10 border border-saffron/30 px-1.5 py-0.5">
                  {labels.chefSpecial}
                </span>
              )}
            </span>
            <span className="menu-leader__dots" />
            {!isProteinBased && (
              <span className={priceClass}>{formatPrice(item.price)}</span>
            )}
            {isProteinBased && (
              <span className={`${priceClass} text-sm sm:text-base opacity-80`}>
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {item.description && <p className={`${descClass} mt-1`}>{item.description}</p>}
          {item.note && <p className={`${noteClass} mt-0.5`}>{item.note}</p>}

          {isProteinBased && (
            <div className="mt-2 ml-2 sm:ml-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {Object.entries(item.price as ProteinPrices).map(([protein, price]) => (
                <div key={protein} className={proteinRowClass}>
                  <span className="text-sm font-body">
                    {labels.proteins[protein] ?? protein}
                  </span>
                  <span className="flex-1 border-b border-dotted border-line/80 translate-y-[-0.25rem]" />
                  <span className="text-sm font-heading font-semibold text-saffron-dark">
                    €{(price as number).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
