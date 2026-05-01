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
            const imageFromStorage = item.imageId
              ? await ctx.storage.getUrl(item.imageId)
              : null;

            return {
              ...item,
              image: imageFromStorage ?? item.image,
              name: itemContent?.name ?? "",
              description: itemContent?.description,
              note: itemContent?.note,
            };
          })
        );

        const bannerFromStorage = cat.bannerImageId
          ? await ctx.storage.getUrl(cat.bannerImageId)
          : null;

        return {
          ...cat,
          bannerImage: bannerFromStorage ?? cat.bannerImage,
          label: content?.label ?? "",
          description: content?.description,
          items: localizedItems,
        };
      })
    );
  },
});

export const getAllCategoriesAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const categories = await ctx.db.query("menuCategories").collect();
    const sorted = categories.sort((a, b) => a.order - b.order);
    return Promise.all(
      sorted.map(async (cat) => {
        const bannerFromStorage = cat.bannerImageId
          ? await ctx.storage.getUrl(cat.bannerImageId)
          : null;
        return {
          ...cat,
          bannerImage: bannerFromStorage ?? cat.bannerImage,
        };
      })
    );
  },
});

export const getCategoryWithContent = query({
  args: { categoryId: v.id("menuCategories") },
  handler: async (ctx, { categoryId }) => {
    await requireAdmin(ctx);
    const category = await ctx.db.get(categoryId);
    if (!category) return null;

    const bannerFromStorage = category.bannerImageId
      ? await ctx.storage.getUrl(category.bannerImageId)
      : null;

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
        const imageFromStorage = item.imageId
          ? await ctx.storage.getUrl(item.imageId)
          : null;
        return {
          ...item,
          image: imageFromStorage ?? item.image,
          contents: itemContents,
        };
      })
    );

    return {
      ...category,
      bannerImage: bannerFromStorage ?? category.bannerImage,
      contents,
      items: itemsWithContent,
    };
  },
});
