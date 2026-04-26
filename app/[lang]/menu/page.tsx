import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/menu/MenuClient";
import { getDictionary, getLocalizedMenuCategories, isLocale, type Locale } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

function getLocale(lang: string): Locale {
  return isLocale(lang) ? lang : "en";
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(getLocale(lang));

  return {
    title: dict.meta.menuTitle,
    description: dict.meta.menuDescription,
  };
}

export default async function MenuPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = getLocale(lang);
  const dict = getDictionary(locale);
  const categories = getLocalizedMenuCategories(locale);

  return (
    <>
      <Navbar locale={locale} copy={dict.nav} brand={dict.brand} />

      <section className="relative flex h-[36vh] min-h-[320px] items-end justify-center overflow-hidden bg-dark pt-20">
        <Image
          src="/images/hero-banner/tandoor-skewers.png"
          alt="Tandoori platter from Masala Indian Restaurant"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 52%" }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 px-6 pb-10 text-center">
          <p className="section-label mb-3 text-saffron-light">{dict.menuPage.eyebrow}</p>
          <h1
            className="font-heading text-cream"
            style={{ fontSize: "clamp(2.7rem, 5.5vw, 5rem)", textShadow: "0 8px 34px rgba(0,0,0,0.7)" }}
          >
            {dict.menuPage.title} <em className="not-italic text-gold">{dict.menuPage.accent}</em>
          </h1>
          <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      <main className="min-h-screen parchment-bg">
        <MenuClient
          categories={categories}
          labels={{
            chefSpecial: dict.menuPage.chefSpecial,
            proteins: dict.menuPage.proteins,
            spice: dict.menuPage.spice,
          }}
          legend={{
            vegetarian: dict.menuPage.vegetarian,
            spiceIndicator: dict.menuPage.spiceIndicator,
            priceNote: dict.menuPage.priceNote,
          }}
        />
      </main>

      <Footer locale={locale} copy={dict.footer} nav={dict.nav} brand={dict.brand} />
    </>
  );
}
