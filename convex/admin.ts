import { mutation } from "./_generated/server";
import { v } from "convex/values";
import type { MutationCtx } from "./_generated/server";
import { requireAdmin } from "./authz";

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

// Section name → table name. Used by publish/discard/restore (which need to
// route by section without re-validating every section's full schema).
const SECTION_TABLES: Record<string, string> = {
  meta: "metaContent",
  navbar: "navbarContent",
  hero: "heroContent",
  story: "storyContent",
  stats: "statsContent",
  featured: "featuredContent",
  menuPreview: "menuPreviewContent",
  gallery: "galleryContent",
  values: "valuesContent",
  cta: "ctaContent",
  footer: "footerContent",
  menuPage: "menuPageContent",
};

const sectionName = v.union(
  v.literal("meta"),
  v.literal("navbar"),
  v.literal("hero"),
  v.literal("story"),
  v.literal("stats"),
  v.literal("featured"),
  v.literal("menuPreview"),
  v.literal("gallery"),
  v.literal("values"),
  v.literal("cta"),
  v.literal("footer"),
  v.literal("menuPage")
);

/* eslint-disable @typescript-eslint/no-explicit-any */

// Upsert the **draft** row for a given locale on a section table.
// Never touches the published row.
async function saveDraftRow(
  ctx: MutationCtx,
  table: string,
  localeVal: string,
  data: Record<string, unknown>
) {
  await requireAdmin(ctx);
  const db = ctx.db as any;
  const existing = await db
    .query(table)
    .withIndex("by_locale_status", (q: any) =>
      q.eq("locale", localeVal).eq("status", "draft")
    )
    .first();
  const payload = { ...data, lastEditedAt: Date.now() };
  if (existing) {
    await db.patch(existing._id, payload);
    return existing._id;
  }
  return db.insert(table, {
    locale: localeVal,
    status: "draft",
    ...payload,
  });
}

// Publish: copy draft → published, snapshot to revisions, delete draft.
// If no draft exists for that locale, no-op.
async function publishRow(
  ctx: MutationCtx,
  section: string,
  table: string,
  localeVal: string
) {
  await requireAdmin(ctx);
  const db = ctx.db as any;
  const draft = await db
    .query(table)
    .withIndex("by_locale_status", (q: any) =>
      q.eq("locale", localeVal).eq("status", "draft")
    )
    .first();
  if (!draft) return null;

  const published = await db
    .query(table)
    .withIndex("by_locale_status", (q: any) =>
      q.eq("locale", localeVal).eq("status", "published")
    )
    .first();

  const { _id: _draftId, _creationTime: _draftCt, status: _ds, ...draftFields } = draft;
  const now = Date.now();
  const fields = { ...draftFields, lastEditedAt: now };

  let publishedId;
  if (published) {
    await db.patch(published._id, fields);
    publishedId = published._id;
  } else {
    publishedId = await db.insert(table, {
      ...fields,
      locale: localeVal,
      status: "published",
    });
  }

  const newPublished = await db.get(publishedId);
  const { _id: _pid, _creationTime: _pct, ...snapshotFields } = newPublished;
  await db.insert("contentRevisions", {
    section,
    locale: localeVal,
    snapshot: snapshotFields,
    publishedAt: now,
  });

  await db.delete(draft._id);
  return publishedId;
}

async function discardDraftRow(
  ctx: MutationCtx,
  table: string,
  localeVal: string
) {
  await requireAdmin(ctx);
  const db = ctx.db as any;
  const draft = await db
    .query(table)
    .withIndex("by_locale_status", (q: any) =>
      q.eq("locale", localeVal).eq("status", "draft")
    )
    .first();
  if (draft) await db.delete(draft._id);
}

// ─── Per-section saveDraft mutations (typed args) ─────────────────────────

export const saveDraftHero = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    titleTop: v.string(),
    titleAccent: v.string(),
    body: v.string(),
    primary: v.string(),
    secondary: v.string(),
    scroll: v.string(),
    slides: v.optional(
      v.array(
        v.object({
          src: v.string(),
          srcId: v.optional(v.id("_storage")),
          alt: v.string(),
          position: v.string(),
          accent: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "heroContent", locale, data);
  },
});

export const saveDraftMeta = mutation({
  args: {
    locale,
    homeTitle: v.string(),
    homeDescription: v.string(),
    menuTitle: v.string(),
    menuDescription: v.string(),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "metaContent", locale, data);
  },
});

export const saveDraftNavbar = mutation({
  args: {
    locale,
    brandName: v.string(),
    brandDescriptor: v.string(),
    links: v.array(v.object({ key: v.string(), label: v.string() })),
    reserve: v.string(),
    toggle: v.string(),
    language: v.string(),
    about: v.optional(v.string()),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "navbarContent", locale, data);
  },
});

export const saveDraftStory = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    body1: v.string(),
    body2: v.string(),
    primary: v.string(),
    secondary: v.string(),
    stat: v.string(),
    image: v.optional(
      v.object({
        src: v.string(),
        srcId: v.optional(v.id("_storage")),
        alt: v.string(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "storyContent", locale, data);
  },
});

export const saveDraftStats = mutation({
  args: {
    locale,
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
    return saveDraftRow(ctx, "statsContent", locale, data);
  },
});

