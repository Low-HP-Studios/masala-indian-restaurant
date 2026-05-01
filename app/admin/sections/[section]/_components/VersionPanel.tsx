"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { computeDiff, formatRelativeTime, formatPreview } from "./diff";
import { PublishConfirmDialog } from "./PublishConfirmDialog";

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

type Locale = "en" | "nl" | "es" | "fr" | "no";

const SAVE_DRAFT_MUTATIONS = {
  meta: api.admin.saveDraftMeta,
  navbar: api.admin.saveDraftNavbar,
  hero: api.admin.saveDraftHero,
  story: api.admin.saveDraftStory,
  stats: api.admin.saveDraftStats,
  featured: api.admin.saveDraftFeatured,
  menuPreview: api.admin.saveDraftMenuPreview,
  gallery: api.admin.saveDraftGallery,
  values: api.admin.saveDraftValues,
  cta: api.admin.saveDraftCta,
  footer: api.admin.saveDraftFooter,
  menuPage: api.admin.saveDraftMenuPage,
} as const;

function stripMeta(obj: any): any {
  if (!obj) return obj;
  const rest = { ...obj };
  delete rest._id;
  delete rest._creationTime;
  delete rest.locale;
  delete rest.status;
  delete rest.lastEditedAt;
  return rest;
}

