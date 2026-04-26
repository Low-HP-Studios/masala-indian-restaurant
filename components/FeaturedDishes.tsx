import Image from "next/image";
import MotionLift from "./MotionLift";
import RevealOnScroll from "./RevealOnScroll";
import type { SiteDictionary } from "@/lib/i18n";

type Props = { copy: SiteDictionary["featured"] };

function SpiceDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level ? "bg-saffron" : "bg-cream-dark"}`}
        />
      ))}
    </div>
  );
}

export default function FeaturedDishes({ copy }: Props) {
  return (
    <section id="signature-dishes" className="bg-surface-soft py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealOnScroll className="text-center mb-16">
          <p className="section-label mb-4">{copy.eyebrow}</p>
          <h2
            className="font-heading text-ink leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            {copy.title} <em className="text-maroon not-italic">{copy.accent}</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="block h-px w-12 bg-gold/60" />
            <span className="text-gold text-sm">✦</span>
            <span className="block h-px w-12 bg-gold/60" />
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {copy.dishes.map((dish, i) => (
            <RevealOnScroll key={dish.name} delay={(i + 1) as 1 | 2 | 3} className="group">
              <MotionLift>
                {/* Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 shadow-lg">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    width={600}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />

                  {/* Tagline badge */}
                  <div className="absolute top-4 left-4 bg-saffron-dark px-3 py-1">
                    <span className="text-cream text-xs font-semibold font-body">{dish.tagline}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4">
                    <span className="font-heading text-2xl text-gold font-semibold">{dish.price}</span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-2xl text-ink font-semibold">{dish.name}</h3>
                    <SpiceDots level={dish.spice} />
                  </div>
                  <p className="text-ink-muted text-sm font-body leading-relaxed">{dish.description}</p>
                </div>
              </MotionLift>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
