<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->

---

# Project: Masala Indian Restaurant — CMS Admin

## Overview

Restaurant website with a Contentful-style CMS admin. The site serves public customers at `localhost:3000/[locale]` and admins at `localhost:3000/admin`. Both live in the same Next.js app.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.4 | App Router, SSR, routing |
| Convex | 1.36.1 | Database + real-time backend |
| Tailwind CSS | v4 | Styling (`@import "tailwindcss"` syntax — NOT v3) |
| shadcn/ui | latest | Admin UI components |
| Motion | 12 | Animations on public site |
| TypeScript | 5 | Strict mode |

**Package manager: pnpm**

## Running Locally

Both processes must run simultaneously:

```bash
npx convex dev        # Convex dev server (terminal 1)
pnpm dev              # Next.js dev server (terminal 2)
```

Admin UI: `http://localhost:3000/admin`
Public site: `http://localhost:3000/en` (or `/nl`, `/es`, `/fr`, `/no`)

## Locales

Five locales: `en` (default), `nl`, `es`, `fr`, `no`.

Defined in `lib/i18n.ts`:
```ts
export const locales = ["en", "nl", "es", "fr", "no"] as const;
export type Locale = (typeof locales)[number];
```

The middleware (`proxy.ts`) redirects all non-locale, non-admin paths to `/{defaultLocale}/path`. Admin is excluded explicitly.

## Architecture Decisions

### Same-app admin (not separate repo)
Content changes reflect instantly in the same deployment. Types are shared. One deploy pipeline.

### Convex for everything
- Real-time by default
- Built-in file storage for images (storageId → CDN URL)
- Auth via Convex Auth (Google OAuth — not yet wired, planned)
- No separate API layer needed

### Content model: one table per section, one row per locale
Mirrors Contentful's Content Type → Entry pattern. Each section table has:
- `locale` field (indexed)
- `status: "draft" | "published"`
- Section-specific typed fields

Public pages only fetch `published` rows. Fallback: if locale has no published entry, fall back to `en`.

### Menu: split locale-independent from locale-specific
- `menuCategories` — slug, order, variant, bannerImage (locale-independent)
- `menuCategoryContent` — label, description per locale
- `menuItems` — price, spiceLevel, flags, image (locale-independent)
- `menuItemContent` — name, description, note per locale

## Database Schema

### Page section tables (all share this shape)
```
{ locale, status, ...section-specific fields }
index: by_locale
```

Tables: `metaContent`, `navbarContent`, `heroContent`, `storyContent`, `statsContent`, `featuredContent`, `menuPreviewContent`, `galleryContent`, `valuesContent`, `ctaContent`, `footerContent`

### Menu tables
```
menuCategories:      { slug, order, variant?, bannerImage? }
menuCategoryContent: { categoryId, locale, status, label, description? }
menuItems:           { slug, categoryId, priceFixed?, priceByProtein?, spiceLevel?, isVegetarian?, isChefSpecial?, image?, order }
menuItemContent:     { itemId, locale, status, name, description?, note? }
```

## Key Files

```
convex/
  schema.ts          — All table definitions
  content.ts         — Public queries (getHero, getNavbar, etc.)
  menu.ts            — Public menu queries + admin menu queries
  admin.ts           — Mutations for admin save/publish
  seed.ts            — One-time data migration from static → Convex

lib/
  i18n.ts            — Legacy static dictionaries (still used by public pages — TO BE REPLACED)
  menu-ui.ts         — Menu UI helpers

data/
  menu.ts            — Legacy static menu data (still used by public pages — TO BE REPLACED)

app/
  [lang]/            — Public site routes
    page.tsx         — Home page (still reads from i18n.ts — TO BE REPLACED)
    menu/            — Menu page (still reads from data/menu.ts — TO BE REPLACED)
  admin/             — CMS admin (reads/writes Convex)
    layout.tsx       — Sidebar + ConvexProvider wrapper
    page.tsx         — Dashboard overview
    sections/[section]/page.tsx — Section editor with locale tabs
    menu/page.tsx    — Menu category + item editor
  layout.tsx         — Root layout
  globals.css        — Tailwind v4 + CSS custom properties

proxy.ts             — Next.js middleware (locale redirect, excludes /admin)
```