export function VersionPanel({
  section,
  locale,
  buffer,
  draft,
  published,
}: {
  section: Section;
  locale: Locale;
  buffer: any;
  draft: any;
  published: any;
}) {
  const revisions = useQuery(api.revisions.listRevisions, { section, locale });
  const saveDraft = useMutation(SAVE_DRAFT_MUTATIONS[section] as any);
  const publish = useMutation(api.admin.publishSectionLocale);
  const discard = useMutation(api.admin.discardDraft);
  const restore = useMutation(api.admin.restoreRevision);

  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const publishedFields = stripMeta(published);
  const diff = computeDiff(buffer, publishedFields);
  const dirtyCount = diff.length;

  const lastEdited = draft?.lastEditedAt ?? published?.lastEditedAt ?? null;

  async function handleSaveDraft() {
    setBusy(true);
    try {
      await saveDraft({ locale, ...buffer });
      toast.success("Draft saved");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to save draft");
    } finally {
      setBusy(false);
    }
  }

  async function handlePublish() {
    setBusy(true);
    try {
      // Persist current buffer to draft first so publish picks it up.
      await saveDraft({ locale, ...buffer });
      await publish({ section, locale });
      toast.success("Published");
      setConfirmOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to publish");
    } finally {
      setBusy(false);
    }
  }

  async function handleDiscard() {
    if (!confirm("Discard this draft? Your unpublished changes will be lost.")) {
      return;
    }
    setBusy(true);
    try {
      await discard({ section, locale });
      toast.success("Draft discarded");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to discard");
    } finally {
      setBusy(false);
    }
  }

  async function handleRestore(revisionId: string) {
    setBusy(true);
    try {
      await restore({ revisionId: revisionId as any });
      toast.success("Loaded into draft. Review and Publish to make it live.");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to restore");
    } finally {
      setBusy(false);
    }
  }

  const statusLabel =
    dirtyCount > 0
      ? `Draft (${dirtyCount} field${dirtyCount === 1 ? "" : "s"} changed)`
      : draft
      ? "Draft saved (no live changes)"
      : "All changes published";

  const statusColor =
    dirtyCount > 0
      ? "text-amber-400"
      : "text-green-400";

  return (
    <aside className="min-h-0 shrink-0 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur xl:w-80 xl:overflow-y-auto xl:border-l xl:border-t-0">
      {/* Compact mobile header — collapsed default */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-4 py-3 text-left xl:hidden"
      >
        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-medium ${statusColor}`}>
            {statusLabel}
          </p>
          <p className="text-[11px] text-zinc-500">
            Last edited {formatRelativeTime(lastEdited)}
          </p>
        </div>
        <ChevronDown
          className={`size-4 shrink-0 text-zinc-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile sticky action bar — always visible */}
      <div className="flex gap-2 px-4 pb-3 xl:hidden">
        <Button
          size="sm"
          onClick={() => setConfirmOpen(true)}
          disabled={busy || dirtyCount === 0}
          className="flex-1 bg-green-700 hover:bg-green-600 text-white"
        >
          Publish
        </Button>
        <Button
          size="sm"
          onClick={handleSaveDraft}
          disabled={busy || dirtyCount === 0}
          variant="outline"
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Save draft
        </Button>
      </div>

      <div
        className={`space-y-5 p-4 sm:p-5 ${
          expanded ? "block border-t border-zinc-800 xl:border-t-0" : "hidden xl:block"
        }`}
      >
        {/* Status — desktop only (mobile shows in compact header) */}
        <div className="hidden xl:block">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
            Status
          </p>
          <p className={`text-sm font-medium ${statusColor}`}>{statusLabel}</p>
          <p className="text-[11px] text-zinc-500 mt-1">
            Last edited {formatRelativeTime(lastEdited)}
          </p>
        </div>

        {/* Actions — desktop only (mobile shows in sticky bar) */}
        <div className="hidden gap-2 xl:grid xl:grid-cols-1">
          <Button
            onClick={() => setConfirmOpen(true)}
            disabled={busy || dirtyCount === 0}
            className="w-full bg-green-700 hover:bg-green-600 text-white"
          >
            Publish
          </Button>
          <Button
            onClick={handleSaveDraft}
            disabled={busy || dirtyCount === 0}
            variant="outline"
            className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Save draft
          </Button>
          <Button
            onClick={handleDiscard}
            disabled={busy || !draft}
            variant="ghost"
            className="w-full text-zinc-400 hover:text-red-300 hover:bg-red-950/30"
          >
            Discard draft
          </Button>
        </div>

        {/* Discard button on mobile (inside expanded body) */}
        <Button
          onClick={handleDiscard}
          disabled={busy || !draft}
          variant="ghost"
          size="sm"
          className="w-full text-zinc-400 hover:text-red-300 hover:bg-red-950/30 xl:hidden"
        >
          Discard draft
        </Button>

        {/* Per-field diff */}
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Pending changes
          </p>
          {dirtyCount === 0 ? (
            <p className="text-xs text-zinc-600">No changes vs. published.</p>
          ) : (
            <ul className="max-h-72 space-y-2 overflow-y-auto pr-1 xl:max-h-none xl:overflow-visible xl:pr-0">
              {diff.map((d) => (
                <li
                  key={d.field}
                  className="text-xs border border-zinc-800 rounded-md p-2 bg-zinc-900/40"
                >
                  <p className="text-zinc-300 font-medium mb-1">{d.field}</p>
                  <p className="text-zinc-500 line-clamp-1">
                    <span className="text-[10px] uppercase text-zinc-600 mr-1">
                      was
                    </span>
                    {formatPreview(d.before)}
                  </p>
                  <p className="text-amber-300 line-clamp-1 mt-0.5">
                    <span className="text-[10px] uppercase text-amber-500/70 mr-1">
                      now
                    </span>
                    {formatPreview(d.after)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* History */}
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            History
          </p>
          {revisions === undefined ? (
            <p className="text-xs text-zinc-600">Loading…</p>
          ) : revisions.length === 0 ? (
            <p className="text-xs text-zinc-600">
              No published versions yet for this locale.
            </p>
          ) : (
            <ul className="max-h-72 space-y-1 overflow-y-auto pr-1 xl:max-h-none xl:overflow-visible xl:pr-0">
              {revisions.map((r: any) => (
                <li
                  key={r._id}
                  className="flex items-center justify-between gap-2 text-xs border border-zinc-800 rounded-md p-2 bg-zinc-900/40"
                >
                  <div>
                    <p className="text-zinc-300">
                      {new Date(r.publishedAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-[10px] text-zinc-600">
                      {formatRelativeTime(r.publishedAt)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => handleRestore(r._id)}
                    className="h-7 text-[11px] border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    Restore
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <PublishConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        diff={diff}
        onConfirm={handlePublish}
        busy={busy}
        locale={locale}
      />
    </aside>
  );
}
