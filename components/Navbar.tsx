"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import RouteTransitionLink from "./RouteTransitionLink";
import {
  languageLabels,
  locales,
  localizePath,
  switchLocalePath,
  type Locale,
} from "@/lib/locales";
import type { SiteDictionary } from "@/lib/i18n";

type ThemeChoice = "system" | "light" | "dark";

type Props = {
  locale: Locale;
  copy: SiteDictionary["nav"];
  brand: SiteDictionary["brand"];
};

const navItems = [
  { href: "/", key: "home", section: "home" },
  { href: "#about", key: "story", section: "about" },
  { href: "#signature-dishes", key: "signature", section: "signature-dishes" },
  { href: "#preview", key: "preview", section: "preview" },
  { href: "#contact", key: "contact", section: "contact" },
] as const;

const menuLink = { href: "/menu", key: "menuLink", section: "menu" } as const;
const observedSections = ["home", "about", "signature-dishes", "preview", "contact"] as const;
const themeStoreEvent = "masala-theme-change";

function getStoredTheme(): ThemeChoice {
  if (typeof window === "undefined") return "system";

  const saved = window.localStorage.getItem("masala-theme");
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

function subscribeToThemeStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeStoreEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeStoreEvent, onStoreChange);
  };
}

function setStoredTheme(theme: ThemeChoice) {
  window.localStorage.setItem("masala-theme", theme);
  window.dispatchEvent(new Event(themeStoreEvent));
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.2 3.3 5.2 3.3 9S14.2 18.8 12 21M12 3C9.8 5.2 8.7 8.2 8.7 12s1.1 6.8 3.3 9" />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: ThemeChoice }) {
  if (theme === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 15.5A8.5 8.5 0 018.5 3.5a7 7 0 1012 12z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 17h16" />
      <circle cx="8" cy="7" r="2" />
      <circle cx="16" cy="17" r="2" />
    </svg>
  );
}

function MenuMark() {
  return (
    <span className="grid h-4 w-4 grid-cols-2 gap-0.5" aria-hidden="true">
      <span className="rounded-[1px] bg-current opacity-90" />
      <span className="rounded-[1px] bg-current opacity-55" />
      <span className="rounded-[1px] bg-current opacity-55" />
      <span className="rounded-[1px] bg-current opacity-90" />
    </span>
  );
}

