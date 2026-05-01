import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import StatsBar from "@/components/StatsBar";
import FeaturedDishes from "@/components/FeaturedDishes";
import MenuPreview from "@/components/MenuPreview";
import Gallery from "@/components/Gallery";
import ValuesSection from "@/components/ValuesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import type { SiteDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/locales";

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

function requireArray<T>(data: T[] | null | undefined, label: string): T[] {
  if (!data?.length) {
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

function mapBrand(
  data: NonNullable<Awaited<ReturnType<typeof fetchQuery<typeof api.content.getNavbar>>>>
): SiteDictionary["brand"] {
  return { name: data.brandName, descriptor: data.brandDescriptor };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const data = requireContent(await fetchQuery(api.content.getMeta, { locale }), "meta");

  return {
    title: data.homeTitle,
    description: data.homeDescription,
  };
}

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = getLocale(lang);

  const [navbar, hero, story, stats, featured, menuPreview, gallery, values, cta, footer] =
    await Promise.all([
      fetchQuery(api.content.getNavbar, { locale }),
      fetchQuery(api.content.getHero, { locale }),
      fetchQuery(api.content.getStory, { locale }),
      fetchQuery(api.content.getStats, { locale }),
      fetchQuery(api.content.getFeatured, { locale }),
      fetchQuery(api.content.getMenuPreview, { locale }),
      fetchQuery(api.content.getGallery, { locale }),
      fetchQuery(api.content.getValues, { locale }),
      fetchQuery(api.content.getCta, { locale }),
      fetchQuery(api.content.getFooter, { locale }),
    ]);

  const navbarData = requireContent(navbar, "navbar");
  const heroData = requireContent(hero, "hero");
  const storyData = requireContent(story, "story");
  const statsData = requireContent(stats, "stats");
  const featuredData = requireContent(featured, "featured");
  const menuPreviewData = requireContent(menuPreview, "menuPreview");
  const galleryData = requireContent(gallery, "gallery");
  const valuesData = requireContent(values, "values");
  const ctaData = requireContent(cta, "cta");
  const footerData = requireContent(footer, "footer");

  const nav = mapNav(navbarData);
  const brand = mapBrand(navbarData);

  const heroSlides = requireArray(heroData.slides, "hero.slides");
  const storyImage = requireContent(storyData.image, "story.image");
  const galleryImages = requireArray(galleryData.images, "gallery.images");
  const ctaBackgroundImage = requireContent(ctaData.backgroundImage, "cta.backgroundImage");

  const heroCopy: SiteDictionary["hero"] = {
    eyebrow: heroData.eyebrow,
    titleTop: heroData.titleTop,
    titleAccent: heroData.titleAccent,
    body: heroData.body,
    primary: heroData.primary,
    secondary: heroData.secondary,
    scroll: heroData.scroll,
  };

  const storyCopy: SiteDictionary["story"] = {
    eyebrow: storyData.eyebrow,
    title: storyData.title,
    accent: storyData.accent,
    body1: storyData.body1,
    body2: storyData.body2,
    primary: storyData.primary,
    secondary: storyData.secondary,
    stat: storyData.stat,
  };

  const statsCopy: SiteDictionary["stats"] = statsData.items.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    label: s.label,
    prefix: s.prefix,
    displayValue: s.displayValue,
  }));

  const featuredCopy: SiteDictionary["featured"] = {
    eyebrow: featuredData.eyebrow,
    title: featuredData.title,
    accent: featuredData.accent,
    dishes: featuredData.dishes.map((d) => ({
      name: d.name,
      tagline: d.tagline,
      description: d.description,
      price: d.price,
      image: d.image,
      spice: d.spice,
    })),
  };

  const menuPreviewCopy: SiteDictionary["menuPreview"] = {
    eyebrow: menuPreviewData.eyebrow,
    title: menuPreviewData.title,
    accent: menuPreviewData.accent,
    viewMenu: menuPreviewData.viewMenu,
    viewFull: menuPreviewData.viewFull,
    categories: menuPreviewData.categories,
  };

  const galleryCopy: SiteDictionary["gallery"] = {
    eyebrow: galleryData.eyebrow,
    title: galleryData.title,
    accent: galleryData.accent,
  };

  const valuesCopy: SiteDictionary["values"] = {
    eyebrow: valuesData.eyebrow,
    title: valuesData.title,
    accent: valuesData.accent,
    items: valuesData.items,
  };

  const ctaCopy: SiteDictionary["cta"] = {
    eyebrow: ctaData.eyebrow,
    title: ctaData.title,
    accent: ctaData.accent,
    body: ctaData.body,
    hours: ctaData.hours,
    addressLine: ctaData.addressLine,
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
      <main>
        <Hero locale={locale} copy={heroCopy} slides={heroSlides} />
        <Story locale={locale} copy={storyCopy} image={storyImage} />
        <StatsBar stats={statsCopy} />
        <FeaturedDishes copy={featuredCopy} />
        <MenuPreview locale={locale} copy={menuPreviewCopy} />
        <Gallery copy={galleryCopy} images={galleryImages} />
        <ValuesSection copy={valuesCopy} />
        <CTASection copy={ctaCopy} backgroundImage={ctaBackgroundImage} />
      </main>
      <Footer locale={locale} copy={footerCopy} nav={nav} brand={brand} />
    </>
  );
}
