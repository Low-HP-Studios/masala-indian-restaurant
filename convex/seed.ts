import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { type Id } from "./_generated/dataModel";
import { locales, dictionaries, menuCategoryText } from "@/lib/i18n";
import { menuCategories } from "@/data/menu";

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
        links: dict.footer.links,
      });
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
