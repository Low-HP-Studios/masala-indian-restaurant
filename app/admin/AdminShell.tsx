"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
  { key: "meta", label: "SEO / Meta" },
];

function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">
      <div className="px-6 py-5 border-b border-zinc-800">
        <p className="text-xs text-zinc-500 uppercase tracking-widest">Masala CMS</p>
        <p className="text-white font-semibold mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-xs text-zinc-500 uppercase tracking-widest">Sections</p>
        {SECTIONS.map((s) => {
          const href = `/admin/sections/${s.key}`;
          const active = path.startsWith(href);
          return (
            <Link
              key={s.key}
              href={href}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {s.label}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-xs text-zinc-500 uppercase tracking-widest">Menu</p>
          <Link
            href="/admin/menu"
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
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          target="_blank"
        >
          ↗ View live site
        </Link>
      </div>
    </aside>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <div className="flex min-h-screen bg-zinc-900 text-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ConvexProvider>
  );
}
