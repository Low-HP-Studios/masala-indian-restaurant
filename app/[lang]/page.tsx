import type { Metadata } from "next";
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
import { getDictionary, isLocale, type Locale, type SiteDictionary } from "@/lib/i18n";

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

function mapBrand(
  data: Awaited<ReturnType<typeof fetchQuery<typeof api.content.getNavbar>>>,
  fallback: SiteDictionary["brand"]
): SiteDictionary["brand"] {
  if (!data) return fallback;
  return { name: data.brandName, descriptor: data.brandDescriptor };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale = getLocale(lang);
  const data = await fetchQuery(api.content.getMeta, { locale });
  const fallback = getDictionary(locale).meta;

  return {
    title: data?.homeTitle ?? fallback.homeTitle,
    description: data?.homeDescription ?? fallback.homeDescription,
  };
}

export default async function Home({ params }: { params: Params }) {
  const { lang } = await params;
  const locale = getLocale(lang);
  const fallback = getDictionary(locale);

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

  const nav = mapNav(navbar, fallback.nav);
  const brand = mapBrand(navbar, fallback.brand);

  const heroCopy: SiteDictionary["hero"] = hero
    ? {
        eyebrow: hero.eyebrow,
        titleTop: hero.titleTop,
        titleAccent: hero.titleAccent,
        body: hero.body,
        primary: hero.primary,
        secondary: hero.secondary,
        scroll: hero.scroll,
      }
    : fallback.hero;

  const storyCopy: SiteDictionary["story"] = story
    ? {
        eyebrow: story.eyebrow,
        title: story.title,
        accent: story.accent,
        body1: story.body1,
        body2: story.body2,
        primary: story.primary,
        secondary: story.secondary,
        stat: story.stat,
      }
    : fallback.story;

  const statsCopy: SiteDictionary["stats"] = stats
    ? stats.items.map((s) => ({
        value: s.value,
        suffix: s.suffix,
        label: s.label,
        prefix: s.prefix,
        displayValue: s.displayValue,
      }))
    : fallback.stats;

  const featuredCopy: SiteDictionary["featured"] = featured
    ? {
        eyebrow: featured.eyebrow,
        title: featured.title,
        accent: featured.accent,
        dishes: featured.dishes.map((d) => ({
          name: d.name,
          tagline: d.tagline,
          description: d.description,
          price: d.price,
          image: d.image,
          spice: d.spice,
        })),
      }
    : fallback.featured;

  const menuPreviewCopy: SiteDictionary["menuPreview"] = menuPreview
    ? {
        eyebrow: menuPreview.eyebrow,
        title: menuPreview.title,
        accent: menuPreview.accent,
        viewMenu: menuPreview.viewMenu,
        viewFull: menuPreview.viewFull,
        categories: menuPreview.categories,
      }
    : fallback.menuPreview;

  const galleryCopy: SiteDictionary["gallery"] = gallery
    ? { eyebrow: gallery.eyebrow, title: gallery.title, accent: gallery.accent }
    : fallback.gallery;

  const valuesCopy: SiteDictionary["values"] = values
    ? { eyebrow: values.eyebrow, title: values.title, accent: values.accent, items: values.items }
    : fallback.values;

  const ctaCopy: SiteDictionary["cta"] = cta
    ? {
        eyebrow: cta.eyebrow,
        title: cta.title,
        accent: cta.accent,
        body: cta.body,
        hours: cta.hours,
        addressLine: cta.addressLine,
      }
    : fallback.cta;

  const footerCopy: SiteDictionary["footer"] = footer
    ? {
        summary: footer.summary,
        navigation: footer.navigation,
        menu: footer.menu,
        visit: footer.visit,
        address: footer.address,
        phone: footer.phone,
        email: footer.email,
        hours: footer.hours,
        rights: footer.rights,
        crafted: footer.crafted,
        designedBy: fallback.footer.designedBy,
        links: footer.links,
      }
    : fallback.footer;

  return (
    <>
      <Navbar locale={locale} copy={nav} brand={brand} />
      <main>
        <Hero locale={locale} copy={heroCopy} />
        <Story locale={locale} copy={storyCopy} />
        <StatsBar stats={statsCopy} />
        <FeaturedDishes copy={featuredCopy} />
        <MenuPreview locale={locale} copy={menuPreviewCopy} />
        <Gallery copy={galleryCopy} />
        <ValuesSection copy={valuesCopy} />
        <CTASection copy={ctaCopy} />
      </main>
      <Footer locale={locale} copy={footerCopy} nav={nav} brand={brand} />
    </>
  );
}
