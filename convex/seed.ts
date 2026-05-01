import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { locales, dictionaries, menuCategoryText } from "@/lib/i18n";
import { menuCategories } from "@/data/menu";

const heroSlides = [
  {
    src: "/images/hero-banner/signature-dish.png",
    alt: "Signature Indian dish",
    position: "center 48%",
    accent: "#f08a0a",
  },
  {
    src: "/images/hero-banner/chicken-wings.png",
    alt: "Masala main course",
    position: "center 42%",
    accent: "#d6a73f",
  },
  {
    src: "/images/hero-banner/tandoor-skewers.png",
    alt: "Tandoori sizzler platter",
    position: "center 52%",
    accent: "#c93d24",
  },
  {
    src: "/images/hero-banner/restaurant-ambiance.jpg",
    alt: "Masala restaurant ambiance",
    position: "center 58%",
    accent: "#91a957",
  },
  {
    src: "/images/hero-banner/curry-karahi.png",
    alt: "Aromatic Indian curry",
    position: "center 46%",
    accent: "#e0b55c",
  },
];

const storyImage = {
  src: "/images/visits/10.jpg",
  alt: "Masala Indian Restaurant interior",
};

const galleryImages = [
  { src: "/images/food/12.jpg", label: "Signature Curry", sub: "Our most-loved dish", featured: true },
  { src: "/images/visits/10.jpg", label: "Warm Welcomes", sub: "Every guest, every time" },
  { src: "/images/food/11.jpg", label: "Golden Samosas", sub: "Crisp. Spiced. Perfect." },
  { src: "/images/food/13.jpg", label: "Falooda Kulfi", sub: "A sweet finale" },
  { src: "/images/visits/15.jpg", label: "Family Feasts", sub: "Memories made here" },
  { src: "/images/visits/7.jpg", label: "Cherished Moments", sub: "Laughter and naan" },
];

const ctaBackgroundImage = {
  src: "/images/food/4.jpeg",
  alt: "Indian cuisine spread",
  position: "center",
};

const menuHeroImage = {
  src: "/images/hero-banner/tandoor-skewers.png",
  alt: "Tandoori platter from Masala Indian Restaurant",
  position: "center 52%",
};

