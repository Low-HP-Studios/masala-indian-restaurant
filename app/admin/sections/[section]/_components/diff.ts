/* eslint-disable @typescript-eslint/no-explicit-any */

const SKIP = new Set([
  "_id",
  "_creationTime",
  "locale",
  "status",
  "lastEditedAt",
]);

export type FieldDiff = { field: string; before: unknown; after: unknown };

export function computeDiff(buffer: any, published: any): FieldDiff[] {
  const a = buffer ?? {};
  const b = published ?? {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: FieldDiff[] = [];
  for (const k of keys) {
    if (SKIP.has(k)) continue;
    const av = a[k];
    const bv = b[k];
    if (typeof av === "object" || typeof bv === "object" || Array.isArray(av) || Array.isArray(bv)) {
      if (JSON.stringify(av ?? null) !== JSON.stringify(bv ?? null)) {
        out.push({ field: k, before: bv, after: av });
      }
    } else if (av !== bv && !(av == null && bv == null)) {
      out.push({ field: k, before: bv, after: av });
    }
  }
  return out;
}

export function isFieldDirty(buffer: any, published: any, field: string): boolean {
  const av = buffer?.[field];
  const bv = published?.[field];
  if (typeof av === "object" || typeof bv === "object" || Array.isArray(av) || Array.isArray(bv)) {
    return JSON.stringify(av ?? null) !== JSON.stringify(bv ?? null);
  }
  if (av == null && bv == null) return false;
  return av !== bv;
}

export function formatRelativeTime(ts: number | undefined | null): string {
  if (!ts) return "—";
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(ts).toLocaleDateString();
}

export function formatPreview(value: unknown): string {
  if (value == null) return "—";
  if (typeof value === "string") return value || "—";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    const s = JSON.stringify(value);
    return s.length > 80 ? s.slice(0, 77) + "…" : s;
  } catch {
    return "[complex]";
  }
}
