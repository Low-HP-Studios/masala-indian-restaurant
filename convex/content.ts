import { query } from "./_generated/server";
import { v } from "convex/values";

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
    const published = await ctx.db
      .query("metaContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("metaContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getNavbar = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("navbarContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("navbarContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getHero = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("heroContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("heroContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getStory = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("storyContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("storyContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getStats = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("statsContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("statsContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getFeatured = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("featuredContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("featuredContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getMenuPreview = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("menuPreviewContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("menuPreviewContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getGallery = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("galleryContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("galleryContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getValues = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("valuesContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("valuesContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getCta = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("ctaContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("ctaContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getFooter = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("footerContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    return ctx.db
      .query("footerContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});

export const getAllSectionLocales = query({
  args: {},
  handler: async (ctx) => {
    const [meta, navbar, hero, story, stats, featured, menuPreview, gallery, values, cta, footer] =
      await Promise.all([
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
      ]);
    return { meta, navbar, hero, story, stats, featured, menuPreview, gallery, values, cta, footer };
  },
});
