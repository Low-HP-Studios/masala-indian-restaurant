import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

const status = v.union(v.literal("draft"), v.literal("published"));

export default defineSchema({
  ...authTables,

  // ─── Assets ───────────────────────────────────────────────────────────────

  assets: defineTable({
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    originalPath: v.optional(v.string()),
  }).index("by_original_path", ["originalPath"]),

  // ─── Page section content (one row per locale per status: draft + published) ─

  metaContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
    homeTitle: v.string(),
    homeDescription: v.string(),
    menuTitle: v.string(),
    menuDescription: v.string(),
  }).index("by_locale_status", ["locale", "status"]),

  navbarContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
    brandName: v.string(),
    brandDescriptor: v.string(),
    links: v.array(v.object({ key: v.string(), label: v.string() })),
    reserve: v.string(),
    toggle: v.string(),
    language: v.string(),
    about: v.optional(v.string()),
  }).index("by_locale_status", ["locale", "status"]),

  heroContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  storyContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  statsContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
    items: v.array(
      v.object({
        value: v.number(),
        suffix: v.string(),
        prefix: v.optional(v.string()),
        displayValue: v.optional(v.string()),
        label: v.string(),
      })
    ),
  }).index("by_locale_status", ["locale", "status"]),

  featuredContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  menuPreviewContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  galleryContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  valuesContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
    eyebrow: v.string(),
    title: v.string(),
    accent: v.string(),
    items: v.array(v.object({ title: v.string(), text: v.string() })),
  }).index("by_locale_status", ["locale", "status"]),

  ctaContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  footerContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  menuPageContent: defineTable({
    locale,
    status,
    lastEditedAt: v.optional(v.number()),
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
  }).index("by_locale_status", ["locale", "status"]),

  // ─── Revisions (publish snapshots) ────────────────────────────────────────

  contentRevisions: defineTable({
    section: v.string(),
    locale: v.string(),
    snapshot: v.any(),
    publishedAt: v.number(),
  }).index("by_section_locale", ["section", "locale"]),

  // ─── Menu ─────────────────────────────────────────────────────────────────

  menuCategories: defineTable({
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
  }).index("by_slug", ["slug"]),

  menuCategoryContent: defineTable({
    categoryId: v.id("menuCategories"),
    locale,
    status,
    label: v.string(),
    description: v.optional(v.string()),
  })
    .index("by_category_locale", ["categoryId", "locale"])
    .index("by_locale", ["locale"]),

  menuItems: defineTable({
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
    spiceLevel: v.optional(v.union(v.literal(0), v.literal(1), v.literal(2), v.literal(3), v.literal(4))),
    isVegetarian: v.optional(v.boolean()),
    isChefSpecial: v.optional(v.boolean()),
    image: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  menuItemContent: defineTable({
    itemId: v.id("menuItems"),
    locale,
    status,
    name: v.string(),
    description: v.optional(v.string()),
    note: v.optional(v.string()),
  })
    .index("by_item_locale", ["itemId", "locale"])
    .index("by_locale", ["locale"]),
});
