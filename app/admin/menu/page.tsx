"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { ImagePlus, Plus, Save, Upload } from "lucide-react";
import { toast } from "sonner";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Dutch" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "no", label: "Norwegian" },
] as const;
type Locale = (typeof LOCALES)[number]["code"];

const PROTEINS = [
  "chicken",
  "lamb",
  "beef",
  "prawn",
  "fish",
  "vegetable",
  "special",
] as const;

type Protein = (typeof PROTEINS)[number];
type PriceMode = "fixed" | "protein";

function parseOptionalNumber(value: string) {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatPrice(value: unknown) {
  return typeof value === "number" ? value.toFixed(2) : "";
}

function CategoryPill({
  category,
  locale,
  selected,
  onSelect,
}: {
  category: any;
  locale: Locale;
  selected: boolean;
  onSelect: () => void;
}) {
  const catData = useQuery(api.menu.getCategoryWithContent, {
    categoryId: category._id as Id<"menuCategories">,
  });
  const content = catData?.contents.find((c: any) => c.locale === locale);
  return (
    <button
      onClick={onSelect}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors ${
        selected
          ? "border-zinc-200 bg-zinc-100 text-zinc-950"
          : "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {content?.label ?? category.slug}
    </button>
  );
}

function CategoryRow({
  category,
  locale,
  onSelect,
  selected,
}: {
  category: any;
  locale: Locale;
  onSelect: () => void;
  selected: boolean;
}) {
  const catData = useQuery(api.menu.getCategoryWithContent, {
    categoryId: category._id as Id<"menuCategories">,
  });

  const content = catData?.contents.find((c: any) => c.locale === locale);

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
        selected
          ? "bg-zinc-700 border-zinc-600 text-white"
          : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium truncate">
          {content?.label ?? category.slug}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-zinc-500">
            {catData?.items.length ?? 0} items
          </span>
          <Badge
            variant="secondary"
            className={
              content?.status === "published"
                ? "bg-green-900/40 text-green-400 border-green-800 text-xs"
                : "bg-zinc-800 text-zinc-500 border-zinc-700 text-xs"
            }
          >
            {content?.status ?? "-"}
          </Badge>
        </div>
      </div>
    </button>
  );
}

function MenuItemEditor({
  item,
  categoryId,
  locale,
  onCreated,
}: {
  item?: any;
  categoryId: Id<"menuCategories">;
  locale: Locale;
  onCreated?: () => void;
}) {
  const upsertItem = useMutation(api.admin.upsertMenuItem);
  const upsertContent = useMutation(api.admin.upsertMenuItemContent);
  const generateUploadUrl = useMutation(api.admin.generateUploadUrl);
  const content = item?.contents?.find((c: any) => c.locale === locale);
  const priceByProtein = item?.priceByProtein ?? {};

  const [contentFields, setContentFields] = useState({
    name: content?.name ?? "",
    description: content?.description ?? "",
    note: content?.note ?? "",
  });
  const [baseFields, setBaseFields] = useState({
    slug: item?.slug ?? "",
    order: String(item?.order ?? 0),
    priceFixed: formatPrice(item?.priceFixed),
    priceMode: item?.priceByProtein
      ? ("protein" as PriceMode)
      : ("fixed" as PriceMode),
    spiceLevel: item?.spiceLevel == null ? "none" : String(item.spiceLevel),
    isVegetarian: Boolean(item?.isVegetarian),
    isChefSpecial: Boolean(item?.isChefSpecial),
    image: item?.image ?? "",
    imageId: item?.imageId as Id<"_storage"> | undefined,
    proteinPrices: Object.fromEntries(
      PROTEINS.map((protein) => [
        protein,
        formatPrice(priceByProtein[protein]),
      ])
    ) as Record<Protein, string>,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const setContent = (key: string) => (value: string) =>
    setContentFields((fields) => ({ ...fields, [key]: value }));
  const setBase = (key: string, value: any) =>
    setBaseFields((fields) => ({ ...fields, [key]: value }));

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!response.ok) throw new Error("Upload failed");

      const { storageId } = await response.json();
      setBaseFields((fields) => ({
        ...fields,
        imageId: storageId as Id<"_storage">,
      }));
      setImagePreview(URL.createObjectURL(file));
      toast.success("Image uploaded. Save the item to attach it.");
    } catch (error: any) {
      toast.error(error?.message ?? "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function buildPriceByProtein() {
    const entries = PROTEINS.flatMap((protein) => {
      const value = parseOptionalNumber(baseFields.proteinPrices[protein]);
      return value == null ? [] : [[protein, value] as const];
    });
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }

  async function save(status: "draft" | "published") {
    if (!baseFields.slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    if (!contentFields.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setBusy(true);
    try {
      const itemId = await upsertItem({
        id: item?._id,
        categoryId,
        slug: baseFields.slug.trim(),
        order: Number(baseFields.order) || 0,
        priceFixed:
          baseFields.priceMode === "fixed"
            ? parseOptionalNumber(baseFields.priceFixed)
            : undefined,
        priceByProtein:
          baseFields.priceMode === "protein" ? buildPriceByProtein() : undefined,
        spiceLevel:
          baseFields.spiceLevel === "none"
            ? undefined
            : (Number(baseFields.spiceLevel) as 0 | 1 | 2 | 3 | 4),
        isVegetarian: baseFields.isVegetarian,
        isChefSpecial: baseFields.isChefSpecial,
        image: baseFields.image.trim() || undefined,
        imageId: baseFields.imageId,
      });

      await upsertContent({
        itemId,
        locale,
        status,
        name: contentFields.name.trim(),
        description: contentFields.description.trim() || undefined,
        note: contentFields.note.trim() || undefined,
      });

      toast.success(status === "published" ? "Item published" : "Item saved as draft");
      onCreated?.();
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to save item");
    } finally {
      setBusy(false);
    }
  }

  const status = content?.status ?? "new";
  const preview = imagePreview ?? baseFields.image;

  return (
    <div className="bg-zinc-800/50 rounded-lg border border-zinc-800 p-4 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-zinc-300 text-xs font-medium">
            {item ? item.slug : "New menu item"}
          </p>
          <p className="text-zinc-600 text-[11px]">
            Base item fields affect every locale. Text fields affect {locale}.
          </p>
        </div>
        <Badge
          variant="secondary"
          className={
            status === "published"
              ? "bg-green-900/40 text-green-400 border-green-800 text-xs"
              : "bg-zinc-800 text-zinc-500 border-zinc-700 text-xs"
          }
        >
          {status}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-[96px_minmax(0,1fr)]">
        <div className="space-y-2">
          <div className="aspect-square overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 flex items-center justify-center">
            {preview ? (
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${preview}")` }}
              />
            ) : (
              <ImagePlus className="size-6 text-zinc-600" />
            )}
          </div>
          <Label className="flex h-8 cursor-pointer items-center justify-center gap-1 rounded-md border border-zinc-700 text-[11px] text-zinc-300 hover:bg-zinc-800">
            <Upload className="size-3" />
            {uploading ? "Uploading" : "Image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadImage(file);
                event.target.value = "";
              }}
            />
          </Label>
        </div>

        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Slug</Label>
              <Input
                value={baseFields.slug}
                onChange={(event) => setBase("slug", event.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Order</Label>
              <Input
                type="number"
                value={baseFields.order}
                onChange={(event) => setBase("order", event.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Name</Label>
              <Input
                value={contentFields.name}
                onChange={(event) => setContent("name")(event.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Spice</Label>
              <Select
                value={baseFields.spiceLevel}
                onValueChange={(value) => setBase("spiceLevel", value)}
              >
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-zinc-100 border border-zinc-800">
                  <SelectItem value="none">None</SelectItem>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <SelectItem key={level} value={String(level)}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Description</Label>
            <Textarea
              value={contentFields.description}
              onChange={(event) => setContent("description")(event.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-sm min-h-[60px] resize-none"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Note</Label>
            <Input
              value={contentFields.note}
              onChange={(event) => setContent("note")(event.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setBase("priceMode", "fixed")}
                className={`h-7 border-zinc-700 text-xs transition-colors ${
                  baseFields.priceMode === "fixed"
                    ? "bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white"
                    : "bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                Fixed price
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setBase("priceMode", "protein")}
                className={`h-7 border-zinc-700 text-xs transition-colors ${
                  baseFields.priceMode === "protein"
                    ? "bg-zinc-950 text-white hover:bg-zinc-900 hover:text-white"
                    : "bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                Protein prices
              </Button>
            </div>

            {baseFields.priceMode === "fixed" ? (
              <div className="space-y-1">
                <Label className="text-zinc-400 text-xs">Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={baseFields.priceFixed}
                  onChange={(event) => setBase("priceFixed", event.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
                {PROTEINS.map((protein) => (
                  <div key={protein} className="space-y-1">
                    <Label className="text-zinc-400 text-xs capitalize">
                      {protein}
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={baseFields.proteinPrices[protein]}
                      onChange={(event) =>
                        setBaseFields((fields) => ({
                          ...fields,
                          proteinPrices: {
                            ...fields.proteinPrices,
                            [protein]: event.target.value,
                          },
                        }))
                      }
                      className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={baseFields.isVegetarian}
                onChange={(event) => setBase("isVegetarian", event.target.checked)}
                className="size-4 accent-green-700"
              />
              Vegetarian
            </label>
            <label className="flex items-center gap-2 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={baseFields.isChefSpecial}
                onChange={(event) => setBase("isChefSpecial", event.target.checked)}
                className="size-4 accent-amber-600"
              />
              Chef special
            </label>
          </div>

          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Image URL</Label>
            <Input
              value={baseFields.image}
              onChange={(event) => setBase("image", event.target.value)}
              placeholder="/images/food/1.jpg"
              className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => save("draft")}
          disabled={busy || uploading}
          className="h-8 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <Save className="size-3" />
          Draft
        </Button>
        <Button
          size="sm"
          onClick={() => save("published")}
          disabled={busy || uploading}
          className="h-8 text-xs bg-green-700 hover:bg-green-600 text-white"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}

function CategoryDetail({
  categoryId,
  locale,
}: {
  categoryId: Id<"menuCategories">;
  locale: Locale;
}) {
  const catData = useQuery(api.menu.getCategoryWithContent, { categoryId });

  if (!catData) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  return <CategoryDetailLoaded categoryId={categoryId} locale={locale} catData={catData} />;
}

function CategoryDetailLoaded({
  categoryId,
  locale,
  catData,
}: {
  categoryId: Id<"menuCategories">;
  locale: Locale;
  catData: NonNullable<ReturnType<typeof useQuery<typeof api.menu.getCategoryWithContent>>>;
}) {
  const upsertCatContent = useMutation(api.admin.upsertMenuCategoryContent);
  const upsertCategory = useMutation(api.admin.upsertMenuCategory);
  const generateUploadUrl = useMutation(api.admin.generateUploadUrl);
  const content = catData.contents.find((c: any) => c.locale === locale);
  const [catFields, setCatFields] = useState({
    label: content?.label ?? "",
    description: content?.description ?? "",
  });
  const [bannerFields, setBannerFields] = useState({
    bannerImage: catData.bannerImage ?? "",
    bannerImageId: catData.bannerImageId as Id<"_storage"> | undefined,
  });
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerBusy, setBannerBusy] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);

  async function uploadBanner(file: File) {
    setBannerUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!response.ok) throw new Error("Upload failed");
      const { storageId } = await response.json();
      setBannerFields((fields) => ({
        ...fields,
        bannerImageId: storageId as Id<"_storage">,
      }));
      setBannerPreview(URL.createObjectURL(file));
      toast.success("Banner uploaded. Save banner to attach it.");
    } catch (error: any) {
      toast.error(error?.message ?? "Banner upload failed");
    } finally {
      setBannerUploading(false);
    }
  }

  async function saveBanner() {
    setBannerBusy(true);
    try {
      await upsertCategory({
        id: categoryId,
        slug: catData.slug,
        order: catData.order,
        variant: catData.variant,
        bannerImage: bannerFields.bannerImage.trim() || undefined,
        bannerImageId: bannerFields.bannerImageId,
      });
      toast.success("Banner saved");
      setBannerPreview(null);
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to save banner");
    } finally {
      setBannerBusy(false);
    }
  }

  async function saveCat(status: "draft" | "published") {
    await upsertCatContent({
      categoryId,
      locale,
      status,
      label: catFields.label,
      description: catFields.description || undefined,
    });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  const bannerSrc = bannerPreview ?? bannerFields.bannerImage;

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-lg p-4 space-y-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-white">Showcase Image</h3>
          <p className="text-[11px] text-zinc-500">Locale-independent</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
          <div className="aspect-[4/3] overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 flex items-center justify-center">
            {bannerSrc ? (
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url("${bannerSrc}")` }}
              />
            ) : (
              <ImagePlus className="size-7 text-zinc-600" />
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs uppercase tracking-wide">
                Image URL
              </Label>
              <Input
                value={bannerFields.bannerImage}
                onChange={(event) =>
                  setBannerFields((fields) => ({
                    ...fields,
                    bannerImage: event.target.value,
                  }))
                }
                placeholder="/images/menu-image/butter-chicken.png"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Label className="flex h-8 cursor-pointer items-center justify-center gap-1 rounded-md border border-zinc-700 px-3 text-xs text-zinc-300 hover:bg-zinc-800">
                <Upload className="size-3" />
                {bannerUploading ? "Uploading" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={bannerUploading}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void uploadBanner(file);
                    event.target.value = "";
                  }}
                />
              </Label>
              <Button
                size="sm"
                onClick={() => saveBanner()}
                disabled={bannerBusy || bannerUploading}
                className="h-8 text-xs bg-zinc-100 text-zinc-950 hover:bg-white"
              >
                <Save className="size-3" />
                Save banner
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4 space-y-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-white">Category Content</h3>
          <Badge
            variant="secondary"
            className={
              content?.status === "published"
                ? "bg-green-900/40 text-green-400 border-green-800"
                : "bg-zinc-800 text-zinc-500 border-zinc-700"
            }
          >
            {content?.status ?? "no data"}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs uppercase tracking-wide">Label</Label>
            <Input
              value={catFields.label}
              onChange={(e) => setCatFields((f) => ({ ...f, label: e.target.value }))}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs uppercase tracking-wide">Description</Label>
            <Textarea
              value={catFields.description}
              onChange={(e) => setCatFields((f) => ({ ...f, description: e.target.value }))}
              className="bg-zinc-800 border-zinc-700 text-white resize-none min-h-[70px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => saveCat("draft")}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Save draft
          </Button>
          <Button
            size="sm"
            onClick={() => saveCat("published")}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-medium text-zinc-300">
            Items ({catData.items.length})
          </h3>
          <Button
            size="sm"
            onClick={() => setShowNewItem((value) => !value)}
            className="h-8 bg-zinc-100 text-zinc-950 hover:bg-white"
          >
            <Plus className="size-4" />
            Add item
          </Button>
        </div>

        {showNewItem && (
          <MenuItemEditor
            key={`new-${categoryId}-${locale}`}
            categoryId={categoryId}
            locale={locale}
            onCreated={() => setShowNewItem(false)}
          />
        )}

        {catData.items.map((item: any) => (
          <MenuItemEditor
            key={`${item._id}-${locale}`}
            item={item}
            categoryId={categoryId}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

export default function MenuAdminPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedId, setSelectedId] = useState<Id<"menuCategories"> | null>(null);
  const categories = useQuery(api.menu.getAllCategoriesAdmin);

  return (
    <>
      <Toaster />
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <div className="z-20 shrink-0 border-b border-zinc-800 bg-zinc-900/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 lg:pt-8 lg:pb-6">
          <div className="mb-4 sm:mb-6">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Menu</p>
            <h1 className="text-xl font-semibold text-white">Categories & Items</h1>
          </div>

          <Tabs value={locale} onValueChange={(v) => setLocale(v as Locale)}>
            <TabsList className="no-scrollbar max-w-full justify-start overflow-x-auto bg-zinc-800 border border-zinc-700">
              {LOCALES.map((l) => (
                <TabsTrigger
                  key={l.code}
                  value={l.code}
                  className="shrink-0 data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
                >
                  {l.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {!categories ? (
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {selectedId && (
              <div className="z-10 shrink-0 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur xl:hidden">
                <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
                  {categories.map((cat: any) => (
                    <CategoryPill
                      key={cat._id}
                      category={cat}
                      locale={locale}
                      selected={selectedId === cat._id}
                      onSelect={() => setSelectedId(cat._id)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="no-scrollbar grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 sm:gap-6 sm:p-6 lg:p-8 xl:grid-cols-[280px_minmax(0,1fr)] xl:grid-rows-[minmax(0,1fr)] xl:overflow-hidden">
              <div
                className={`no-scrollbar min-h-0 min-w-0 space-y-2 overflow-y-auto overscroll-contain pr-1 xl:block xl:max-h-none ${
                  selectedId ? "hidden xl:block" : "max-h-[60vh]"
                }`}
              >
                {categories.map((cat: any) => (
                  <CategoryRow
                    key={cat._id}
                    category={cat}
                    locale={locale}
                    selected={selectedId === cat._id}
                    onSelect={() => setSelectedId(cat._id)}
                  />
                ))}
              </div>

              <div className="no-scrollbar min-h-0 min-w-0 xl:overflow-y-auto xl:overscroll-contain">
                {selectedId ? (
                  <CategoryDetail
                    key={`${selectedId}-${locale}`}
                    categoryId={selectedId}
                    locale={locale}
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 text-zinc-500 text-sm">
                    Select a category to edit
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
