import type { Metadata } from "next";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/menu/MenuClient";
import { getDictionary, isLocale, type Locale, type SiteDictionary } from "@/lib/i18n";
import type { MenuCategory } from "@/data/menu";

type Params = Promise<{ lang: string }>;

function getLocale(lang: string): Locale {
  return isLocale(lang) ? lang : "en";
}

function mapNav(
  data: Awaited<ReturnType<typeof fetchQuery<typeof api.content.getNavbar>>>,
  fallback: SiteDictionary["nav"]
): SiteDictionary["nav"] {
  if (!data) return fallback;
  const linkMap = Object.fromEntries(data.links.map((l) => [l.key, l.label]));
  return {
    home: linkMap.home ?? fallback.home,
    menu: linkMap.menu ?? fallback.menu,
    about: fallback.about,
    contact: linkMap.contact ?? fallback.contact,
    story: linkMap.story ?? fallback.story,
    signature: linkMap.signature ?? fallback.signature,
    preview: linkMap.preview ?? fallback.preview,
    menuLink: linkMap.menu ?? fallback.menuLink,
    reserve: data.reserve,
    toggle: data.toggle,
    language: data.language,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const data = await fetchQuery(api.content.getMeta, { locale });
  const fallback = getDictionary(locale).meta;

  return {
    title: data?.menuTitle ?? fallback.menuTitle,
    description: data?.menuDescription ?? fallback.menuDescription,
  };
}

export default async function MenuPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = getLocale(lang);
  const fallback = getDictionary(locale);

  const [navbar, convexCategories] = await Promise.all([
    fetchQuery(api.content.getNavbar, { locale }),
    fetchQuery(api.menu.getCategories, { locale }),
  ]);

  const nav = mapNav(navbar, fallback.nav);
  const brand = navbar
    ? { name: navbar.brandName, descriptor: navbar.brandDescriptor }
    : fallback.brand;

  // Map Convex categories to MenuCategory[] shape the components expect
  const categories: MenuCategory[] = (convexCategories ?? []).map((cat) => ({
    id: cat.slug,
    label: cat.label,
    description: cat.description,
    bannerImage: cat.bannerImage,
    variant: cat.variant as MenuCategory["variant"],
    items: cat.items.map((item) => ({
      id: item.slug,
      name: item.name,
      description: item.description,
      price:
        item.priceFixed !== undefined && item.priceFixed !== null
          ? item.priceFixed
          : (item.priceByProtein ?? 0),
      spiceLevel: item.spiceLevel,
      isVegetarian: item.isVegetarian,
      isChefSpecial: item.isChefSpecial,
      image: item.image,
      note: item.note,
    })),
  }));

  // Fall back to static data if Convex returns nothing
  const finalCategories =
    categories.length > 0 ? categories : fallback.menuPreview.categories as unknown as MenuCategory[];

  const dict = fallback;

  return (
    <>
      <Navbar locale={locale} copy={nav} brand={brand} />

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
          categories={finalCategories}
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

      <Footer locale={locale} copy={fallback.footer} nav={nav} brand={brand} />
    </>
  );
}
