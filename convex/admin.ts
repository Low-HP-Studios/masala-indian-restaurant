import { mutation } from "./_generated/server";
import { v } from "convex/values";

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

const status = v.union(v.literal("draft"), v.literal("published"));

// Generic upsert for any section table
async function upsertSection(
  ctx: any,
  table: string,
  localeVal: string,
  data: Record<string, unknown>
) {
  const existing = await ctx.db
    .query(table)
    .withIndex("by_locale", (q: any) => q.eq("locale", localeVal))
    .first();
  if (existing) {
    await ctx.db.patch(existing._id, data);
    return existing._id;
  }
  return ctx.db.insert(table, { locale: localeVal, ...data });
}

export const upsertHero = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    titleTop: v.string(),
    titleAccent: v.string(),
    body: v.string(),
    primary: v.string(),
    secondary: v.string(),
    scroll: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "heroContent", locale, data);
  },
});

export const upsertMeta = mutation({
  args: {
    locale,
    status,
    homeTitle: v.string(),
    homeDescription: v.string(),
    menuTitle: v.string(),
    menuDescription: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "metaContent", locale, data);
  },
});

export const upsertNavbar = mutation({
  args: {
    locale,
    status,
    brandName: v.string(),
    brandDescriptor: v.string(),
    links: v.array(v.object({ key: v.string(), label: v.string() })),
    reserve: v.string(),
    toggle: v.string(),
    language: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "navbarContent", locale, data);
  },
});

export const upsertStory = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    body1: v.string(),
    body2: v.string(),
    primary: v.string(),
    secondary: v.string(),
    stat: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "storyContent", locale, data);
  },
});

export const upsertStats = mutation({
  args: {
    locale,
    status,
    items: v.array(
      v.object({
        value: v.number(),
        suffix: v.string(),
        prefix: v.optional(v.string()),
        displayValue: v.optional(v.string()),
        label: v.string(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "statsContent", locale, data);
  },
});

export const upsertFeatured = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    cta: v.string(),
    dishes: v.array(
      v.object({
        name: v.string(),
        tagline: v.string(),
        description: v.string(),
        price: v.string(),
        image: v.string(),
        spice: v.number(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "featuredContent", locale, data);
  },
});

export const upsertMenuPreview = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    viewMenu: v.string(),
    viewFull: v.string(),
    categories: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        tagline: v.string(),
        image: v.string(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "menuPreviewContent", locale, data);
  },
});

export const upsertGallery = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "galleryContent", locale, data);
  },
});

export const upsertValues = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    items: v.array(v.object({ title: v.string(), text: v.string() })),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "valuesContent", locale, data);
  },
});

export const upsertCta = mutation({
  args: {
    locale,
    status,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    body: v.string(),
    hours: v.string(),
    addressLine: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "ctaContent", locale, data);
  },
});

export const upsertFooter = mutation({
  args: {
    locale,
    status,
    summary: v.string(),
    navigation: v.string(),
    menu: v.string(),
    visit: v.string(),
    address: v.string(),
    phone: v.string(),
    email: v.string(),
    hours: v.string(),
    rights: v.string(),
    crafted: v.string(),
    links: v.object({
      fullMenu: v.string(),
      special: v.string(),
      starters: v.string(),
      tandoori: v.string(),
      mains: v.string(),
      chef: v.string(),
      drinks: v.string(),
    }),
  },
  handler: async (ctx, { locale, ...data }) => {
    return upsertSection(ctx, "footerContent", locale, data);
  },
});

// Menu category content
export const upsertMenuCategoryContent = mutation({
  args: {
    categoryId: v.id("menuCategories"),
    locale,
    status,
    label: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { categoryId, locale, ...data }) => {
    const existing = await ctx.db
      .query("menuCategoryContent")
      .withIndex("by_category_locale", (q) =>
        q.eq("categoryId", categoryId).eq("locale", locale)
      )
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return ctx.db.insert("menuCategoryContent", {
      categoryId,
      locale,
      ...data,
    });
  },
});

// Menu item content
export const upsertMenuItemContent = mutation({
  args: {
    itemId: v.id("menuItems"),
    locale,
    status,
    name: v.string(),
    description: v.optional(v.string()),
    note: v.optional(v.string()),
  },
  handler: async (ctx, { itemId, locale, ...data }) => {
    const existing = await ctx.db
      .query("menuItemContent")
      .withIndex("by_item_locale", (q) =>
        q.eq("itemId", itemId).eq("locale", locale)
      )
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    }
    return ctx.db.insert("menuItemContent", { itemId, locale, ...data });
  },
});

// Menu item base data
export const upsertMenuItem = mutation({
  args: {
    id: v.optional(v.id("menuItems")),
    slug: v.string(),
    categoryId: v.id("menuCategories"),
    priceFixed: v.optional(v.number()),
    priceByProtein: v.optional(
      v.object({
        chicken: v.optional(v.number()),
        lamb: v.optional(v.number()),
        beef: v.optional(v.number()),
        prawn: v.optional(v.number()),
        fish: v.optional(v.number()),
        vegetable: v.optional(v.number()),
        special: v.optional(v.number()),
      })
    ),
    spiceLevel: v.optional(
      v.union(v.literal(0), v.literal(1), v.literal(2), v.literal(3), v.literal(4))
    ),
    isVegetarian: v.optional(v.boolean()),
    isChefSpecial: v.optional(v.boolean()),
    image: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, { id, ...data }) => {
    if (id) {
      await ctx.db.patch(id, data);
      return id;
    }
    return ctx.db.insert("menuItems", data);
  },
});

export const publishSection = mutation({
  args: { table: v.string(), id: v.string() },
  handler: async (ctx, { table, id }) => {
    // @ts-expect-error dynamic
    await ctx.db.patch(id, { status: "published" });
  },
});

export const unpublishSection = mutation({
  args: { table: v.string(), id: v.string() },
  handler: async (ctx, { table, id }) => {
    // @ts-expect-error dynamic
    await ctx.db.patch(id, { status: "draft" });
  },
});
