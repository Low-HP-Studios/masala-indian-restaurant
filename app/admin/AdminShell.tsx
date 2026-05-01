"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import { formatRelativeTime } from "./sections/[section]/_components/diff";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Menu, X } from "lucide-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function AdminAuthLoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-zinc-900 text-white">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <aside className="flex h-full w-64 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-5">
          <Skeleton className="h-3 w-20 rounded bg-zinc-800" />
          <Skeleton className="mt-2 h-5 w-16 rounded bg-zinc-700" />
          <div className="mt-8 space-y-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md bg-zinc-800/90" />
            ))}
          </div>
        </aside>
      </div>

      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur lg:hidden">
        <Skeleton className="size-9 shrink-0 rounded-md bg-zinc-800" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Skeleton className="h-2.5 w-16 rounded bg-zinc-700" />
          <Skeleton className="h-4 w-24 rounded bg-zinc-600" />
        </div>
      </header>

      <main className="h-full min-w-0 flex-1 overflow-hidden pt-14 lg:ml-64 lg:pt-0">
        <div className="h-full space-y-4 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Skeleton className="h-7 w-48 rounded-md bg-zinc-800 sm:h-8 sm:w-56" />
          <Skeleton className="h-4 w-full max-w-md rounded-md bg-zinc-800/70" />
          <Skeleton className="h-4 w-52 rounded-md bg-zinc-800/50" />
          <div className="grid gap-3 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-lg bg-zinc-800/90" />
            ))}
          </div>
          <Skeleton className="mx-auto mt-8 h-40 w-full max-w-2xl rounded-lg bg-zinc-800/60" />
        </div>
      </main>
    </div>
  );
}

const SECTIONS = [
  { key: "navbar", label: "Navbar" },
  { key: "hero", label: "Hero" },
  { key: "story", label: "Story" },
  { key: "stats", label: "Stats" },
  { key: "featured", label: "Featured Dishes" },
  { key: "menuPreview", label: "Menu Preview" },
  { key: "gallery", label: "Gallery" },
  { key: "values", label: "Values" },
  { key: "cta", label: "CTA" },
  { key: "footer", label: "Footer" },
  { key: "menuPage", label: "Menu Page" },
  { key: "meta", label: "SEO / Meta" },
];

type SectionBuckets = Record<
  string,
  Record<string, { draft: { lastEditedAt?: number } | null; published: { lastEditedAt?: number } | null }>
>;

function lastEditedForSection(
  data: SectionBuckets | undefined,
  section: string
): number | null {
  if (!data) return null;
  const buckets = data[section];
  if (!buckets) return null;
  let max = 0;
  for (const locale of Object.keys(buckets)) {
    const { draft, published } = buckets[locale];
    if (draft?.lastEditedAt && draft.lastEditedAt > max) max = draft.lastEditedAt;
    if (published?.lastEditedAt && published.lastEditedAt > max)
      max = published.lastEditedAt;
  }
  return max || null;
}

function hasDraftForSection(
  data: SectionBuckets | undefined,
  section: string
): boolean {
  if (!data) return false;
  const buckets = data[section];
  if (!buckets) return false;
  return Object.values(buckets).some((b) => b.draft);
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  const { signOut } = useAuthActions();
  const data = useQuery(api.content.getAdminSections) as
    | SectionBuckets
    | undefined;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="px-6 py-5 border-b border-zinc-800">
        <p className="text-xs text-zinc-500 uppercase tracking-widest">Masala CMS</p>
        <p className="text-white font-semibold mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-xs text-zinc-500 uppercase tracking-widest">Sections</p>
        {SECTIONS.map((s) => {
          const href = `/admin/sections/${s.key}`;
          const active = path.startsWith(href);
          const lastEdited = lastEditedForSection(data, s.key);
          const hasDraft = hasDraftForSection(data, s.key);
          return (
            <Link
              key={s.key}
              href={href}
              onClick={onNavigate}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{s.label}</span>
                {hasDraft && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                    title="Has unpublished draft"
                  />
                )}
              </div>
              {lastEdited && (
                <p className="text-[10px] text-zinc-600 mt-0.5">
                  {formatRelativeTime(lastEdited)}
                </p>
              )}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-xs text-zinc-500 uppercase tracking-widest">Menu</p>
          <Link
            href="/admin/menu"
            onClick={onNavigate}
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              path.startsWith("/admin/menu")
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Menu Categories
          </Link>
        </div>
      </nav>

      <div className="px-6 py-4 border-t border-zinc-800">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            target="_blank"
          >
            View live site
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Sign out"
            onClick={() => {
              void signOut().then(() => {
                window.location.assign("/admin/login");
              });
            }}
            className="text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isLoginRoute = path === "/admin/login";

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);

  return (
    <ConvexAuthNextjsProvider client={convex}>
      {isLoginRoute ? (
        children
      ) : (
        <>
          <AuthLoading>
            <AdminAuthLoadingSkeleton />
          </AuthLoading>
          <Unauthenticated>
            <div className="grid min-h-screen place-items-center bg-zinc-950 text-sm text-zinc-400">
              Redirecting to sign in...
            </div>
          </Unauthenticated>
          <Authenticated>
            <div className="fixed inset-0 flex overflow-hidden bg-zinc-900 text-white">
              <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
                <Sidebar />
              </div>

              <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur lg:hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open admin navigation"
                  onClick={() => setMobileNavOpen(true)}
                  className="-ml-2 text-zinc-200 hover:bg-zinc-800 hover:text-white"
                >
                  <Menu className="size-5" />
                </Button>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Masala CMS
                  </p>
                  <p className="truncate text-sm font-semibold text-white">
                    Admin
                  </p>
                </div>
              </header>

              {mobileNavOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  <button
                    type="button"
                    aria-label="Close admin navigation"
                    className="absolute inset-0 bg-black/60"
                    onClick={() => setMobileNavOpen(false)}
                  />
                  <div className="absolute inset-y-0 left-0 w-64 max-w-[85vw] shadow-2xl">
                    <Sidebar onNavigate={() => setMobileNavOpen(false)} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Close admin navigation"
                      onClick={() => setMobileNavOpen(false)}
                      className="absolute right-3 top-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              )}

              <main className="h-full min-w-0 flex-1 overflow-hidden pt-14 lg:ml-64 lg:pt-0">
                {children}
              </main>
            </div>
          </Authenticated>
        </>
      )}
    </ConvexAuthNextjsProvider>
  );
}