export const saveDraftFeatured = mutation({
  args: {
    locale,
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
        srcId: v.optional(v.id("_storage")),
        spice: v.number(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "featuredContent", locale, data);
  },
});

export const saveDraftMenuPreview = mutation({
  args: {
    locale,
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
        srcId: v.optional(v.id("_storage")),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "menuPreviewContent", locale, data);
  },
});

export const saveDraftGallery = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    images: v.optional(
      v.array(
        v.object({
          src: v.string(),
          srcId: v.optional(v.id("_storage")),
          label: v.string(),
          sub: v.string(),
          featured: v.optional(v.boolean()),
        })
      )
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "galleryContent", locale, data);
  },
});

export const saveDraftValues = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    items: v.array(v.object({ title: v.string(), text: v.string() })),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "valuesContent", locale, data);
  },
});

export const saveDraftCta = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    body: v.string(),
    hours: v.string(),
    addressLine: v.string(),
    backgroundImage: v.optional(
      v.object({
        src: v.string(),
        srcId: v.optional(v.id("_storage")),
        alt: v.string(),
        position: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "ctaContent", locale, data);
  },
});

export const saveDraftFooter = mutation({
  args: {
    locale,
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
    designedBy: v.optional(v.string()),
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
    return saveDraftRow(ctx, "footerContent", locale, data);
  },
});

export const saveDraftMenuPage = mutation({
  args: {
    locale,
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    vegetarian: v.string(),
    spiceIndicator: v.string(),
    priceNote: v.string(),
    chefSpecial: v.string(),
    proteins: v.object({
      chicken: v.string(),
      lamb: v.string(),
      beef: v.string(),
      prawn: v.string(),
      fish: v.string(),
      vegetable: v.string(),
      special: v.string(),
    }),
    spiceLevels: v.array(v.string()),
    heroImage: v.optional(
      v.object({
        src: v.string(),
        srcId: v.optional(v.id("_storage")),
        alt: v.string(),
        position: v.string(),
      })
    ),
  },
  handler: async (ctx, { locale, ...data }) => {
    return saveDraftRow(ctx, "menuPageContent", locale, data);
  },
});

// ─── Generic publish / discard / restore ──────────────────────────────────

export const publishSectionLocale = mutation({
  args: { section: sectionName, locale },
  handler: async (ctx, { section, locale }) => {
    const table = SECTION_TABLES[section];
    return publishRow(ctx, section, table, locale);
  },
});

export const discardDraft = mutation({
  args: { section: sectionName, locale },
  handler: async (ctx, { section, locale }) => {
    const table = SECTION_TABLES[section];
    return discardDraftRow(ctx, table, locale);
  },
});

export const restoreRevision = mutation({
  args: { revisionId: v.id("contentRevisions") },
  handler: async (ctx, { revisionId }) => {
    await requireAdmin(ctx);
    const db = ctx.db as any;
    const revision = await db.get(revisionId);
    if (!revision) throw new Error("Revision not found");
    const table = SECTION_TABLES[revision.section];
    if (!table) throw new Error(`Unknown section: ${revision.section}`);

    const { locale: _locale, status: _status, lastEditedAt: _le, ...fields } =
      revision.snapshot ?? {};
    return saveDraftRow(ctx, table, revision.locale, fields);
  },
});

// ─── Menu (unchanged for now) ─────────────────────────────────────────────

const status = v.union(v.literal("draft"), v.literal("published"));

export const upsertMenuCategory = mutation({
  args: {
    id: v.id("menuCategories"),
    slug: v.string(),
    order: v.number(),
    variant: v.optional(
      v.union(
        v.literal("default"),
        v.literal("special"),
        v.literal("chef"),
        v.literal("tandoori"),
        v.literal("biryani")
      )
    ),
    bannerImage: v.optional(v.string()),
    bannerImageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { id, bannerImage, bannerImageId, ...data }) => {
    await requireAdmin(ctx);
    const resolvedBanner = bannerImageId
      ? await ctx.storage.getUrl(bannerImageId)
      : null;
    await ctx.db.patch(id, {
      ...data,
      bannerImage: resolvedBanner ?? bannerImage,
      bannerImageId,
    });
    return id;
  },
});

export const upsertMenuCategoryContent = mutation({
  args: {
    categoryId: v.id("menuCategories"),
    locale,
    status,
    label: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { categoryId, locale, ...data }) => {
    await requireAdmin(ctx);
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
    await requireAdmin(ctx);
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
    imageId: v.optional(v.id("_storage")),
    order: v.number(),
  },
  handler: async (ctx, { id, image, imageId, ...data }) => {
    await requireAdmin(ctx);
    const resolvedImage = imageId ? await ctx.storage.getUrl(imageId) : null;
    const payload = {
      ...data,
      image: resolvedImage ?? image,
      imageId,
    };

    if (id) {
      await ctx.db.patch(id, payload);
      return id;
    }
    return ctx.db.insert("menuItems", payload);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return ctx.storage.generateUploadUrl();
  },
});

// Keep legacy menu publish/unpublish helpers (used by menu admin only).
export const publishSection = mutation({
  args: { table: v.string(), id: v.string() },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    // @ts-expect-error dynamic
    await ctx.db.patch(id, { status: "published" });
  },
});

export const unpublishSection = mutation({
  args: { table: v.string(), id: v.string() },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx);
    // @ts-expect-error dynamic
    await ctx.db.patch(id, { status: "draft" });
  },
});
