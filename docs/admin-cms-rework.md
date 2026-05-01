# Admin CMS Rework — Planned Changes

Status: in progress. Step 1 (bug fix) being implemented now. Remaining steps queued.

This doc tracks the full sequence so work can resume from any point if a session is cut short.

---

## Goals

1. **Bug fix** — admin locale tabs always show English even when DB has data for other locales.
2. **Easier UI for non-coders** — help text per field, last-edited timestamps, publish confirm dialog with visual diff.
3. **Reversible changes** — keep history of every publish; allow restore.
4. **Field-level draft visibility** — show which fields differ from published.
5. **Dedicated version panel** — Save Draft / Publish / Discard / History grouped in one side panel (right side; sidebar stays left).

---

## Decisions (locked)

| Question | Choice |
|---|---|
| Draft model | Two rows per locale (draft + published) — editing draft never overwrites live |
| History granularity | Snapshot on every publish; drafts not snapshotted |
| Restore behavior | Loads revision into draft; user reviews then publishes |
| Side panel contents | Status + Save Draft / Publish / Discard buttons + per-field diff + revisions list |
| Scope | Page sections only (Hero, Navbar, Story, Stats, Featured, Menu Preview, Gallery, Values, CTA, Footer, Meta). Menu = follow-up. |
| Auth/audit | Single admin for now; no author tracking on revisions |
| Live preview | Out of scope |
| UX adds | Per-field help text, last-edited timestamps, publish confirm, visual diff |
| Panel placement | Right side (left already has sections sidebar) |

---

## Step 1 — Bug fix (locale tabs show English)

**Root cause.** Editor components (`HeroEditor`, `NavbarEditor`, etc.) inside `app/admin/sections/[section]/page.tsx` initialize form state via `useState(data?.field ?? "")`. When the user switches the locale tab, the parent re-renders and passes new `data`, but `useState` only reads the initial value on mount — so the old (English) values persist in the form fields.

**Fix.** Pass `key={locale}` to the editor wrapper so React fully remounts the editor on locale change. Same pattern menu page already uses (`app/admin/menu/page.tsx:337`).

**File:** `app/admin/sections/[section]/page.tsx` around line 388.

**Change:**
```tsx
return <SectionEditorByType key={locale} section={section} data={data} locale={locale} />;
```

That single change unblocks the bug. Status: implemented in Step 1 commit.

---

## Step 2 — Schema rework (`convex/schema.ts`)

For every section table (`heroContent`, `navbarContent`, `storyContent`, `statsContent`, `featuredContent`, `menuPreviewContent`, `galleryContent`, `valuesContent`, `ctaContent`, `footerContent`, `metaContent`):

- Allow two rows per locale: one with `status: "draft"`, one with `status: "published"`.
- Add `lastEditedAt: v.number()` field.
- Replace `by_locale` index with compound `by_locale_status` (`["locale", "status"]`).

New revisions table:
```ts
contentRevisions: defineTable({
  section: v.string(),         // "hero", "navbar", ...
  locale: v.string(),          // "en" | "nl" | ...
  snapshot: v.any(),           // full document at publish time
  publishedAt: v.number(),
}).index("by_section_locale", ["section", "locale"])
```

Per Convex guidelines: never use `.collect()` on revisions — always `.take(50)` or `.paginate()`.

---

## Step 3 — Convex functions

### `convex/content.ts`
- Public queries (`getHero`, etc.): switch from `withIndex("by_locale") + .filter(status="published")` to `withIndex("by_locale_status", q => q.eq("locale", l).eq("status","published"))`. Removes `.filter` (per guideline rule #2).
- Admin query: replace `getAllSectionLocales` with `getAllSectionLocalesForAdmin` returning `{ section: { locale: { draft, published } } }`.

### `convex/admin.ts`
Generic helpers:
- `saveDraftSection(ctx, table, locale, data)` — upsert the draft row only.
- `publishSection(ctx, section, table, locale)` — copy draft → published, snapshot to `contentRevisions`, delete draft.
- `discardDraftSection(ctx, table, locale)` — delete draft row.
- `restoreRevision({ revisionId })` — load snapshot into draft (does NOT publish).

Per-section thin wrappers (`saveDraftHero`, `publishHero`, …) keep arg validators tight per section.

All mutations set `lastEditedAt: Date.now()`.

### `convex/revisions.ts` (new)
- `listRevisions({ section, locale })` — `.order("desc").take(50)`.
- `getRevision({ revisionId })`.

### `convex/migrations.ts` (new)
- `backfillLastEditedAt` — one-time mutation, sets `lastEditedAt = Date.now()` on rows missing it. Run: `npx convex run migrations:backfillLastEditedAt`.

---

## Step 4 — Admin UI

### Layout (`app/admin/sections/[section]/page.tsx`)
Three-column:
```
[ sidebar (existing) ] [ editor (center) ] [ version panel (new, right) ]
```

### New components (under `app/admin/sections/[section]/_components/`)
- `VersionPanel.tsx` — status header, Save Draft / Publish / Discard buttons, per-field diff list, revisions list with Restore, last-edited timestamp.
- `PublishConfirmDialog.tsx` — shadcn Dialog showing diff before publish.
- `FieldLabel.tsx` — label + optional help text + dirty-dot indicator when field differs from published.

### Editor components (HeroEditor, NavbarEditor, etc.)
- Take `draft` and `published` props instead of single `data`.
- Form initializes from `draft ?? published`.
- For each field compute `isDirty = current !== publishedValue`; pass to `<FieldLabel>` for the dot.
- Drop in-body Save/Publish buttons — they live in `VersionPanel` now.
- Add per-field help text (e.g. Hero `eyebrow`: "small text above main title").

### Sidebar (`app/admin/layout.tsx`)
Each section link shows relative `lastEditedAt` ("2h ago"). One query per section across all locales.

---

## Step 5 — Verification checklist

1. Switch locale tab in `/admin/sections/hero` → fields update to that locale's data. (Step 1)
2. Save Draft in English → public `/en` still shows old published content; admin still shows draft on reload. (Steps 2–4)
3. Publish → `npx convex run revisions:listRevisions '{"section":"hero","locale":"en"}'` returns the snapshot.
4. Restore an older revision → loads into draft. Publish to take live.
5. Discard draft → form resets to published; no draft row in DB.
6. Per-field dirty dot appears only on changed fields.
7. Publish confirm dialog shows diff.
8. Sidebar shows relative timestamps.
9. Public site renders for all locales (`/en`, `/nl`, `/es`, `/fr`, `/no`).
10. `/admin/menu` untouched — still works.

---

## Files to touch

```
convex/schema.ts                                                # step 2
convex/content.ts                                               # step 3
convex/admin.ts                                                 # step 3
convex/revisions.ts                                             # step 3 (new)
convex/migrations.ts                                            # step 3 (new)
convex/seed.ts                                                  # step 3 (ensure lastEditedAt on seed)
app/admin/sections/[section]/page.tsx                           # step 1 + step 4
app/admin/sections/[section]/_components/VersionPanel.tsx       # step 4 (new)
app/admin/sections/[section]/_components/PublishConfirmDialog.tsx # step 4 (new)
app/admin/sections/[section]/_components/FieldLabel.tsx         # step 4 (new)
app/admin/layout.tsx                                            # step 4
```

---

## Resume instructions for future sessions

If this session ends, resume by:

1. `git status` — see what's already done.
2. Read this doc to find the next unchecked step.
3. Run `npx convex dev` + `pnpm dev` and verify what's already shipped before continuing.
4. Pick up at the next step.
