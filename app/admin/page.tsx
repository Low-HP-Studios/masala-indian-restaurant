import Link from "next/link";

const SECTIONS = [
  { key: "navbar", label: "Navbar", desc: "Site navigation, brand name, links" },
  { key: "hero", label: "Hero", desc: "Main banner headline and CTA" },
  { key: "story", label: "Story", desc: "Restaurant story section" },
  { key: "stats", label: "Stats Bar", desc: "Numbers and highlights" },
  { key: "featured", label: "Featured Dishes", desc: "Signature dish cards" },
  { key: "menuPreview", label: "Menu Preview", desc: "Category preview grid" },
  { key: "gallery", label: "Gallery", desc: "Gallery section heading" },
  { key: "values", label: "Values", desc: "Why Masala / promise section" },
  { key: "cta", label: "CTA", desc: "Reserve table call-to-action" },
  { key: "footer", label: "Footer", desc: "Footer links and text" },
  { key: "meta", label: "SEO / Meta", desc: "Page titles and descriptions" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Content</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Edit page sections and menu across all 5 locales (EN · NL · ES · FR · NO)
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Page Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={`/admin/sections/${s.key}`}
              className="group block bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 transition-colors"
            >
              <p className="text-white font-medium text-sm group-hover:text-white">{s.label}</p>
              <p className="text-zinc-400 text-xs mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Menu</h2>
        <Link
          href="/admin/menu"
          className="inline-block bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 rounded-lg p-4 transition-colors"
        >
          <p className="text-white font-medium text-sm">Menu Categories & Items</p>
          <p className="text-zinc-400 text-xs mt-1">Edit all 16 categories and their items</p>
        </Link>
      </div>
    </div>
  );
}
