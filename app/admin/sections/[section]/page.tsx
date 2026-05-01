"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { use, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { FieldLabel } from "./_components/FieldLabel";
import { VersionPanel } from "./_components/VersionPanel";
import { isFieldDirty } from "./_components/diff";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Dutch" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "no", label: "Norwegian" },
] as const;

type Locale = (typeof LOCALES)[number]["code"];

type Section =
  | "meta"
  | "navbar"
  | "hero"
  | "story"
  | "stats"
  | "featured"
  | "menuPreview"
  | "gallery"
  | "values"
  | "cta"
  | "footer"
  | "menuPage";

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
  menuPage: "Menu Page",
  meta: "SEO / Meta",
};

const SECTION_HINTS: Record<string, string> = {
  hero: "The main banner customers see when they land on the homepage.",
  navbar: "Top navigation bar — brand name, links, language toggle.",
  story: "About-us section telling the restaurant's story.",
  stats: "Number tiles like '10K+ guests served'.",
  featured: "Highlighted dishes shown on the homepage.",
  menuPreview: "Category teasers shown above the full menu link.",
  gallery: "Photo gallery section.",
  values: "Pillars / values cards (e.g. 'Authentic recipes').",
  cta: "Closing call-to-action panel near the footer.",
  footer: "Footer text, address, contact details.",
  menuPage: "Headings and labels shown on the dedicated /menu page.",
  meta: "Page titles & descriptions for search engines.",
};

// ─── Generic field components ─────────────────────────────────────────────

function Field({
  label,
  description,
  value,
  onChange,
  isDirty,
  multiline = false,
  type = "text",
}: {
  label: string;
  description?: string;
  value: string | number;
  onChange: (v: string) => void;
  isDirty?: boolean;
  multiline?: boolean;
  type?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} description={description} isDirty={isDirty} />
      {multiline ? (
        <Textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none min-h-[80px]"
        />
      ) : (
        <Input
          type={type}
          value={value as any}
          onChange={(e) => onChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
        />
      )}
    </div>
  );
}

// Helper: builds Field props given buffer/setBuffer/published.
function useFieldFactory(
  buffer: any,
  setBuffer: (u: (b: any) => any) => void,
  published: any
) {
  return (
    key: string,
    label: string,
    opts?: { description?: string; multiline?: boolean; type?: string }
  ) => ({
    label,
    description: opts?.description,
    multiline: opts?.multiline,
    type: opts?.type,
    value: buffer?.[key] ?? "",
    onChange: (v: string) =>
      setBuffer((b: any) => ({
        ...b,
        [key]: opts?.type === "number" ? Number(v) : v,
      })),
    isDirty: isFieldDirty(buffer, published, key),
  });
}

// ─── Per-section editors ──────────────────────────────────────────────────

function HeroEditor({ buffer, setBuffer, published }: EditorProps) {
  const f = useFieldFactory(buffer, setBuffer, published);
  return (
    <div className="space-y-4">
      <Field
        {...f("eyebrow", "Eyebrow", {
          description: "Small text above the main title.",
        })}
      />
      <Field
        {...f("titleTop", "Title (top)", {
          description: "First line of the hero headline.",
        })}
      />
      <Field
        {...f("titleAccent", "Title (accent)", {
          description: "Highlighted second line, usually in a different color.",
        })}
      />
      <Field
        {...f("body", "Body", {
          description: "Short intro paragraph below the headline.",
          multiline: true,
        })}
      />
      <Field
        {...f("primary", "Primary CTA", {
          description: "Main button label (e.g. 'Explore Menu').",
        })}
      />
      <Field
        {...f("secondary", "Secondary CTA", {
          description: "Secondary button label (e.g. 'Reserve a Table').",
        })}
      />
      <Field
        {...f("scroll", "Scroll label", {
          description: "Text shown next to the scroll-down indicator.",
        })}
      />
    </div>
  );
}