// Run: npx convex run seed:content
export const content = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const locale of locales) {
      const dict = dictionaries[locale];

      await ctx.db.insert("metaContent", {
        locale, status: "published",
        homeTitle: dict.meta.homeTitle,
        homeDescription: dict.meta.homeDescription,
        menuTitle: dict.meta.menuTitle,
        menuDescription: dict.meta.menuDescription,
      });

      await ctx.db.insert("navbarContent", {
        locale, status: "published",
        brandName: dict.brand.name,
        brandDescriptor: dict.brand.descriptor,
        links: [
          { key: "home", label: dict.nav.home },
          { key: "story", label: dict.nav.story },
          { key: "signature", label: dict.nav.signature },
          { key: "preview", label: dict.nav.preview },
          { key: "menu", label: dict.nav.menuLink },
          { key: "contact", label: dict.nav.contact },
        ],
        reserve: dict.nav.reserve,
        toggle: dict.nav.toggle,
        language: dict.nav.language,
        about: dict.nav.about,
      });

      await ctx.db.insert("heroContent", {
        locale, status: "published",
        eyebrow: dict.hero.eyebrow,
        titleTop: dict.hero.titleTop,
        titleAccent: dict.hero.titleAccent,
        body: dict.hero.body,
        primary: dict.hero.primary,
        secondary: dict.hero.secondary,
        scroll: dict.hero.scroll,
        slides: heroSlides,
      });

      await ctx.db.insert("storyContent", {
        locale, status: "published",
        eyebrow: dict.story.eyebrow,
        title: dict.story.title,
        accent: dict.story.accent,
        body1: dict.story.body1,
        body2: dict.story.body2,
        primary: dict.story.primary,
        secondary: dict.story.secondary,
        stat: dict.story.stat,
        image: storyImage,
      });

      await ctx.db.insert("statsContent", {
        locale, status: "published",
        items: dict.stats.map((s) => ({
          value: s.value,
          suffix: s.suffix,
          prefix: s.prefix,
          displayValue: s.displayValue,
          label: s.label,
        })),
      });

      await ctx.db.insert("featuredContent", {
        locale, status: "published",
        eyebrow: dict.featured.eyebrow,
        title: dict.featured.title,
        accent: dict.featured.accent,
        cta: dict.nav.menuLink,
        dishes: dict.featured.dishes.map((d) => ({
          name: d.name, tagline: d.tagline, description: d.description,
          price: d.price, image: d.image, spice: d.spice,
        })),
      });

      await ctx.db.insert("menuPreviewContent", {
        locale, status: "published",
        eyebrow: dict.menuPreview.eyebrow,
        title: dict.menuPreview.title,
        accent: dict.menuPreview.accent,
        viewMenu: dict.menuPreview.viewMenu,
        viewFull: dict.menuPreview.viewFull,
        categories: dict.menuPreview.categories,
      });

      await ctx.db.insert("galleryContent", {
        locale, status: "published",
        eyebrow: dict.gallery.eyebrow,
        title: dict.gallery.title,
        accent: dict.gallery.accent,
        images: galleryImages,
      });

      await ctx.db.insert("valuesContent", {
        locale, status: "published",
        eyebrow: dict.values.eyebrow,
        title: dict.values.title,
        accent: dict.values.accent,
        items: dict.values.items,
      });

      await ctx.db.insert("ctaContent", {
        locale, status: "published",
        eyebrow: dict.cta.eyebrow,
        title: dict.cta.title,
        accent: dict.cta.accent,
        body: dict.cta.body,
        hours: dict.cta.hours,
        addressLine: dict.cta.addressLine,
        backgroundImage: ctaBackgroundImage,
      });

      await ctx.db.insert("footerContent", {
        locale, status: "published",
        summary: dict.footer.summary,
        navigation: dict.footer.navigation,
        menu: dict.footer.menu,
        visit: dict.footer.visit,
        address: dict.footer.address,
        phone: dict.footer.phone,
        email: dict.footer.email,
        hours: dict.footer.hours,
        rights: dict.footer.rights,
        crafted: dict.footer.crafted,
        designedBy: dict.footer.designedBy,
        links: dict.footer.links,
      });

      await ctx.db.insert("menuPageContent", {
        locale,
        status: "published",
        eyebrow: dict.menuPage.eyebrow,
        title: dict.menuPage.title,
        accent: dict.menuPage.accent,
        vegetarian: dict.menuPage.vegetarian,
        spiceIndicator: dict.menuPage.spiceIndicator,
        priceNote: dict.menuPage.priceNote,
        chefSpecial: dict.menuPage.chefSpecial,
        proteins: {
          chicken: dict.menuPage.proteins.chicken,
          lamb: dict.menuPage.proteins.lamb,
          beef: dict.menuPage.proteins.beef,
          prawn: dict.menuPage.proteins.prawn,
          fish: dict.menuPage.proteins.fish,
          vegetable: dict.menuPage.proteins.vegetable,
          special: dict.menuPage.proteins.special,
        },
        spiceLevels: [
          dict.menuPage.spice[0],
          dict.menuPage.spice[1],
          dict.menuPage.spice[2],
          dict.menuPage.spice[3],
          dict.menuPage.spice[4],
        ],
        heroImage: menuHeroImage,
      });
    }
    return { ok: true };
  },
});

