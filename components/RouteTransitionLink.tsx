"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { locales } from "@/lib/locales";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

const localeSet = new Set<string>(locales);

function getHrefPath(href: LinkProps["href"]) {
  if (typeof href !== "string") return href.pathname ?? null;
  if (href.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(href)) return null;

  return href.split("?")[0].split("#")[0] || "/";
}

function getLocale(path: string) {
  const segment = path.split("/").filter(Boolean)[0];
  return segment && localeSet.has(segment) ? segment : null;
}

function withoutLocale(path: string) {
  const segments = path.split("/").filter(Boolean);
  if (segments[0] && localeSet.has(segments[0])) segments.shift();
  return segments.length ? `/${segments.join("/")}` : "/";
}

function getTransitionTypes(pathname: string, href: LinkProps["href"]) {
  const targetPath = getHrefPath(href);
  if (!targetPath) return undefined;

  const currentLocale = getLocale(pathname);
  const targetLocale = getLocale(targetPath);
  if (currentLocale && targetLocale && currentLocale !== targetLocale) return undefined;

  const current = withoutLocale(pathname);
  const target = withoutLocale(targetPath);
  if (current === target) return undefined;

  if (current === "/" && target === "/menu") return ["masala-forward"];
  if (current === "/menu" && target === "/") return ["masala-back"];

  return undefined;
}

export default function RouteTransitionLink({ href, transitionTypes, ...props }: Props) {
  const pathname = usePathname();
  const routeTransitionTypes = transitionTypes ?? getTransitionTypes(pathname, href);

  return <Link href={href} transitionTypes={routeTransitionTypes} {...props} />;
}