function NavbarEditor({ buffer, setBuffer, published }: EditorProps) {
  const f = useFieldFactory(buffer, setBuffer, published);
  const links: any[] = buffer?.links ?? [];
  const setLink = (i: number, v: string) =>
    setBuffer((b: any) => ({
      ...b,
      links: (b.links ?? []).map((l: any, idx: number) =>
        idx === i ? { ...l, label: v } : l
      ),
    }));
  return (
    <div className="space-y-4">
      <Field
        {...f("brandName", "Brand Name", {
          description: "Restaurant name shown top-left.",
        })}
      />
      <Field
        {...f("brandDescriptor", "Brand Descriptor", {
          description: "Tagline under the brand name.",
        })}
      />
      <Field
        {...f("reserve", "Reserve CTA", {
          description: "Reservation button label in the navbar.",
        })}
      />
      <Field
        {...f("toggle", "Toggle label", {
          description: "Mobile menu toggle accessibility label.",
        })}
      />
      <Field
        {...f("language", "Language label", {
          description: "Language switcher label.",
        })}
      />
      <Field
        {...f("about", "About label", {
          description: "About link label (optional).",
        })}
      />
      <div>
        <FieldLabel
          label="Nav Links"
          description="Translate each navigation link's display label. Keys are fixed."
          isDirty={isFieldDirty(buffer, published, "links")}
        />
        <div className="space-y-2">
          {links.map((link: any, i: number) => (
            <div key={link.key} className="grid gap-1 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center sm:gap-2">
              <span className="text-zinc-500 text-xs">{link.key}</span>
              <Input
                value={link.label}
                onChange={(e) => setLink(i, e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryEditor({ buffer, setBuffer, published }: EditorProps) {
  const f = useFieldFactory(buffer, setBuffer, published);
  return (
    <div className="space-y-4">
      <Field {...f("eyebrow", "Eyebrow")} />
      <Field {...f("title", "Title")} />
      <Field {...f("accent", "Accent")} />
      <Field {...f("body1", "Body 1", { multiline: true })} />
      <Field {...f("body2", "Body 2", { multiline: true })} />
      <Field {...f("primary", "Primary CTA")} />
      <Field {...f("secondary", "Secondary CTA")} />
      <Field {...f("stat", "Stat label")} />
    </div>
  );
}

function StatsEditor({ buffer, setBuffer, published }: EditorProps) {
  const items: any[] = buffer?.items ?? [];
  const setItem = (i: number, k: string, v: string | number) =>
    setBuffer((b: any) => ({
      ...b,
      items: (b.items ?? []).map((item: any, idx: number) =>
        idx === i ? { ...item, [k]: v } : item
      ),
    }));
  const itemsDirty = isFieldDirty(buffer, published, "items");
  return (
    <div>
      <FieldLabel
        label="Stat tiles"
        description="Each tile shows a number with a label. Edit numbers and translate labels."
        isDirty={itemsDirty}
      />
      <div className="space-y-4 mt-2">
        {items.map((item, i) => (
          <div key={i} className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
            <p className="text-zinc-400 text-xs">Stat {i + 1}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-zinc-300 text-xs">Value</Label>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    setItem(i, "value", Number(e.target.value))
                  }
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
    </div>
  );
}

function SimpleSectionEditor({ buffer, setBuffer, published }: EditorProps) {
  const set = (k: string) => (v: string) =>
    setBuffer((b: any) => ({ ...b, [k]: v }));
  const stringFields = Object.entries(buffer ?? {}).filter(
    ([k, v]) =>
      !["_id", "_creationTime", "locale", "status", "lastEditedAt"].includes(
        k
      ) && typeof v === "string"
  );
  return (
    <div className="space-y-4">
      {stringFields.map(([k, v]) => (
        <Field
          key={k}
          label={k}
          value={v as string}
          onChange={set(k)}
          multiline={(v as string).length > 80}
          isDirty={isFieldDirty(buffer, published, k)}
        />
      ))}
      {stringFields.length === 0 && (
        <p className="text-zinc-500 text-sm">
          This section has complex fields not yet supported by the simple
          editor.
        </p>
      )}
    </div>
  );
}

type EditorProps = {
  buffer: any;
  setBuffer: (u: (b: any) => any) => void;
  published: any;
};

function EditorByType({
  section,
  buffer,
  setBuffer,
  published,
}: EditorProps & { section: Section }) {
  if (section === "hero")
    return (
      <HeroEditor
        buffer={buffer}
        setBuffer={setBuffer}
        published={published}
      />
    );
  if (section === "navbar")
    return (
      <NavbarEditor
        buffer={buffer}
        setBuffer={setBuffer}
        published={published}
      />
    );
  if (section === "story")
    return (
      <StoryEditor
        buffer={buffer}
        setBuffer={setBuffer}
        published={published}
      />
    );
  if (section === "stats")
    return (
      <StatsEditor
        buffer={buffer}
        setBuffer={setBuffer}
        published={published}
      />
    );
  return (
    <SimpleSectionEditor
      buffer={buffer}
      setBuffer={setBuffer}
      published={published}
    />
  );
}

// ─── Workspace (per locale) ───────────────────────────────────────────────

function stripMeta(obj: any): any {
  if (!obj) return null;
  const rest = { ...obj };
  delete rest._id;
  delete rest._creationTime;
  delete rest.locale;
  delete rest.status;
  delete rest.lastEditedAt;
  return rest;
}

function SectionWorkspace({
  section,
  locale,
  draft,
  published,
}: {
  section: Section;
  locale: Locale;
  draft: any;
  published: any;
}) {
  // Buffer initialises from the existing draft if any, else the published row,
  // else an empty object. Keyed-on-locale parent ensures this mounts fresh per
  // locale switch.
  const initial = stripMeta(draft) ?? stripMeta(published) ?? {};
  const [buffer, setBuffer] = useState<any>(initial);

  const publishedFields = stripMeta(published);

  return (
    <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="max-w-2xl p-4 sm:p-6 lg:p-8">
          <EditorByType
            section={section}
            buffer={buffer}
            setBuffer={setBuffer}
            published={publishedFields}
          />
        </div>
      </main>
      <VersionPanel
        section={section}
        locale={locale}
        buffer={buffer}
        draft={draft}
        published={published}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);
  const [locale, setLocale] = useState<Locale>("en");
  const allData = useQuery(api.content.getAdminSections);

  const sectionTyped = section as Section;
  const localeBucket = allData?.[sectionTyped]?.[locale] ?? {
    draft: null,
    published: null,
  };

  return (
    <>
      <Toaster />
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-zinc-800 px-4 py-4 sm:px-6 lg:px-8 lg:pt-8 lg:pb-5">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
            Sections
          </p>
          <h1 className="text-xl font-semibold text-white">
            {SECTION_LABELS[section] ?? section}
          </h1>
          {SECTION_HINTS[section] && (
            <p className="text-sm text-zinc-500 mt-1">
              {SECTION_HINTS[section]}
            </p>
          )}
          <div className="mt-4">
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
        </header>

        {allData === undefined ? (
          <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
            <main className="no-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <Skeleton className="h-10 w-full max-w-lg rounded-md bg-zinc-800" />
              <Skeleton className="h-10 w-full rounded-md bg-zinc-800" />
              <Skeleton className="h-10 w-full max-w-xl rounded-md bg-zinc-800" />
              <Skeleton className="h-36 w-full rounded-md bg-zinc-800/80" />
              <Skeleton className="h-32 w-full max-w-lg rounded-md bg-zinc-800/70" />
            </main>
            <aside className="no-scrollbar shrink-0 border-t border-zinc-800 bg-zinc-950/80 p-4 xl:flex xl:h-full xl:w-[min(440px,40vw)] xl:flex-col xl:overflow-y-auto xl:border-l xl:border-t-0 xl:p-6">
              <Skeleton className="h-44 w-full rounded-lg bg-zinc-800/90" />
              <div className="mt-6 space-y-3">
                <Skeleton className="h-11 w-full rounded-md bg-zinc-800" />
                <Skeleton className="h-11 w-full rounded-md bg-zinc-800" />
              </div>
            </aside>
          </div>
        ) : (
          <SectionWorkspace
            key={locale}
            section={sectionTyped}
            locale={locale}
            draft={localeBucket.draft}
            published={localeBucket.published}
          />
        )}
      </div>
    </>
  );
}
