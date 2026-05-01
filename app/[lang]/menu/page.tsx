import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuClient from "@/components/menu/MenuClient";
import type { SiteDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/locales";
import type { MenuCategory, ProteinPrices, SpiceLevel } from "@/data/menu";

type Params = Promise<{ lang: string }>;

function getLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}

function requireContent<T>(data: T | null | undefined, label: string): T {
  if (!data) {
    throw new Error(`CMS content missing: ${label}`);
  }
  return data;
}

function mapNav(data: NonNullable<Awaited<ReturnType<typeof fetchQuery<typeof api.content.getNavbar>>>>): SiteDictionary["nav"] {
  const linkMap = Object.fromEntries(data.links.map((l) => [l.key, l.label]));
  const link = (key: string) => requireContent(linkMap[key], `navbar.links.${key}`);
  return {
    home: link("home"),
    menu: link("menu"),
    about: requireContent(data.about, "navbar.about"),
    contact: link("contact"),
    story: link("story"),
    signature: link("signature"),
    preview: link("preview"),
    menuLink: link("menu"),
    reserve: data.reserve,
    toggle: data.toggle,
    language: data.language,
  };
}

function getMenuItemPrice(item: {
  slug: string;
  priceFixed?: number;
  priceByProtein?: ProteinPrices;
}): number | ProteinPrices {
  if (item.priceFixed !== undefined && item.priceFixed !== null) return item.priceFixed;
  if (item.priceByProtein) return item.priceByProtein;
  throw new Error(`CMS content missing: menuItems.${item.slug}.price`);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const data = requireContent(await fetchQuery(api.content.getMeta, { locale }), "meta");

  return {
    title: data.menuTitle,
    description: data.menuDescription,
  };
}

export default async function MenuPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = getLocale(lang);

  const [navbar, menuPage, footer, convexCategories] = await Promise.all([
    fetchQuery(api.content.getNavbar, { locale }),
    fetchQuery(api.content.getMenuPage, { locale }),
    fetchQuery(api.content.getFooter, { locale }),
    fetchQuery(api.menu.getCategories, { locale }),
  ]);

  const navbarData = requireContent(navbar, "navbar");
  const menuPageData = requireContent(menuPage, "menuPage");
  const footerData = requireContent(footer, "footer");
  const menuHeroImage = requireContent(menuPageData.heroImage, "menuPage.heroImage");
  const rawCategories = requireContent(convexCategories, "menu.categories");
  if (rawCategories.length === 0) {
    throw new Error("CMS content missing: menu.categories");
  }

  const nav = mapNav(navbarData);
  const brand = { name: navbarData.brandName, descriptor: navbarData.brandDescriptor };

  const categories: MenuCategory[] = rawCategories.map((cat) => ({
    id: cat.slug,
    label: requireContent(cat.label || null, `menuCategories.${cat.slug}.label`),
    description: cat.description,
    bannerImage: cat.bannerImage,
    variant: cat.variant as MenuCategory["variant"],
    items: cat.items.map((item) => ({
      id: item.slug,
      name: requireContent(item.name || null, `menuItems.${item.slug}.name`),
      description: item.description,
      price: getMenuItemPrice(item),
      spiceLevel: item.spiceLevel,
      isVegetarian: item.isVegetarian,
      isChefSpecial: item.isChefSpecial,
      image: item.image,
      note: item.note,
    })),
  }));

  if (menuPageData.spiceLevels.length < 5) {
    throw new Error("CMS content missing: menuPage.spiceLevels");
  }

  const menuCopy: SiteDictionary["menuPage"] = {
    eyebrow: menuPageData.eyebrow,
    title: menuPageData.title,
    accent: menuPageData.accent,
    vegetarian: menuPageData.vegetarian,
    spiceIndicator: menuPageData.spiceIndicator,
    priceNote: menuPageData.priceNote,
    chefSpecial: menuPageData.chefSpecial,
    proteins: menuPageData.proteins,
    spice: Object.fromEntries(
      menuPageData.spiceLevels.map((label, index) => [index, label])
    ) as Record<SpiceLevel, string>,
  };

  const footerCopy: SiteDictionary["footer"] = {
    summary: footerData.summary,
    navigation: footerData.navigation,
    menu: footerData.menu,
    visit: footerData.visit,
    address: footerData.address,
    phone: footerData.phone,
    email: footerData.email,
    hours: footerData.hours,
    rights: footerData.rights,
    crafted: footerData.crafted,
    designedBy: requireContent(footerData.designedBy, "footer.designedBy"),
    links: footerData.links,
  };

  return (
    <>
      <Navbar locale={locale} copy={nav} brand={brand} />

      <section className="relative flex h-[36vh] min-h-[320px] items-end justify-center overflow-hidden bg-dark pt-20">
        <Image
          src={menuHeroImage.src}
          alt={menuHeroImage.alt}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: menuHeroImage.position }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 px-6 pb-10 text-center">
          <p className="section-label mb-3 text-saffron-light">{menuCopy.eyebrow}</p>
          <h1
            className="font-heading text-cream"
            style={{ fontSize: "clamp(2.7rem, 5.5vw, 5rem)", textShadow: "0 8px 34px rgba(0,0,0,0.7)" }}
          >
            {menuCopy.title} <em className="not-italic text-gold">{menuCopy.accent}</em>
          </h1>
          <span className="mx-auto mt-5 block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      <main className="min-h-screen parchment-bg">
        <MenuClient
          categories={categories}
          labels={{
            chefSpecial: menuCopy.chefSpecial,
            proteins: menuCopy.proteins,
            spice: menuCopy.spice,
          }}
          legend={{
            vegetarian: menuCopy.vegetarian,
            spiceIndicator: menuCopy.spiceIndicator,
            priceNote: menuCopy.priceNote,
          }}
        />
      </main>

      <Footer locale={locale} copy={footerCopy} nav={nav} brand={brand} />
    </>
  );
}
