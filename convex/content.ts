import { query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authz";

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

export const getMeta = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("metaContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getNavbar = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("navbarContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getHero = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("heroContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getStory = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("storyContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getStats = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("statsContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getFeatured = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("featuredContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getMenuPreview = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("menuPreviewContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getGallery = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("galleryContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getValues = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("valuesContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getCta = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("ctaContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getFooter = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("footerContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

export const getMenuPage = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    return ctx.db
      .query("menuPageContent")
      .withIndex("by_locale_status", (q) =>
        q.eq("locale", locale).eq("status", "published")
      )
      .first();
  },
});

// Admin: returns { section: { locale: { draft, published } } }.
// Bounded by sections × locales × 2 statuses = ~120 rows total. Safe to collect.
const SECTION_TABLES = [
  ["meta", "metaContent"],
  ["navbar", "navbarContent"],
  ["hero", "heroContent"],
  ["story", "storyContent"],
  ["stats", "statsContent"],
  ["featured", "featuredContent"],
  ["menuPreview", "menuPreviewContent"],
  ["gallery", "galleryContent"],
  ["values", "valuesContent"],
  ["cta", "ctaContent"],
  ["footer", "footerContent"],
  ["menuPage", "menuPageContent"],
] as const;

export const getAdminSections = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const db = ctx.db as any;
    const result: Record<string, Record<string, { draft: any; published: any }>> = {};

    for (const [section, table] of SECTION_TABLES) {
      const rows = await db.query(table).collect();
      const byLocale: Record<string, { draft: any; published: any }> = {};
      for (const row of rows) {
        const bucket = byLocale[row.locale] ?? { draft: null, published: null };
        if (row.status === "draft") bucket.draft = row;
        else if (row.status === "published") bucket.published = row;
        byLocale[row.locale] = bucket;
      }
      result[section] = byLocale;
    }

    return result;
  },
});

// Kept for backward compat during transition; returns flat lists per section.
export const getAllSectionLocales = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const [
      meta,
      navbar,
      hero,
      story,
      stats,
      featured,
      menuPreview,
      gallery,
      values,
      cta,
      footer,
      menuPage,
    ] = await Promise.all([
      ctx.db.query("metaContent").collect(),
      ctx.db.query("navbarContent").collect(),
      ctx.db.query("heroContent").collect(),
      ctx.db.query("storyContent").collect(),
      ctx.db.query("statsContent").collect(),
      ctx.db.query("featuredContent").collect(),
      ctx.db.query("menuPreviewContent").collect(),
      ctx.db.query("galleryContent").collect(),
      ctx.db.query("valuesContent").collect(),
      ctx.db.query("ctaContent").collect(),
      ctx.db.query("footerContent").collect(),
      ctx.db.query("menuPageContent").collect(),
    ]);
    return {
      meta,
      navbar,
      hero,
      story,
      stats,
      featured,
      menuPreview,
      gallery,
      values,
      cta,
      footer,
      menuPage,
    };
  },
});
