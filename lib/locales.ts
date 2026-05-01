export const locales = ["en", "nl", "es", "fr", "no"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const languageLabels: Record<Locale, { name: string; code: string }> = {
  en: { name: "English", code: "EN" },
  nl: { name: "Dutch", code: "NL" },
  es: { name: "Spanish", code: "ES" },
  fr: { name: "French", code: "FR" },
  no: { name: "Norwegian", code: "NO" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizePath(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) return href;
  if (href.startsWith("#")) return `/${locale}${href}`;
  const [path, hash = ""] = href.split("#");
  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}${hash ? `#${hash}` : ""}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1] ?? "")) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
