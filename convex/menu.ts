import { query } from "./_generated/server";
import { v } from "convex/values";

const locale = v.union(
  v.literal("en"),
  v.literal("nl"),
  v.literal("es"),
  v.literal("fr"),
  v.literal("no")
);

export const getCategories = query({
  args: { locale },
  handler: async (ctx, { locale }) => {
    const categories = await ctx.db.query("menuCategories").collect();
    const sorted = categories.sort((a, b) => a.order - b.order);

    return Promise.all(
      sorted.map(async (cat) => {
        const content = await ctx.db
          .query("menuCategoryContent")
          .withIndex("by_category_locale", (q) =>
            q.eq("categoryId", cat._id).eq("locale", locale)
          )
          .filter((q) => q.eq(q.field("status"), "published"))
          .first();

        const fallback = content
          ? null
          : await ctx.db
              .query("menuCategoryContent")
              .withIndex("by_category_locale", (q) =>
                q.eq("categoryId", cat._id).eq("locale", "en")
              )
              .filter((q) => q.eq(q.field("status"), "published"))
              .first();

        const resolved = content ?? fallback ?? null;

        const items = await ctx.db
          .query("menuItems")
          .withIndex("by_category", (q) => q.eq("categoryId", cat._id))
          .collect();

        const sortedItems = items.sort((a, b) => a.order - b.order);

        const localizedItems = await Promise.all(
          sortedItems.map(async (item) => {
            const itemContent = await ctx.db
              .query("menuItemContent")
              .withIndex("by_item_locale", (q) =>
                q.eq("itemId", item._id).eq("locale", locale)
              )
              .filter((q) => q.eq(q.field("status"), "published"))
              .first();

                const itemFallback = itemContent
              ? null
              : await ctx.db
                  .query("menuItemContent")
                  .withIndex("by_item_locale", (q) =>
                    q.eq("itemId", item._id).eq("locale", "en")
                  )
                  .filter((q) => q.eq(q.field("status"), "published"))
                  .first();

            const resolvedItem = itemContent ?? itemFallback ?? null;

            return {
              ...item,
              name: resolvedItem?.name ?? "",
              description: resolvedItem?.description,
              note: resolvedItem?.note,
            };
          })
        );

        return {
          ...cat,
          label: resolved?.label ?? "",
          description: resolved?.description,
          items: localizedItems,
        };
      })
    );
  },
});

export const getAllCategoriesAdmin = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("menuCategories").collect();
    return categories.sort((a, b) => a.order - b.order);
  },
});

export const getCategoryWithContent = query({
  args: { categoryId: v.id("menuCategories") },
  handler: async (ctx, { categoryId }) => {
    const category = await ctx.db.get(categoryId);
    if (!category) return null;

    const contents = await ctx.db
      .query("menuCategoryContent")
      .withIndex("by_category_locale", (q) => q.eq("categoryId", categoryId))
      .collect();

    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_category", (q) => q.eq("categoryId", categoryId))
      .collect();

    const sortedItems = items.sort((a, b) => a.order - b.order);

    const itemsWithContent = await Promise.all(
      sortedItems.map(async (item) => {
        const itemContents = await ctx.db
          .query("menuItemContent")
          .withIndex("by_item_locale", (q) => q.eq("itemId", item._id))
          .collect();
        return { ...item, contents: itemContents };
      })
    );

    return { ...category, contents, items: itemsWithContent };
  },
});
