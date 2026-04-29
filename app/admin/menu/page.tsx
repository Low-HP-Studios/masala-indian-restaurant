"use client";

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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Dutch" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "no", label: "Norwegian" },
] as const;
type Locale = (typeof LOCALES)[number]["code"];

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
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{content?.label ?? category.slug}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">{catData?.items.length ?? 0} items</span>
          <Badge
            variant="secondary"
            className={
              content?.status === "published"
                ? "bg-green-900/40 text-green-400 border-green-800 text-xs"
                : "bg-zinc-800 text-zinc-500 border-zinc-700 text-xs"
            }
          >
            {content?.status ?? "–"}
          </Badge>
        </div>
      </div>
    </button>
  );
}

function ItemEditor({
  item,
  locale,
}: {
  item: any;
  locale: Locale;
}) {
  const upsertContent = useMutation(api.admin.upsertMenuItemContent);
  const content = item.contents.find((c: any) => c.locale === locale);

  const [fields, setFields] = useState({
    name: content?.name ?? "",
    description: content?.description ?? "",
    note: content?.note ?? "",
  });
  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function save(status: "draft" | "published") {
    await upsertContent({
      itemId: item._id,
      locale,
      status,
      name: fields.name,
      description: fields.description || undefined,
      note: fields.note || undefined,
    });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-zinc-300 text-xs font-medium">{item.slug}</p>
        <div className="flex items-center gap-2">
          {item.priceFixed != null && (
            <span className="text-zinc-400 text-xs">€{item.priceFixed.toFixed(2)}</span>
          )}
          <Badge
            variant="secondary"
            className={
              content?.status === "published"
                ? "bg-green-900/40 text-green-400 border-green-800 text-xs"
                : "bg-zinc-800 text-zinc-500 border-zinc-700 text-xs"
            }
          >
            {content?.status ?? "no data"}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-y-1">
          <Label className="text-zinc-400 text-xs">Name</Label>
          <Input
            value={fields.name}
            onChange={(e) => set("name")(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-zinc-400 text-xs">Description</Label>
          <Textarea
            value={fields.description}
            onChange={(e) => set("description")(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white text-sm min-h-[60px] resize-none"
          />
        </div>
        {content?.note !== undefined && (
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Note</Label>
            <Input
              value={fields.note}
              onChange={(e) => set("note")(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white h-8 text-sm"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => save("draft")}
          className="h-7 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Draft
        </Button>
        <Button
          size="sm"
          onClick={() => save("published")}
          className="h-7 text-xs bg-green-700 hover:bg-green-600 text-white"
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
  const upsertCatContent = useMutation(api.admin.upsertMenuCategoryContent);
  const catData = useQuery(api.menu.getCategoryWithContent, { categoryId });

  if (!catData) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  const content = catData.contents.find((c: any) => c.locale === locale);
  const [catFields, setCatFields] = useState({
    label: content?.label ?? "",
    description: content?.description ?? "",
  });

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

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
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

        <div className="flex gap-2 justify-end">
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
        <h3 className="text-sm font-medium text-zinc-300">
          Items ({catData.items.length})
        </h3>
        {catData.items.map((item: any) => (
          <ItemEditor key={item._id} item={item} locale={locale} />
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
      <div className="p-8">
        <div className="mb-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Menu</p>
          <h1 className="text-xl font-semibold text-white">Categories & Items</h1>
        </div>

        <div className="mb-6">
          <Tabs value={locale} onValueChange={(v) => setLocale(v as Locale)}>
            <TabsList className="bg-zinc-800 border border-zinc-700">
              {LOCALES.map((l) => (
                <TabsTrigger
                  key={l.code}
                  value={l.code}
                  className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-zinc-400"
                >
                  {l.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {!categories ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-[280px_1fr] gap-6">
            <div className="space-y-2">
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

            <div>
              {selectedId ? (
                <CategoryDetail categoryId={selectedId} locale={locale} />
              ) : (
                <div className="flex items-center justify-center h-40 text-zinc-500 text-sm">
                  Select a category to edit
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