export default function Navbar({ locale, copy, brand }: Props) {
  const pathname = usePathname();
  const isMenuRoute = pathname.split("/").filter(Boolean).at(1) === "menu";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const theme = useSyncExternalStore<ThemeChoice>(subscribeToThemeStore, getStoredTheme, () => "system");
  const [activeSection, setActiveSection] = useState<(typeof observedSections)[number] | typeof menuLink.section>("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);

      if (isMenuRoute) {
        setActiveSection("menu");
        return;
      }

      const scrollLine = window.scrollY + Math.min(window.innerHeight * 0.45, 420);
      let currentSection: (typeof observedSections)[number] = "home";

      for (const section of observedSections) {
        const element = document.getElementById(section);
        if (element && scrollLine >= element.offsetTop) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuRoute]);

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const activeLanguage = languageLabels[locale];
  const themeLabel = theme[0].toUpperCase() + theme.slice(1);
  const navLinks = useMemo(
    () =>
      navItems.map((item) => ({
        href: localizePath(locale, item.href),
        label: copy[item.key],
        section: item.section,
      })),
    [copy, locale]
  );
  const fullMenuLink = {
    href: localizePath(locale, menuLink.href),
    label: copy[menuLink.key],
    section: menuLink.section,
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.82, 0.22, 1], delay: 0.12 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen ? "bg-dark/92 shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-gradient-to-b from-black/92 via-black/58 to-black/20"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="flex h-20 items-center justify-between gap-3 border-b border-cream/10 sm:gap-5">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
              <RouteTransitionLink href={localizePath(locale, "/")} className="group flex min-w-0 flex-col leading-none">
                <span className="font-heading text-[1.65rem] font-normal tracking-[0.08em] text-cream transition-colors group-hover:text-gold-light sm:text-[1.95rem]">
                  {brand.name}
                </span>
                <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.18em] text-saffron-light sm:text-[0.68rem]">
                  {brand.descriptor}
                </span>
              </RouteTransitionLink>

              {isMenuRoute && (
                <span className="hidden shrink-0 items-center gap-2 rounded-full border border-saffron-light/35 bg-saffron/14 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-saffron-light shadow-[0_10px_30px_rgba(0,0,0,0.22)] sm:inline-flex">
                  <MenuMark />
                  {copy.menuLink}
                </span>
              )}
            </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isMenuRoute && (
              <span className="hidden lg:inline-flex">
                <a
                  href="tel:+34631751388"
                  className="masala-btn masala-btn-filled px-4 py-2.5 text-sm font-semibold text-cream focus:outline-none focus:ring-2 focus:ring-[var(--ambient-accent)]/70"
                >
                  {copy.reserve}
                </a>
              </span>
            )}

            <div className="relative z-[90]">
              <button
                type="button"
                aria-label={copy.language}
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((open) => !open)}
                onBlur={() => window.setTimeout(() => setLanguageOpen(false), 140)}
                className="flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-transparent px-2 text-sm font-medium text-cream transition hover:text-[var(--ambient-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ambient-accent)]/55 sm:justify-start sm:px-2.5"
              >
                <GlobeIcon />
                <span className="hidden sm:inline">{activeLanguage.name}</span>
                <span className="hidden text-cream/45 sm:inline">·</span>
                <span className="font-semibold text-cream/75">{activeLanguage.code}</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform ${languageOpen ? "rotate-180" : ""}`}>
                  <path fillRule="evenodd" d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {languageOpen && (
                <div className="absolute right-0 z-[120] mt-3 w-72 overflow-hidden rounded-lg border border-cream/10 bg-[#070809] py-2 text-cream shadow-2xl shadow-black/40 ring-1 ring-white/5">
                  {locales.map((option) => {
                    const label = languageLabels[option];
                    const active = option === locale;
                    return (
                      <Link
                        key={option}
                        href={switchLocalePath(pathname, option)}
                        className={`flex items-center gap-2 px-5 py-4 text-lg font-medium transition ${
                          active ? "masala-menu-active" : "text-cream/86 hover:bg-white/10"
                        }`}
                        onClick={() => setLanguageOpen(false)}
                      >
                        <span>{label.name}</span>
                        <span className="text-cream/35">·</span>
                        <span className={active ? "masala-menu-active-code" : "text-cream/55"}>{label.code}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <span className="hidden h-7 w-px bg-cream/18 sm:block" aria-hidden="true" />

            <div className="relative z-[85]">
              <button
                type="button"
                aria-label="Change theme"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen((open) => !open)}
                onBlur={() => window.setTimeout(() => setThemeOpen(false), 140)}
                className="flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-transparent px-2 text-sm font-medium text-cream transition hover:text-[var(--ambient-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ambient-accent)]/55 sm:px-2.5"
              >
                <ThemeIcon theme={theme} />
                <span className="hidden sm:inline">Theme</span>
                <span className="hidden text-cream/45 lg:inline">·</span>
                <span className="hidden font-semibold text-cream/75 lg:inline">{themeLabel}</span>
              </button>

              {themeOpen && (
                <div className="absolute right-0 z-[120] mt-3 w-44 overflow-hidden rounded-lg border border-cream/10 bg-[#070809] py-2 text-cream shadow-2xl shadow-black/40 ring-1 ring-white/5">
                  {(["system", "light", "dark"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setStoredTheme(option);
                        setThemeOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium capitalize transition ${
                        option === theme ? "masala-menu-active" : "text-cream/86 hover:bg-white/10"
                      }`}
                    >
                      <ThemeIcon theme={option} />
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setLanguageOpen(false);
                setThemeOpen(false);
                setMobileOpen((open) => !open);
              }}
              className={`h-11 w-11 flex-col items-center justify-center gap-1.5 bg-transparent text-cream transition hover:text-[var(--ambient-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ambient-accent)]/55 md:hidden ${isMenuRoute ? "hidden" : "flex"}`}
              aria-label={copy.toggle}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <span className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {!isMenuRoute && (
        <div className="hidden h-14 items-center justify-between md:flex">
          <div className="flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <RouteTransitionLink
                key={link.href}
                href={link.href}
                data-active={activeSection === link.section}
                className="masala-nav-link py-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-cream/68 transition hover:text-cream data-[active=true]:text-cream"
              >
                {link.label}
              </RouteTransitionLink>
            ))}
            <span className="mx-1 h-5 w-px bg-cream/18" aria-hidden="true" />
            <RouteTransitionLink
              href={fullMenuLink.href}
              data-active={activeSection === fullMenuLink.section}
              className="masala-nav-link flex items-center gap-2 py-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-saffron-light/86 transition hover:text-saffron-light data-[active=true]:text-saffron-light"
            >
              <MenuMark />
              <span>{fullMenuLink.label}</span>
            </RouteTransitionLink>
          </div>
          <a
            href="tel:+34631751388"
            className="masala-btn masala-btn-filled px-6 py-2.5 text-sm font-semibold text-cream focus:outline-none focus:ring-2 focus:ring-[var(--ambient-accent)]/70"
          >
            {copy.reserve}
          </a>
        </div>
        )}
      </div>

      </motion.header>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-cream/10 bg-dark/98 transition duration-300 md:hidden ${
          mobileOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-7xl flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6">
          <nav className="flex flex-col gap-2" aria-label={copy.toggle}>
            {navLinks.map((link) => {
              const active = activeSection === link.section;

              return (
                <RouteTransitionLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  data-active={active}
                  aria-current={active ? "location" : undefined}
                  className="masala-mobile-nav-link px-4 py-4 text-base font-bold uppercase text-cream/82 transition hover:text-cream data-[active=true]:text-cream"
                >
                  <span>{link.label}</span>
                </RouteTransitionLink>
              );
            })}
            <span className="my-3 h-px w-full bg-cream/12" aria-hidden="true" />
            <RouteTransitionLink
              href={fullMenuLink.href}
              onClick={() => setMobileOpen(false)}
              data-active={activeSection === fullMenuLink.section}
              aria-current={activeSection === fullMenuLink.section ? "page" : undefined}
              className="masala-mobile-nav-link flex items-center gap-3 px-4 py-4 text-base font-bold uppercase text-saffron-light/90 transition hover:text-saffron-light data-[active=true]:text-saffron-light"
            >
              <MenuMark />
              <span>{fullMenuLink.label}</span>
            </RouteTransitionLink>
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="tel:+34631751388"
              onClick={() => setMobileOpen(false)}
              className="masala-btn masala-btn-filled w-full px-5 py-4 text-center text-sm font-semibold text-cream"
            >
              {copy.reserve}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
