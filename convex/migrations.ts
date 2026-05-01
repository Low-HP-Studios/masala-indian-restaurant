import { mutation } from "./_generated/server";

const SECTION_TABLES = [
  "metaContent",
  "navbarContent",
  "heroContent",
  "storyContent",
  "statsContent",
  "featuredContent",
  "menuPreviewContent",
  "galleryContent",
  "valuesContent",
  "ctaContent",
  "footerContent",
  "menuPageContent",
] as const;

// One-time: stamp lastEditedAt on existing rows that don't have it.
// Run: `npx convex run migrations:backfillLastEditedAt`
export const backfillLastEditedAt = mutation({
  args: {},
  handler: async (ctx) => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const db = ctx.db as any;
    const now = Date.now();
    let patched = 0;
    for (const table of SECTION_TABLES) {
      const rows = await db.query(table).collect();
      for (const row of rows) {
        if (row.lastEditedAt === undefined) {
          await db.patch(row._id, { lastEditedAt: now });
          patched++;
        }
      }
    }
    return { patched };
  },
});
