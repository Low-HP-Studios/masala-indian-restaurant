import { query } from "./_generated/server";
import { v } from "convex/values";

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

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

export const listRevisions = query({
  args: { section: sectionName, locale },
  handler: async (ctx, { section, locale }) => {
    return ctx.db
      .query("contentRevisions")
      .withIndex("by_section_locale", (q) =>
        q.eq("section", section).eq("locale", locale)
      )
      .order("desc")
      .take(50);
  },
});

export const getRevision = query({
  args: { revisionId: v.id("contentRevisions") },
  handler: async (ctx, { revisionId }) => {
    return ctx.db.get(revisionId);
  },
});
