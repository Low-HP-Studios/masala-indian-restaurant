"use client";

import { use, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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

const SECTION_LABELS: Record<string, string> = {
  navbar: "Navbar",
  hero: "Hero",
  story: "Story",
  stats: "Stats Bar",
  featured: "Featured Dishes",
  menuPreview: "Menu Preview",
  gallery: "Gallery",
  values: "Values",
  cta: "CTA",
  footer: "Footer",
  meta: "SEO / Meta",
};

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-zinc-300 text-xs uppercase tracking-wide">{label}</Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none min-h-[80px]"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      )}
    </div>
  );
}

function HeroEditor({ data, locale }: { data: any; locale: Locale }) {
  const upsert = useMutation(api.admin.upsertHero);
  const [fields, setFields] = useState({
    eyebrow: data?.eyebrow ?? "",
    titleTop: data?.titleTop ?? "",
    titleAccent: data?.titleAccent ?? "",
    body: data?.body ?? "",
    primary: data?.primary ?? "",
    secondary: data?.secondary ?? "",
    scroll: data?.scroll ?? "",
  });

  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function save(status: "draft" | "published") {
    await upsert({ locale, status, ...fields });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  return (
    <EditorShell data={data} onSave={save}>
      <Field label="Eyebrow" value={fields.eyebrow} onChange={set("eyebrow")} />
      <Field label="Title (top)" value={fields.titleTop} onChange={set("titleTop")} />
      <Field label="Title (accent)" value={fields.titleAccent} onChange={set("titleAccent")} />
      <Field label="Body" value={fields.body} onChange={set("body")} multiline />
      <Field label="Primary CTA" value={fields.primary} onChange={set("primary")} />
      <Field label="Secondary CTA" value={fields.secondary} onChange={set("secondary")} />
      <Field label="Scroll label" value={fields.scroll} onChange={set("scroll")} />
    </EditorShell>
  );
}

function NavbarEditor({ data, locale }: { data: any; locale: Locale }) {
  const upsert = useMutation(api.admin.upsertNavbar);
  const [fields, setFields] = useState({
    brandName: data?.brandName ?? "",
    brandDescriptor: data?.brandDescriptor ?? "",
    reserve: data?.reserve ?? "",
    toggle: data?.toggle ?? "",
    language: data?.language ?? "",
    links: data?.links ?? [],
  });

  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));
  const setLink = (i: number, v: string) =>
    setFields((f) => ({
      ...f,
      links: f.links.map((l: any, idx: number) => (idx === i ? { ...l, label: v } : l)),
    }));

  async function save(status: "draft" | "published") {
    await upsert({ locale, status, ...fields });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  return (
    <EditorShell data={data} onSave={save}>
      <Field label="Brand Name" value={fields.brandName} onChange={set("brandName")} />
      <Field label="Brand Descriptor" value={fields.brandDescriptor} onChange={set("brandDescriptor")} />
      <Field label="Reserve CTA" value={fields.reserve} onChange={set("reserve")} />
      <Field label="Toggle label" value={fields.toggle} onChange={set("toggle")} />
      <Field label="Language label" value={fields.language} onChange={set("language")} />
      <div className="space-y-1.5">
        <Label className="text-zinc-300 text-xs uppercase tracking-wide">Nav Links</Label>
        <div className="space-y-2">
          {fields.links.map((link: any, i: number) => (
            <div key={link.key} className="flex items-center gap-2">
              <span className="text-zinc-500 text-xs w-20">{link.key}</span>
              <Input
                value={link.label}
                onChange={(e) => setLink(i, e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}

function StoryEditor({ data, locale }: { data: any; locale: Locale }) {
  const upsert = useMutation(api.admin.upsertStory);
  const [fields, setFields] = useState({
    eyebrow: data?.eyebrow ?? "",
    title: data?.title ?? "",
    accent: data?.accent ?? "",
    body1: data?.body1 ?? "",
    body2: data?.body2 ?? "",
    primary: data?.primary ?? "",
    secondary: data?.secondary ?? "",
    stat: data?.stat ?? "",
  });
  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function save(status: "draft" | "published") {
    await upsert({ locale, status, ...fields });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  return (
    <EditorShell data={data} onSave={save}>
      <Field label="Eyebrow" value={fields.eyebrow} onChange={set("eyebrow")} />
      <Field label="Title" value={fields.title} onChange={set("title")} />
      <Field label="Accent" value={fields.accent} onChange={set("accent")} />
      <Field label="Body 1" value={fields.body1} onChange={set("body1")} multiline />
      <Field label="Body 2" value={fields.body2} onChange={set("body2")} multiline />
      <Field label="Primary CTA" value={fields.primary} onChange={set("primary")} />
      <Field label="Secondary CTA" value={fields.secondary} onChange={set("secondary")} />
      <Field label="Stat label" value={fields.stat} onChange={set("stat")} />
    </EditorShell>
  );
}

function StatsEditor({ data, locale }: { data: any; locale: Locale }) {
  const upsert = useMutation(api.admin.upsertStats);
  const [items, setItems] = useState<any[]>(data?.items ?? []);

  const setItem = (i: number, k: string, v: string | number) =>
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, [k]: v } : item)));

  async function save(status: "draft" | "published") {
    await upsert({ locale, status, items });
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  return (
    <EditorShell data={data} onSave={save}>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
            <p className="text-zinc-400 text-xs">Stat {i + 1}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">Value</Label>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => setItem(i, "value", Number(e.target.value))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">Suffix</Label>
                <Input
                  value={item.suffix}
                  onChange={(e) => setItem(i, "suffix", e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs">Label</Label>
              <Input
                value={item.label}
                onChange={(e) => setItem(i, "label", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
        ))}
      </div>
    </EditorShell>
  );
}

function SimpleSectionEditor({
  data,
  locale,
  section,
}: {
  data: any;
  locale: Locale;
  section: string;
}) {
  const mutationMap: Record<string, any> = {
    gallery: api.admin.upsertGallery,
    meta: api.admin.upsertMeta,
    cta: api.admin.upsertCta,
    values: api.admin.upsertValues,
    featured: api.admin.upsertFeatured,
    menuPreview: api.admin.upsertMenuPreview,
    footer: api.admin.upsertFooter,
  };

  const upsert = useMutation(mutationMap[section] ?? api.admin.upsertGallery);
  const [fields, setFields] = useState<Record<string, any>>(() => {
    if (!data) return {};
    const { _id, _creationTime, ...rest } = data;
    return rest;
  });

  const set = (k: string) => (v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function save(status: "draft" | "published") {
    await upsert({ locale, status, ...fields } as any);
    toast.success(status === "published" ? "Published" : "Saved as draft");
  }

  const stringFields = Object.entries(fields).filter(
    ([k, v]) => k !== "locale" && k !== "status" && typeof v === "string"
  );

  return (
    <EditorShell data={data} onSave={save}>
      {stringFields.map(([k, v]) => (
        <Field
          key={k}
          label={k}
          value={v as string}
          onChange={set(k)}
          multiline={v.length > 80}
        />
      ))}
      {stringFields.length === 0 && (
        <p className="text-zinc-500 text-sm">
          This section has complex fields. Use the dedicated editor.
        </p>
      )}
    </EditorShell>
  );
}

function EditorShell({
  data,
  onSave,
  children,
}: {
  data: any;
  onSave: (status: "draft" | "published") => Promise<void>;
  children: React.ReactNode;
}) {
  const [saving, setSaving] = useState(false);

  async function handle(status: "draft" | "published") {
    setSaving(true);
    try {
      await onSave(status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Badge
          variant={data?.status === "published" ? "default" : "secondary"}
          className={
            data?.status === "published"
              ? "bg-green-900/50 text-green-400 border-green-800"
              : "bg-zinc-800 text-zinc-400 border-zinc-700"
          }
        >
          {data?.status ?? "no data"}
        </Badge>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handle("draft")}
            disabled={saving}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Save draft
          </Button>
          <Button
            size="sm"
            onClick={() => handle("published")}
            disabled={saving}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            Publish
          </Button>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SectionEditorByType({
  section,
  data,
  locale,
}: {
  section: string;
  data: any;
  locale: Locale;
}) {
  if (section === "hero") return <HeroEditor data={data} locale={locale} />;
  if (section === "navbar") return <NavbarEditor data={data} locale={locale} />;
  if (section === "story") return <StoryEditor data={data} locale={locale} />;
  if (section === "stats") return <StatsEditor data={data} locale={locale} />;
  return <SimpleSectionEditor data={data} locale={locale} section={section} />;
}

function SectionContent({ section, locale }: { section: string; locale: Locale }) {
  const allData = useQuery(api.content.getAllSectionLocales);

  if (allData === undefined) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="w-5 h-5 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  const sectionKey = section as keyof typeof allData;
  const entries = (allData[sectionKey] as any[]) ?? [];
  const data = entries.find((e) => e.locale === locale) ?? null;

  return <SectionEditorByType section={section} data={data} locale={locale} />;
}

export default function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <>
      <Toaster />
      <div className="p-8 max-w-2xl">
        <div className="mb-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Sections</p>
          <h1 className="text-xl font-semibold text-white">
            {SECTION_LABELS[section] ?? section}
          </h1>
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

        <SectionContent section={section} locale={locale} />
      </div>
    </>
  );
}