// Run: npx convex run seed:menuPageContent
export const menuPageContent = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const locale of locales) {
      const dict = dictionaries[locale];
      const data = {
        status: "published" as const,
        eyebrow: dict.menuPage.eyebrow,
        title: dict.menuPage.title,
        accent: dict.menuPage.accent,
        vegetarian: dict.menuPage.vegetarian,
        spiceIndicator: dict.menuPage.spiceIndicator,
        priceNote: dict.menuPage.priceNote,
        chefSpecial: dict.menuPage.chefSpecial,
        proteins: {
          chicken: dict.menuPage.proteins.chicken,
          lamb: dict.menuPage.proteins.lamb,
          beef: dict.menuPage.proteins.beef,
          prawn: dict.menuPage.proteins.prawn,
          fish: dict.menuPage.proteins.fish,
          vegetable: dict.menuPage.proteins.vegetable,
          special: dict.menuPage.proteins.special,
        },
        spiceLevels: [
          dict.menuPage.spice[0],
          dict.menuPage.spice[1],
          dict.menuPage.spice[2],
          dict.menuPage.spice[3],
          dict.menuPage.spice[4],
        ],
        heroImage: menuHeroImage,
      };

      const existing = await ctx.db
        .query("menuPageContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, data);
      } else {
        await ctx.db.insert("menuPageContent", { locale, ...data });
      }
    }

    return { ok: true };
  },
});

// Run: npx convex run seed:contentAssets
export const contentAssets = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const locale of locales) {
      const hero = await ctx.db
        .query("heroContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (hero) await ctx.db.patch(hero._id, { slides: heroSlides });

      const story = await ctx.db
        .query("storyContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (story) await ctx.db.patch(story._id, { image: storyImage });

      const gallery = await ctx.db
        .query("galleryContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (gallery) await ctx.db.patch(gallery._id, { images: galleryImages });

      const cta = await ctx.db
        .query("ctaContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (cta) await ctx.db.patch(cta._id, { backgroundImage: ctaBackgroundImage });

      const menuPage = await ctx.db
        .query("menuPageContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (menuPage) await ctx.db.patch(menuPage._id, { heroImage: menuHeroImage });

      const navbar = await ctx.db
        .query("navbarContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (navbar) await ctx.db.patch(navbar._id, { about: dictionaries[locale].nav.about });

      const footer = await ctx.db
        .query("footerContent")
        .withIndex("by_locale_status", (q) => q.eq("locale", locale).eq("status", "published"))
        .first();
      if (footer) await ctx.db.patch(footer._id, { designedBy: dictionaries[locale].footer.designedBy });
    }

    return { ok: true };
  },
});

// Run: npx convex run seed:categories
export const categories = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (let i = 0; i < menuCategories.length; i++) {
      const cat = menuCategories[i];
      const catId = await ctx.db.insert("menuCategories", {
        slug: cat.id,
        order: i,
        variant: cat.variant,
        bannerImage: cat.bannerImage,
      });

      for (const locale of locales) {
        const localText = menuCategoryText[locale][cat.id];
        await ctx.db.insert("menuCategoryContent", {
          categoryId: catId,
          locale,
          status: "published",
          label: localText?.label ?? cat.label,
          description: localText?.description ?? cat.description,
        });
      }
    }
    return { ok: true };
  },
});

// Run: npx convex run seed:items --args '{"categoryIndex": 0}'
export const items = internalMutation({
  args: { categoryIndex: v.number() },
  handler: async (ctx, { categoryIndex }) => {
    const cat = menuCategories[categoryIndex];
    if (!cat) return { ok: false, message: "Invalid categoryIndex" };

    const catDoc = await ctx.db
      .query("menuCategories")
      .withIndex("by_slug", (q) => q.eq("slug", cat.id))
      .first();
    if (!catDoc) return { ok: false, message: "Category not seeded yet — run seed:categories first" };

    for (let ii = 0; ii < cat.items.length; ii++) {
      const item = cat.items[ii];
      const itemId = await ctx.db.insert("menuItems", {
        slug: item.id,
        categoryId: catDoc._id,
        priceFixed: typeof item.price === "number" ? item.price : undefined,
        priceByProtein: typeof item.price === "object" ? item.price : undefined,
        spiceLevel: item.spiceLevel,
        isVegetarian: item.isVegetarian,
        isChefSpecial: item.isChefSpecial,
        image: item.image,
        order: ii,
      });

      for (const locale of locales) {
        await ctx.db.insert("menuItemContent", {
          itemId,
          locale,
          status: "published",
          name: item.name,
          description: item.description,
          note: item.note,
        });
      }
    }
    return { ok: true, category: cat.id, itemCount: cat.items.length };
  },
});