## Current State (as of 2026-04-29)

### Done
- [x] Convex initialized and connected
- [x] Full schema defined (14 tables)
- [x] All static data seeded into Convex (5 locales × 11 sections + 16 categories + 149 items)
- [x] shadcn/ui installed and configured
- [x] Admin UI at `/admin` with sidebar navigation
- [x] Section editors at `/admin/sections/[section]` — locale tabs, field forms, draft/publish
- [x] Menu editor at `/admin/menu` — category list + item editor per locale
- [x] Middleware patched to exclude `/admin` from locale redirect

### Not Done Yet
- [ ] **Wire public home page to Convex** — `app/[lang]/page.tsx` still reads from `lib/i18n.ts`
- [ ] **Wire public menu page to Convex** — still reads from `data/menu.ts`
- [ ] **Convex Auth + Google OAuth** — `/admin` is unprotected
- [ ] **Image upload UI** — Convex file storage wired up, but no upload UI yet
- [ ] **Dedicated editors** for complex sections (featured dishes array, menu preview categories, values items, footer links, stats)
- [ ] **Vercel integration** — prod/preview Convex deployments not linked yet
- [ ] **`data/menu.ts` and `lib/i18n.ts` deprecation** — once public pages read from Convex, these become the seed source only

## Seed Commands

Run once to populate Convex from static data. **Do not run twice** (no dedup guard, will create duplicates).

```bash
npx convex run seed:content          # Page section content (5 locales)
npx convex run seed:categories       # Menu categories
npx convex run seed:items '{"categoryIndex": 0}'   # One category at a time (0–15)
```

## How to Add a New Section

1. Add table to `convex/schema.ts` with `locale` + `status` + typed fields + `by_locale` index
2. Add query to `convex/content.ts` (copy pattern from `getHero`)
3. Add mutation to `convex/admin.ts` (copy pattern from `upsertHero`)
4. Add editor component in `app/admin/sections/[section]/page.tsx`
5. Add to `SECTION_LABELS` map and sidebar in `app/admin/layout.tsx`
6. Update `getAllSectionLocales` in `content.ts` to include the new table
7. Add seed entry in `convex/seed.ts`

## How to Add a New Locale

1. Add to `locales` array in `lib/i18n.ts`
2. Add translations to `dictionaries` in `lib/i18n.ts`
3. Add to `LOCALES` array in `app/admin/sections/[section]/page.tsx` and `app/admin/menu/page.tsx`
4. Update `locale` validator in `convex/schema.ts`, `convex/content.ts`, `convex/admin.ts`, `convex/menu.ts`
5. Seed content for the new locale

## Convex Query Pattern

All public queries follow this locale-with-en-fallback pattern:

```ts
export const getHero = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const published = await ctx.db
      .query("heroContent")
      .withIndex("by_locale", (q) => q.eq("locale", locale))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
    if (published) return published;
    // fallback to English
    return ctx.db
      .query("heroContent")
      .withIndex("by_locale", (q) => q.eq("locale", "en"))
      .filter((q) => q.eq(q.field("status"), "published"))
      .first();
  },
});
```

## Wiring Public Pages to Convex (Next Steps)

The public pages are server components. To fetch from Convex in RSC:

```ts
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// In a server component:
const heroData = await fetchQuery(api.content.getHero, { locale });
```

Replace the `getDictionary(locale)` calls in `app/[lang]/page.tsx` with Convex fetches, then pass the data as props to each section component.

The section components (`Hero`, `Navbar`, etc.) already accept typed props — the shape just needs to match the Convex document shape instead of the dictionary shape.
